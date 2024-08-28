"use client";

import React, { useState, useRef, useEffect } from "react";
import { questions } from "./data/interview-questions";
import lamejs from "lamejs"; // lamejs 라이브러리 사용

const VoiceRecorderWithTTS: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null); // 다운로드 링크를 위한 상태 추가
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (isRecording) {
      const audioContext = new window.AudioContext();
      const analyser = audioContext.createAnalyser();
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      analyser.fftSize = 256;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      const draw = () => {
        if (!ctx || !canvas) return;

        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 중심에 원을 그리고 그 안에서 시각화하기
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100; // 중심 원의 반지름

        // 중심 원 그리기
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(34, 197, 94, 0.2)"; // 반투명한 초록색
        ctx.fill();

        // 시각화 데이터 그리기
        dataArray.forEach((value, index) => {
          const angle = (index / dataArray.length) * 2 * Math.PI;
          const x = centerX + Math.cos(angle) * (radius + value * 0.5);
          const y = centerY + Math.sin(angle) * (radius + value * 0.5);

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(34, 197, 94, ${value / 255})`;
          ctx.fill();
        });

        requestAnimationFrame(draw);
      };

      draw();
    } else {
      audioContextRef.current?.close();
    }
  }, [isRecording]);

  const handleStartRecording = async () => {
    setIsRecording(true);
    setAudioUrl(null); // 녹음 시작 시 이전 오디오 URL 초기화
    setDownloadUrl(null); // 다운로드 URL 초기화
    audioChunksRef.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = audioContextRef.current!;
    const source = audioContext.createMediaStreamSource(stream);
    const destination = audioContext.createMediaStreamDestination();

    source.connect(analyserRef.current!);
    analyserRef.current!.connect(destination);

    mediaRecorderRef.current = new MediaRecorder(destination.stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/wav",
      });

      // MP3로 변환
      const mp3Blob = await convertToMP3(audioBlob);
      const mp3Url = URL.createObjectURL(mp3Blob);
      console.log("Generated MP3 URL:", mp3Url); // 디버깅을 위해 MP3 URL 로그 출력
      setAudioUrl(mp3Url); // MP3 URL 설정

      // 다운로드 링크 설정
      const downloadLink = URL.createObjectURL(mp3Blob);
      setDownloadUrl(downloadLink);
    };

    mediaRecorderRef.current.start();

    playQuestion(0);
  };

  const playQuestion = async (index: number) => {
    if (index >= questions.length) {
      handleStopRecording();
      return;
    }

    const text = questions[index];
    setCurrentQuestionIndex(index);
    setCurrentQuestion(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setTimeout(() => {
        playQuestion(index + 1);
      }, 10000);
    };

    speechSynthesis.speak(utterance);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current?.stop();
  };

  const convertToMP3 = async (wavBlob: Blob): Promise<Blob> => {
    const arrayBuffer = await wavBlob.arrayBuffer();
    const wav = lamejs.WavHeader.readHeader(new DataView(arrayBuffer));
    const samples = new Int16Array(
      arrayBuffer,
      wav.dataOffset,
      wav.dataLen / 2
    );

    const mp3Encoder = new lamejs.Mp3Encoder(wav.channels, wav.sampleRate, 128);
    const mp3Data = [];

    let sampleBlockSize = 1152;
    for (let i = 0; i < samples.length; i += sampleBlockSize) {
      const sampleChunk = samples.subarray(i, i + sampleBlockSize);
      const mp3buf = mp3Encoder.encodeBuffer(sampleChunk);
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
    }
    const mp3buf = mp3Encoder.flush();
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }

    return new Blob(mp3Data, { type: "audio/mp3" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 relative">
      <canvas ref={canvasRef} width={400} height={400} className="z-0"></canvas>
      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className="px-4 py-2 mb-4 text-white bg-blue-600 rounded hover:bg-blue-700 z-10 relative"
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioUrl && (
        <div className="z-10 relative">
          <audio src={audioUrl} controls className="w-full mt-4" />
          <p className="text-white">Audio Player is rendered</p>
        </div>
      )}
      {downloadUrl && (
        <div className="z-10 relative mt-4">
          <a
            href={downloadUrl}
            download="recording.mp3"
            className="text-white underline"
          >
            Download MP3
          </a>
        </div>
      )}
      {isRecording && currentQuestion && (
        <div className="mt-8 text-2xl font-bold text-white z-10 relative">
          <h2>{currentQuestion}</h2>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorderWithTTS;
