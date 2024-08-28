"use client";

import React, { useState, useRef, useEffect } from "react";
import { questions } from "../data/interview-questions";
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

  const handleStartRecording = async () => {
    setIsRecording(true);
    setAudioUrl(null);
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
      console.log("Generated audio URL:", audioUrl);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 relative">
      <VisualizerCanvas
        isRecording={isRecording}
        analyser={analyserRef.current}
      />
      <ControlButton
        isRecording={isRecording}
        onClick={isRecording ? handleStopRecording : handleStartRecording}
      />
      <AudioPlayer audioUrl={audioUrl} />
      <QuestionDisplay currentQuestion={currentQuestion} />
    </div>
  );
}
