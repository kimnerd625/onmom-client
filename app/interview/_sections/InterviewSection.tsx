"use client";

import React, { useState, useRef, useEffect } from "react";
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f7f7] relative">
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
                    )
                )
        }
      />
      <AudioPlayer audioUrl={audioUrl} />
    </div>
  );
}
