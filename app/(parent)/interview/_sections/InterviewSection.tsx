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
import DrawLoading from "../_components/Loading";
import { initialDiaryData } from "@/app/(child)/album/_data/initialData";

export interface DailyAnswer {
  id: number;
  questionText: string;
  answerText: string;
  createdAt: string;
}

export interface DiaryData {
  title: string;
  translatedContent: string;
  medicationStatus: boolean;
  createdAt: string;
  diaryEntryId: number;
  summaryContent: string;
  imageUrl: string;
  audioUrl: string;
  dailyAnswers: DailyAnswer[];
}

export default function InterviewSection() {
  const [isRecording, setIsRecording] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<DiaryData>(initialDiaryData[0]);

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
      {isLoading && <DrawLoading />}
      {!isDone && (
        <>
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
                      setData,
                      setIsDone,
                      setIsLoading,
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
        </>
      )}
      {isDone && (
        <>
          <DiaryDisplay data={data} audioUrl={audioUrl} />
        </>
      )}
    </div>
  );
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const DiaryDisplay = ({
  data,
  audioUrl,
}: {
  data: DiaryData;
  audioUrl: string | null;
}) => {
  return (
    <div className="w-full flex flex-row justify-around items-center gap-x-12 px-16 py-12">
      <img
        src={data.imageUrl}
        alt="Diary Image"
        className="w-[480px] h-[480px] mb-4 rounded-2xl"
      />
      <div className="w-full flex flex-col justify-between items-start font-yoonchildfundManSeh gap-y-6">
        <h2 className="text-4xl font-bold tracking-tight leading-snug mb-4 text-[#111213]">
          {formatDate(data.createdAt)}, 오늘의 그림 일기
        </h2>
        <p
          className="text-2xl font-semibold text-[#363C47] tracking-tight indent-4"
          style={{
            lineHeight: "64px",
            wordBreak: "keep-all",
            whiteSpace: "pre-wrap",
          }}
        >
          {data.summaryContent}
        </p>
      </div>
    </div>
  );
};
