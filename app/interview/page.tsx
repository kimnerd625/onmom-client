"use client";

import React, { useState, useRef } from "react";
import { questions } from "./data/interview-questions";

const VoiceRecorderWithTTS: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  const handleStartRecording = async () => {
    setIsRecording(true);
    audioChunksRef.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new window.AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const destination = audioContext.createMediaStreamDestination();

    source.connect(destination);

    mediaRecorderRef.current = new MediaRecorder(destination.stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
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
    <div>
      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioUrl && (
        <div>
          <h3>Recorded Audio:</h3>
          <audio src={audioUrl} controls />
        </div>
      )}
      {isRecording && currentQuestion && (
        <div>
          <p>
            Asking question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <h2>{currentQuestion}</h2> {/* 현재 질문을 화면에 표시 */}
        </div>
      )}
    </div>
  );
};

export default VoiceRecorderWithTTS;
