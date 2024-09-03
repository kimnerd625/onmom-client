import { Dispatch, SetStateAction } from "react";

import type { DiaryData } from "../Types/DiaryData";

import DiaryCalendar from "./Main/DiaryCalendar";
import MemberGreeting from "./Main/MemberGreeting";
import UserInterest from "./Main/UserInterest";

interface DiaryCalendarProps {
  setIsDiaryOpen: Dispatch<SetStateAction<boolean>>;
}
interface DiaryProps {
  diariesData: DiaryData[];
  setDiariesData: Dispatch<SetStateAction<DiaryData[]>>;
  diaryIdx: number;
  setDiaryIdx: Dispatch<SetStateAction<number>>;
}

export default function Main({
  setIsDiaryOpen,
  diariesData,
  setDiariesData,
  diaryIdx,
  setDiaryIdx,
}: DiaryCalendarProps & DiaryProps) {
  return (
    <div className="mt-5">
      <MemberGreeting />
      <DiaryCalendar
        diaryIdx={diaryIdx}
        setDiaryIdx={setDiaryIdx}
        diariesData={diariesData}
        setDiariesData={setDiariesData}
        setIsDiaryOpen={setIsDiaryOpen}
      />
      <UserInterest />
    </div>
  );
}
