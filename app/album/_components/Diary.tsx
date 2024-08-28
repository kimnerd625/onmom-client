"use client";

import { useState, Dispatch, SetStateAction, useEffect } from "react";

import type { DiaryData } from "../Types/DiaryData";

import ShareIcon from "@/public/icons/icon-share-white.svg";
import DiaryCard from "./Diary/DiaryCard";
import { useSwipeable } from "react-swipeable";

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
      title: "오늘의 일기",
      createdAt: "2024-08-27",
      diaryEntryId: 789,
      textContent:
        "오늘 노인정에서 신성우 할머니와 화투를 쳤어. 항상 내가 이기는데도 매번 하는데 그 할매는 언제쯤 잘 치려나 모르겠네. 그리고 점심으로 노인정에서 칼국수가 나와서 친구들이랑 다같이 먹고 에어컨 바람 쐐면서 시원하게 보냈어",
      imageUrl: "/images/test1.jpg",
      audioUrl: "https://s3.amazonaws.com/bucket-name/audio/1/1234567890.mp3",
      dailyAnswers: [
        {
          id: 1,
          questionText: "약은 드셨나요?",
          answerText: "응 먹었어",
          createdAt: "2024-08-27",
        },
      ],
    },
    {
      title: "다음의 일기",
      createdAt: "2024-08-27",
      diaryEntryId: 790,
      textContent:
        "오늘 노인정에서 신성우 할머니와 화투를 쳤어. 항상 내가 이기는데도 매번 하는데 그 할매는 언제쯤 잘 치려나 모르겠네. 그리고 점심으로 노인정에서 칼국수가 나와서 친구들이랑 다같이 먹고 에어컨 바람 쐐면서 시원하게 보냈어",
      imageUrl: "/images/test1.jpg",
      audioUrl: "https://s3.amazonaws.com/bucket-name/audio/1/1234567890.mp3",
      dailyAnswers: [
        {
          id: 1,
          questionText: "약은 드셨나요?",
          answerText: "응 먹었어",
          createdAt: "2024-08-27",
        },
      ],
    },
  ]);

  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [deg, setDeg] = useState<number>(0);

  const [visible, setVisible] = useState<boolean>(true);

  const diaryHandler = useSwipeable({
    onSwiped: (eventData) => {
      setIsSwiping(false);

      if (deg <= -10) {
        console.log("다음 데이터");

        const newData = [...diaryData];

        setDiaryData(newData);
      }

      if (deg >= 10) {
        console.log("이전 데이터");

        const newData = [...diaryData];

        setDiaryData(newData);
      }

      setDeg(0);
      setVisible(true);
    },
    onSwiping: (eventData) => {
      setIsSwiping(true);
      const newDeg = Math.floor(
        Math.min(Math.max(eventData.deltaX / 10, -10), 10)
      );

      if (newDeg >= 10 || newDeg <= -10) {
        setVisible(false);
      }

      setDeg(newDeg);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/diary", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("그림일기 정보를 가져오는 데 실패했습니다.");
        }

        const data = await response.json();
        setDiaryData(data);
      } catch (error) {
        console.error("그림일기 조회 중 오류 발생", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex relative">
      <div
        {...diaryHandler}
        className={`z-30 relative origin-bottom-right transition-all duration-500 opacity-100`}
        style={{
          transform: `rotate(${deg}deg)`,
          opacity: `${visible ? "1" : "0.7"}`,
        }}
      >
        {isSwiping && (
          <div className="absolute inset-0 bg-black bg-opacity-10 z-10 rounded-[38px] ml-1"></div>
        )}
        <div
          onClick={shareHandler}
          className="z-30 rounded-full p-2.5 top-3 right-3 absolute hover:bg-brand-main_200 cursor-pointer"
        >
          <ShareIcon width={24} height={24}></ShareIcon>
        </div>
        <div className="ml-1 cursor-pointer group hover:outline hover:outline-blue-600 flex justify-center flex-col items-center relative w-[313px] h-[512px] rounded-[38px] bg-album-first">
          <DiaryCard
            title={diaryData[0].title}
            createdAt={diaryData[0].createdAt}
            imageUrl={diaryData[0].imageUrl}
            textContent={diaryData[0].textContent}
          />
          <div>
            <div className="group:hover:border group-hover:outline group-hover:border-l-2 group-hover:border-r-2 group-hover:border-t-2 group-hover:outline-white group-hover:border-r-blue-600 group-hover:border-t-blue-600 group-hover:border-l-blue-600 absolute bottom-0 left-[125px] bg-white w-[67px] h-[33.5px] rounded-t-full"></div>
          </div>
        </div>
      </div>

      <div className="drop-shadow-xl absolute z-20 origin-bottom-right rotate-[10deg]">
        <div className="cursor-pointer group hover:outline hover:outline-blue-600 flex justify-center flex-col items-center relative w-[313px] h-[512px] rounded-[38px] bg-album-second">
          <div className="absolute inset-0 bg-white bg-opacity-5 backdrop-blur-sm z-10"></div>
          <DiaryCard
            title={diaryData[1].title}
            createdAt={diaryData[1].createdAt}
            imageUrl={diaryData[1].imageUrl}
            textContent={diaryData[1].textContent}
          />
        </div>
      </div>
      <div className="drop-shadow-[4px_-4px_8px_rgba(0,0,0,0.3)] absolute z-10 right-20 top-5 origin-bottom-right rotate-[35deg]">
        <div className="cursor-pointer group hover:outline hover:outline-blue-600 flex justify-center flex-col items-center relative w-[290px] h-[400px] rounded-[38px] bg-album-third"></div>
      </div>
    </div>
  );
}
