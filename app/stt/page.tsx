"use client";

import React, { useState } from "react";
import { handleGetAudio, stopRecording } from "@/app/constants/deepgram"; // deepgram.ts의 함수들을 임포트

const SpeechToTextPage: React.FC = () => {
  const [transcript, setTranscript] = useState<string>(""); // 변환된 텍스트를 저장할 상태
  const [isRecording, setIsRecording] = useState<boolean>(false); // 녹음 상태를 관리

  const startRecording = async () => {
    setIsRecording(true);
    await handleGetAudio(setTranscript);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stopRecording(); // 녹음을 중지
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Speech to Text</h1>
      <p>Click the button below to start recording your voice.</p>
      <button onClick={isRecording ? handleStopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
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
