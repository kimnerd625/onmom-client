"use client";

import { getLoginUser } from "@/app/_utils/loginUserInfo";
import { useEffect, useState } from "react";

export default function UserInterest() {
  const [title, setTitle] = useState<string>("회원님의 관심사");
  const [selectInterest, setSelectInterest] = useState<string>("");

  useEffect(() => {
    const LU = getLoginUser();
    if (LU) {
      setTitle(`${JSON.parse(LU).name}님의 관심사`);
    }
  }, []);

  const interests = [
    { emoji: "📚", label: "교육" },
    { emoji: "🔬", label: "과학" },
    { emoji: "🧥", label: "패션" },
    { emoji: "🥘", label: "요리" },
    { emoji: "🗺", label: "역사" },
    { emoji: "👨‍👩‍👦", label: "가족" },
    { emoji: "🌍", label: "뉴스" },
    { emoji: "🗿", label: "재미" },
    { emoji: "⚽", label: "운동" },
  ];

  const handleClick = (label: string) => {
    if (selectInterest.length == 0) {
      setSelectInterest(label);
    } else {
      if (selectInterest === label) {
        setSelectInterest("");
      } else {
        setSelectInterest(label);
      }
    }
  };

  return (
    <div>
      <div className="font-bold text-gray-800 mt-5 p-4">{title}</div>
      <div className="grid grid-cols-3 gap-4 p-3">
        {interests.map((interest, index) => (
          <button
            onClick={() => handleClick(interest.label)}
            key={index}
            className={`flex justify-center items-center bg-album-interest h-[32px] py-2 pr-4 text-center text-sm font-bold rounded-2xl hover:opacity-60  ${
              selectInterest === interest.label
                ? "bg-brand-main_600 text-white"
                : "bg-album-interest hover:opacity-60"
            }`}
          >
            <div className="flex justify-evenly w-full">
              <div>{interest.emoji}</div>
              <div>{interest.label}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
