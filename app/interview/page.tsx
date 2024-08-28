"use client";

import React, { useState, useRef, useEffect } from "react";
import { questions } from "./data/interview-questions";

const VoiceRecorderWithTTS: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [volume, setVolume] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (isRecording) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      analyser.fftSize = 256;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        const avgVolume =
          dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        setVolume(avgVolume / 255); // Normalize volume to a range between 0 and 1
        requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } else {
      audioContextRef.current?.close();
      setVolume(0);
    }
  }, [isRecording]);

  const handleStartRecording = async () => {
    setIsRecording(true);
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

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/mpeg",
      });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
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

    // TTS로 질문 재생
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      // 질문이 끝나면 10초 대기
      setTimeout(() => {
        playQuestion(index + 1);
      }, 10000); // 10초 대기
    };

    speechSynthesis.speak(utterance);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current?.stop();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="relative w-64 h-64 mb-8">
        <svg
          viewBox="0 0 200 200"
          className="absolute top-0 left-0 w-full h-full"
        >
          <circle
            cx="100"
            cy="100"
            r={80 + volume * 40} // 반지름을 볼륨에 따라 조절
            fill="rgba(34, 197, 94, 0.7)" // 연한 초록색
            className="transition-all duration-200 ease-in-out"
          />
          <circle
            cx="100"
            cy="100"
            r={60 + volume * 30} // 반지름을 볼륨에 따라 조절
            fill="rgba(34, 197, 94, 0.5)" // 연한 초록색
            className="transition-all duration-200 ease-in-out"
          />
        </svg>
      </div>
      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className="px-4 py-2 mb-4 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioUrl && (
        <div>
          <audio src={audioUrl} controls className="w-full mt-4" />
        </div>
      )}
      {isRecording && currentQuestion && (
        <div className="mt-8 text-2xl font-bold text-white">
          <h2>{currentQuestion}</h2>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorderWithTTS;
