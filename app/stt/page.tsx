"use client";

import React, { useState, useCallback } from "react";
import { handleGetAudio, stopRecording } from "@/app/constants/deepgram"; // deepgram.ts의 함수들을 임포트

const SpeechToTextPage: React.FC = () => {
  const [transcript, setTranscript] = useState<string>(""); // 변환된 텍스트를 저장할 상태
  const [isRecording, setIsRecording] = useState<boolean>(false); // 녹음 상태를 관리
  const [question, setQuestion] = useState<string>(""); // 화면에 표시할 질문 상태

  const startRecording = useCallback(async () => {
    const currentQuestion = "오늘 하루 어떠셨어요?";
    setQuestion(currentQuestion);

    // TTS로 "오늘 하루 어떠셨어요?"를 말하도록 처리
    const tts = new SpeechSynthesisUtterance(currentQuestion);
    tts.lang = "ko-KR";
    tts.onend = async () => {
      // TTS가 끝나면 녹음 시작
      setIsRecording(true);
      await handleGetAudio(setTranscript);

      // 5초 후에 녹음을 자동으로 중지
      setTimeout(() => {
        handleStopRecording();
      }, 5000);
    };
    window.speechSynthesis.speak(tts);
  }, []);

  const handleStopRecording = useCallback(() => {
    setIsRecording(false);
    stopRecording(); // 녹음을 중지
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Speech to Text</h1>
      <p>Click the button below to start recording your voice.</p>
      <button onClick={isRecording ? handleStopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {question && (
        <div
          style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}
        >
          {question}
        </div>
      )}
      <h2>Transcript:</h2>
      <div
        style={{ border: "1px solid #ccc", padding: "10px", marginTop: "20px" }}
      >
        {transcript || "Your transcript will appear here..."}
      </div>
    </div>
  );
};

export default SpeechToTextPage;
