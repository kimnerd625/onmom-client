"use client";

import React, { useEffect, useState } from "react";
import SettingIcon from "@/public/icons/icon-setting.svg";
import PillIcon from "@/public/icons/icon-medicalpill.svg";
import Calendar from "@/public/icons/icon-calendar.svg";
import { getLoginUser } from "../_utils/loginUserInfo";
import { getGroupId } from "../_utils/groupId";
import PillCard from "../_components/PillCard";

import Title from "./Title";
import BottomTabNavigationBar from "@/app/_components/BottomTabNavigationBar";
import AddPill from "../_components/AddPill";
import Spinner from "@/app/_components/Spinner";

interface PillCardProps {
  pillName: string;
  frequency: string;
}

interface PillSchedule {
  time: string;
  pills: PillCardProps[];
}

interface MedicationLog {
  logId: number;
  eatTime: string;
}

interface Medication {
  medicationId: number;
  medicineName: string;
  startDate: string;
  endDate: string;
  frequency: number;
  totalDosage: number;
  remainingDosage: number;
  logs: MedicationLog[];
}

export default function PillsSection() {
  const [name, setName] = useState<string>("");
  const [medicationInfos, setMedicationInfos] = useState<Medication[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [groupId, setGroupId] = useState<number | null>(null);
  const [isBuyDate, setIsBuyDate] = useState<boolean>(false);
  const [isTaken, setIsTaken] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const daysUntilExam = 3; // 병원 검진일까지 남은 날
  const today = new Date();
  const examDay = new Date(today);
  examDay.setDate(today.getDate() + daysUntilExam);

  // 동적으로 오늘 날짜부터 시작하는 날짜 배열 생성
  const generateDates = () => {
    const dates = [];
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      dates.push({
        day: dayNames[currentDate.getDay()],
        date: currentDate.getDate(),
        fullDate: currentDate.toISOString().split("T")[0], // YYYY-MM-DD 형식으로 저장
      });
    }
    return dates;
  };

  const dates = generateDates();

  useEffect(() => {
    const loginUser = getLoginUser();
    if (loginUser) {
      const parsedUser = JSON.parse(loginUser);
      setUserId(parsedUser.userId || 0);
    }

    const storedUserString = sessionStorage.getItem("loginUser");
    if (storedUserString) {
      const user = JSON.parse(storedUserString);
      if (user.name) {
        setName(user.name);
      }
      if (user.groupId) {
        setGroupId(Number(user.groupId));
      }
    }
  }, []);

  const fetchMedicationInfos = async () => {
    try {
      const response = await fetch(
        `/api/getPillInfo?userId=${userId}&groupId=${groupId}`
      );

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          console.error("Error:", errorData);
          alert(`Error: ${errorData.message || "Unknown error occurred"}`);
        } else {
          const errorText = await response.text();
          console.error("Error:", errorText);
          alert(`Error: ${response.status} ${response.statusText}`);
        }
        return;
      }

      const data = await response.json();

      const medications: Medication[] = data.map((medication: any) => ({
        medicationId: medication.medicationId,
        medicineName: medication.medicineName,
        startDate: medication.startDate,
        endDate: medication.endDate,
        frequency: medication.frequency,
        totalDosage: medication.totalDosage,
        remainingDosage: medication.remainingDosage,
        logs: medication.logs.map((log: any) => ({
          logId: log.logId,
          eatTime: log.eatTime,
        })),
      }));

      setMedicationInfos(medications);
    } catch (error) {
      console.error("복약 정보를 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId && groupId) {
      fetchMedicationInfos();
    }
  }, [userId, groupId]);

  // 특정 날짜가 약물 복용 기간에 포함되는지 확인
  const isMedicationDay = (fullDate: string) => {
    return medicationInfos.some((medication) => {
      const startDate = new Date(medication.startDate);
      const endDate = new Date(medication.endDate);
      const currentDate = new Date(fullDate);
      return currentDate >= startDate && currentDate <= endDate;
    });
  };

  // 병원 검진일의 날짜와 오늘 날짜를 비교하여 맞는 곳에 Calendar 아이콘 표시
  const isExamDay = (date: number) => {
    return (
      date === examDay.getDate() &&
      today.getMonth() === examDay.getMonth() &&
      today.getFullYear() === examDay.getFullYear()
    );
  };

  return (
    <main className="mt-20 w-full min-h-screen flex flex-col items-start justify-start">
      {isLoading && <Spinner />}
      <Title name={name} examinationDay={daysUntilExam} />
      <section className="w-full flex justify-center items-center px-[34px]">
        <div className="gap-x-3 w-full flex px-5 pt-5 justify-center mt-8 bg-[#f8f8f8] rounded-[22px]">
          {dates.map((date, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-start items-center gap-y-3"
            >
              <p className="font-bold text-xs leading-3 text-[#3a3a3a]">
                {date.day}
              </p>
              <span className="text-sm text-[#1E1E1E] font-bold leading-3">
                {date.date}
              </span>
              {isExamDay(date.date) ? (
                <Calendar className="" />
              ) : isMedicationDay(date.fullDate) ? (
                <PillIcon className="-translate-y-2" />
              ) : (
                <div className="w-6 h-7" />
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="w-full flex flex-col justify-center px-7 mt-[24px] gap-y-3">
        <h2 className="font-semibold text-lg tracking-tight">
          오늘의 복약 목록
        </h2>
        <AddPill userId={userId} groupId={groupId} />
        <div className="min-h-1" />
        {medicationInfos.map((medication, index) => (
          <PillCard
            key={medication.medicationId}
            pillName={medication.medicineName}
            frequency={medication.frequency}
            remainingDosage={medication.remainingDosage}
          />
        ))}
      </section>
      <BottomTabNavigationBar />
    </main>
  );
}
