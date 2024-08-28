"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { startRecording } from "../_utils/startRecording";
import { stopRecording } from "../_utils/stopRecording";
import { playQuestion } from "../_utils/playQuestion";
import VisualizerCanvas from "../_components/VisualizerCanvas";
import ControlButton from "../_components/ControlButton";
import AudioPlayer from "../_components/AudioPlayer";
import QuestionDisplay from "../_components/QuestionDisplay";

export default function InterviewSection() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // useCallback을 사용하여 startRecording과 stopRecording의 참조를 안정화
  const handleStartRecording = useCallback(() => {
    startRecording(
      setIsRecording,
      setAudioUrl,
      mediaRecorderRef,
      audioChunksRef,
      audioContextRef,
      analyserRef,
      (index) =>
        playQuestion(index, setCurrentQuestionIndex, setCurrentQuestion, () =>
          stopRecording(setIsRecording, mediaRecorderRef)
        )
    );
  }, [
    setIsRecording,
    setAudioUrl,
    mediaRecorderRef,
    audioChunksRef,
    audioContextRef,
    analyserRef,
  ]);

  const handleStopRecording = useCallback(() => {
    stopRecording(setIsRecording, mediaRecorderRef);
  }, [setIsRecording, mediaRecorderRef]);

  useEffect(() => {
    if (isRecording) {
      const audioContext = new window.AudioContext();
      const analyser = audioContext.createAnalyser();
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      analyser.fftSize = 256;
    } else {
      audioContextRef.current?.close();
    }
  }, [isRecording]);

  useEffect(() => {
    // 자동으로 녹음을 시작하는 로직
    if (!isRecording) {
      handleStartRecording();
    }
  }, [handleStartRecording, isRecording]);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-[#f7f7f7]">
      <VisualizerCanvas
        imageUrl="/images/logo-circle.png"
        isRecording={isRecording}
        analyser={analyserRef.current}
      />
      <QuestionDisplay currentQuestion={currentQuestion} />
      {/* 아래 버튼을 사용하지 않더라도 녹음이 자동으로 시작됨 */}
      {/* <ControlButton
        isRecording={isRecording}
        onClick={isRecording ? handleStopRecording : handleStartRecording}
      /> */}
      <AudioPlayer audioUrl={audioUrl} />
    </div>
  );
}
