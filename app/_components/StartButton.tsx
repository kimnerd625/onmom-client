"use client";

import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";
import SwipeIcon from "@/public/icons/icon-swipe.svg";


const StartButton = () => {
  const [translateX, setTranslateX] = useState(0);
  const router = useRouter(); // useRouter 훅을 사용하여 네비게이션 제어

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      // 스와이프 중인 동안의 위치를 추적합니다.
      setTranslateX(Math.max(0, Math.min(eventData.deltaX, 266)));
      if (translateX >= 240) {
        router.push("/signin");
      }
    },
    onSwipedRight: () => {
      console.log("Swiped Right!");
    },
    onSwipedLeft: () => {
      // 스와이프를 왼쪽으로 하면 아이콘을 원래 위치로 되돌립니다.
      setTranslateX(0);
    },
  });

  return (
    <div
      {...handlers}
      className="w-full h-[54px] flex flex-row justify-start items-center bg-[#F8F7F7] rounded-[34px] max-w-[343px] border border-[#E5E5E5] p-0.5 relative"
      style={{
        cursor: "pointer",
      }}
    >
      <div
        className="rounded-[34px] bg-[#FF7B00] p-2.5 absolute left-1 transition-transform duration-500 transform"
        style={{
          transform: `translateX(${translateX}px)`,
        }}
      >
        <SwipeIcon width={48} height={24} />
      </div>
      <div className="w-full flex flex-row justify-center items-center py-4">
        <h4 className="text-base font-bold leading-4">시작하기</h4>
      </div>
    </div>
  );
};

export default StartButton;
