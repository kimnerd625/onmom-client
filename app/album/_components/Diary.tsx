"use client";

import { useState, Dispatch, SetStateAction } from "react";

import type { DiaryData } from "../Types/DiaryData";

import ShareIcon from "@/public/icons/icon-share-white.svg";
import DiaryCard from "./Diary/DiaryCard";

interface ShareProps {
  isOpenShare: boolean;
  setIsOpenShare: Dispatch<SetStateAction<boolean>>;
}

export default function Diary({ isOpenShare, setIsOpenShare }: ShareProps) {
  const shareHandler = () => {
    setIsOpenShare(false);
  };

  // 그림일기 데이터 배열 상태 저장
  const [diaryData, setDiaryData] = useState<DiaryData[]>([
    {
      imageUrl: "/images/test1.jpg",
      data: {
        title: "노인정에서의 하루",
        date: "2024/08/24", //Date 객체를 이용할 수도 있음
        contents:
          "오늘 노인정에서 신성우 할머니와 화투를 쳤어. 항상 내가 이기는데도 매번 하는데 그 할매는 언제쯤 잘 치려나 모르겠네. 그리고 점심으로 노인정에서 칼국수가 나와서 친구들이랑 다같이 먹고 에어컨 바람 쐐면서 시원하게 보냈어",
      },
    },
  ]);

  // useEffect hook으로 그림일기 데이터 배열 받아오기
  //

  return (
    <div className="flex relative">
      <div className="z-30 relative">
        <div
          onClick={shareHandler}
          className="z-30 rounded-full p-2.5 top-3 right-3 absolute hover:bg-brand-main_200 cursor-pointer"
        >
          <ShareIcon width={24} height={24}></ShareIcon>
        </div>
        <div className="ml-1 cursor-pointer group hover:outline hover:outline-blue-600 flex justify-center flex-col items-center relative w-[313px] h-[512px] rounded-[38px] bg-album-first">
          <div>
            <DiaryCard
              imageUrl={diaryData[0].imageUrl}
              data={diaryData[0].data}
            />
          </div>
          <div>
            <div className="group:hover:border group-hover:outline group-hover:border-l-2 group-hover:border-r-2 group-hover:border-t-2 group-hover:outline-white group-hover:border-r-blue-600 group-hover:border-t-blue-600 group-hover:border-l-blue-600 absolute bottom-0 left-[125px] bg-white w-[67px] h-[33.5px] rounded-t-full"></div>
          </div>
        </div>
      </div>

      <div className="drop-shadow-xl absolute z-20 origin-bottom-right rotate-[10deg]">
        <div className="cursor-pointer group hover:outline hover:outline-blue-600 flex justify-center flex-col items-center relative w-[313px] h-[512px] rounded-[38px] bg-album-second"></div>
      </div>
      <div className="drop-shadow-[4px_-4px_8px_rgba(0,0,0,0.3)] absolute z-10 right-20 top-5 origin-bottom-right rotate-[35deg]">
        <div className="cursor-pointer group hover:outline hover:outline-blue-600 flex justify-center flex-col items-center relative w-[290px] h-[400px] rounded-[38px] bg-album-third"></div>
      </div>
    </div>
  );
}
