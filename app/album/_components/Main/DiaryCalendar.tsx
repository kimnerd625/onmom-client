"use Client";

import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { DiaryData } from "../../Types/DiaryData";
import { getLoginUser } from "@/app/_utils/loginUserInfo";

export default function DiaryCalendar() {
  const [diaries, setDiaries] = useState<DiaryData[]>([]);
  const [diariesDate, setDiariesDate] = useState<Date[]>([]);

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

  useEffect(() => {
    const groupId = JSON.parse(getGroupId());
    const { userId } = JSON.parse(getLoginUser());
    const year = selectYear;
    const month = selectMonth;

    const fetchData = async () => {
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
        setDiaries(data);

        const diariesDate = diaries.map((diary) => new Date(diary.createdAt));
        setDiariesDate(diariesDate);
      } catch (error) {
        console.error("그림일기 월별 조회에 오류가 발생하였습니다.", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      className="rounded-md border"
      markedDates={diariesDate}
    />
  );
}
