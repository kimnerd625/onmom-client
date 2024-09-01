"use client";

import { useState } from "react";

import type { DiaryData } from "./Types/DiaryData";

import Diary from "./_components/Diary";
import Dimmed from "./_components/Dimmed";
import Share from "./_components/Share";
import Main from "./_components/Main";

export default function AlbumPage() {
  // 공유하기 컴포넌트 관리하기
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);

  // 공유하는 데이터 관리하기
  const [captureData, setCaptureData] = useState<string>("");
  const [shareDiaryData, setShareDiaryData] = useState<DiaryData>();

  return (
    <div className="relative flex items-center justify-start w-[375px] h-[812px] mr-1 overflow-hidden">
      <Main />
      {/* <Diary
        setShareDiaryData={setShareDiaryData}
        captureData={captureData}
        setCaptureData={setCaptureData}
        isOpenShare={isOpenShare}
        setIsOpenShare={setIsOpenShare}
      />
      {isOpenShare && <Dimmed />}
      <Share
        shareDiaryData={shareDiaryData}
        captureData={captureData}
        isOpenShare={isOpenShare}
        setIsOpenShare={setIsOpenShare}
      /> */}
    </div>
  );
}
