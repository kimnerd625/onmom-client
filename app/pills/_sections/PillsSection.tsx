"use client";

import React, { useEffect, useState } from "react";

import { getLoginUser } from "../_utils/loginUserInfo";
import { getGroupId } from "../_utils/groupId";
import PillCard from "../_components/PillCard";

import Title from "./Title";
import BottomTabNavigationBar from "@/app/_components/BottomTabNavigationBar";
import AddPill from "../_components/AddPill";

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
        `http://15.165.54.182:8080/medication?userId=${userId}&groupId=${groupId}`
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
    }
  };

  useEffect(() => {
    if (userId && groupId) {
      fetchMedicationInfos();
    }
  }, [userId, groupId]);

  return (
    <main className="mt-20 w-full min-h-screen flex flex-col items-start justify-start">
      <Title name={name} examinationDay={3} />
      <section className="w-full flex justify-center items-center px-[34px]">
        <div className="gap-x-3 w-full flex px-5 pt-5 justify-center mt-8 bg-[#f8f8f8] rounded-[22px]">
          {/* 날짜와 관련된 코드 */}
        </div>
      </section>
      <section className="w-full flex flex-col justify-center px-7 mt-[56px] gap-y-5">
        <h2 className="font-semibold text-lg tracking-tight">
          오늘의 복약 목록
        </h2>
        <AddPill userId={userId} groupId={groupId}></AddPill>
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
