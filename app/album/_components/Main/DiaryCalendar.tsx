"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DiaryData } from "../../Types/DiaryData";
import { getLoginUser } from "@/app/_utils/loginUserInfo";
import { getGroupId } from "@/app/_utils/groupId";

interface DiaryCalendarProps {
  setIsDiaryOpen: Dispatch<SetStateAction<boolean>>;
}
interface DiaryProps {
  diariesData: DiaryData[];
  setDiariesData: Dispatch<SetStateAction<DiaryData[]>>;
  diaryIdx: number;
  setDiaryIdx: Dispatch<SetStateAction<number>>;
}

export default function DiaryCalendar({
  setIsDiaryOpen,
  diariesData,
  setDiariesData,
  diaryIdx,
  setDiaryIdx,
}: DiaryCalendarProps & DiaryProps) {
  const [diariesDate, setDiariesDate] = useState<Date[]>([
    new Date(
      `${new Date("2024-9-12").getFullYear()}-${
        new Date("2024-9-12").getMonth() + 1
      }-${new Date("2024-9-12").getDate()}`
    ),
  ]);

  const [selected, setSelected] = useState<Date | undefined>(new Date());

  const [selectYear, setSelectYear] = useState<number>(
    selected ? selected.getFullYear() : new Date().getFullYear()
  );
  const [selectMonth, setSelectMonth] = useState<number>(
    selected ? selected.getMonth() + 1 : new Date().getMonth()
  );

  const [selectDate, setSelectDate] = useState<number>(
    selected ? selected.getDate() : new Date().getDate()
  );

  const fetchData = async (
    year: number,
    month: number,
    userId: number,
    groupId: string
  ) => {
    try {
      const response = await fetch(
        `/api/getMonthDiary?groupId=${groupId}&userId=${userId}&year=${year}&month=${month}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("그림일기 정보를 가져오는 데 실패했습니다.");
      }

      const data = await response.json();
      setDiariesData(data);

      const diariesDate = data.map((diary: DiaryData) => {
        return new Date(
          `${new Date(diary.createdAt).getFullYear()}-${
            new Date(diary.createdAt).getMonth() + 1
          }-${new Date(diary.createdAt).getDate()}`
        );
      });
      setDiariesDate(diariesDate);
    } catch (error) {
      console.error("그림일기 월별 조회에 오류가 발생하였습니다.", error);
    }
  };

  useEffect(() => {
    const groupId = getGroupId();
    const loginUser = getLoginUser();

    if (!loginUser) {
      console.error("로그인 정보가 없습니다.");
      return;
    }

    if (!groupId) {
      console.error("그룹 아이디가 없습니다.");
      return;
    }

    const userId = JSON.parse(loginUser).userId;
    fetchData(selectYear, selectMonth, userId, groupId);
  }, [selectYear, selectMonth]);

  useEffect(() => {
    if (selected) {
      setSelectYear(selected.getFullYear());
      setSelectMonth(selected.getMonth() + 1);
      setSelectDate(selected.getDate());
    }
  }, [selected]);

  const handleNextClick = () => {
    setSelectMonth((prevMonth) => {
      const newMonth = prevMonth + 1;
      if (newMonth > 12) {
        setSelectYear((prevYear) => prevYear + 1);
        return 1;
      }
      return newMonth;
    });
  };

  const handlePrevClick = () => {
    setSelectMonth((prevMonth) => {
      const newMonth = prevMonth - 1;
      if (newMonth < 1) {
        setSelectYear((prevYear) => prevYear - 1);
        return 12;
      }
      return newMonth;
    });
  };

  const getDiaryIndex = (date: Date, diariesDate: Date[]): number => {
    return diariesDate.findIndex(
      (diaryDate) =>
        diaryDate.getFullYear() === date.getFullYear() &&
        diaryDate.getMonth() === date.getMonth() &&
        diaryDate.getDate() === date.getDate()
    );
  };

  const handleDayClick = (date: Date) => {
    setSelected(date);
    const index = getDiaryIndex(date, diariesDate);

    if (index != -1) {
      setIsDiaryOpen(true);
      setDiaryIdx(index);
    }
  };

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      className="rounded-md border"
      markedDates={diariesDate}
      onNextClick={handleNextClick}
      onPrevClick={handlePrevClick}
      onDayClick={handleDayClick}
    />
  );
}
