"use client";

import React, { useState, useRef, useEffect } from "react";
import { startRecording } from "../_utils/startRecording";
import { stopRecording } from "../_utils/stopRecording";
import { playQuestion } from "../_utils/playQuestion";
import VisualizerCanvas from "../_components/VisualizerCanvas";
import ControlButton from "../_components/ControlButton";
import AudioPlayer from "../_components/AudioPlayer";
import QuestionDisplay from "../_components/QuestionDisplay";
import { getLoginUser } from "@/app/_utils/loginUserInfo";
import { getGroupId } from "@/app/_utils/groupId";

export default function InterviewSection() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null);

  useEffect(() => {
    const loginData = getLoginUser();
    const gId = getGroupId();

    if (gId !== null) {
      setGroupId(gId);
    }

    // JSON.parse 예외 처리 추가
    if (loginData) {
      try {
        const parsedData = JSON.parse(loginData);
        setUserId(parsedData.userId);
      } catch (error) {
        console.error("Failed to parse login data:", error);
      }
    }
  }, []);

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

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-screen bg-[#f7f7f7]">
      <VisualizerCanvas
        imageUrl="/images/logo-circle.png"
        isRecording={isRecording}
        analyser={analyserRef.current}
      />
      <QuestionDisplay currentQuestion={currentQuestion} />
      <ControlButton
        isRecording={isRecording}
        onClick={
          isRecording
            ? () => stopRecording(setIsRecording, mediaRecorderRef)
            : () =>
                startRecording(
                  setIsRecording,
                  setAudioUrl,
                  mediaRecorderRef,
                  audioChunksRef,
                  audioContextRef,
                  analyserRef,
                  (index) =>
                    playQuestion(
                      index,
                      setCurrentQuestionIndex,
                      setCurrentQuestion,
                      () => stopRecording(setIsRecording, mediaRecorderRef)
                    ),
                  userId, // userId 전달
                  groupId // groupId 전달
                )
        }
      />
      <AudioPlayer audioUrl={audioUrl} />
    </div>
  );
}
