"use client";

import SettingIcon from "@/public/icons/icon-setting.svg";
import PillIcon from "@/public/icons/icon-medicalpill.svg";
import Calendar from "@/public/icons/icon-calendar.svg";
import Image from "next/image";
import { useState } from "react";
import PillCard from "./_components/PillCard";
import Title from "./_sections/Title";
export default function PillsPage() {
  const [isBuyDate, setIsBuyDate] = useState<boolean>(false);
  const [isTaken, setIsTaken] = useState<boolean>(false);

  return (
    <main className="mt-20 w-full min-h-screen flex flex-col items-start justify-start">
      <Title name="은수" examinationDay={3} />
      <section className="w-full flex justify-center items-center px-[34px]">
        <div className="gap-x-3 w-full flex px-5 pt-5 justify-center mt-8 bg-[#f8f8f8] rounded-[22px]">
          <div className="w-full flex flex-col justify-start items-center gap-y-3 ">
            <p className="font-bold text-xs leading-3 text-[#3a3a3a]">MON</p>
            <span className="text-sm text-[#1E1E1E] font-bold leading-3">
              5
            </span>
            {isTaken ? (
              <PillIcon className="-translate-y-2" />
            ) : isBuyDate ? (
              <Calendar className="-translate-y-2" />
            ) : (
              <div className="w-6 h-7" />
            )}
          </div>
          <div className="w-full flex flex-col justify-start items-center gap-y-3 ">
            <p className="font-bold text-xs leading-3 text-[#3a3a3a]">MON</p>
            <span className="text-sm text-[#1E1E1E] font-bold leading-3">
              6
            </span>
            {isTaken ? (
              <PillIcon className="-translate-y-2" />
            ) : isBuyDate ? (
              <Calendar className="-translate-y-2" />
            ) : (
              <div className="w-6 h-7" />
            )}
          </div>
          <div className="w-full flex flex-col justify-start items-center gap-y-3 ">
            <p className="font-bold text-xs leading-3 text-[#3a3a3a]">MON</p>
            <span className="text-sm text-[#1E1E1E] font-bold leading-3">
              7
            </span>
            {isTaken ? (
              <PillIcon className="-translate-y-2" />
            ) : isBuyDate ? (
              <Calendar className="-translate-y-2" />
            ) : (
              <div className="w-6 h-7" />
            )}
          </div>
          <div className="w-full flex flex-col justify-start items-center gap-y-3 ">
            <p className="font-bold text-xs leading-3 text-[#3a3a3a]">MON</p>
            <span className="text-sm text-[#1E1E1E] font-bold leading-3">
              8
            </span>
            {isTaken ? (
              <PillIcon className="-translate-y-2" />
            ) : isBuyDate ? (
              <Calendar className="-translate-y-2" />
            ) : (
              <div className="w-6 h-7" />
            )}
          </div>
          <div className="w-full flex flex-col justify-start items-center gap-y-3 ">
            <p className="font-bold text-xs leading-3 text-[#3a3a3a]">MON</p>
            <span className="text-sm text-[#1E1E1E] font-bold leading-3">
              9
            </span>
            {isTaken ? (
              <PillIcon className="-translate-y-2" />
            ) : isBuyDate ? (
              <Calendar className="-translate-y-2" />
            ) : (
              <div className="w-6 h-7" />
            )}
          </div>
          <div className="w-full flex flex-col justify-start items-center gap-y-3 ">
            <p className="font-bold text-xs leading-3 text-[#3a3a3a]">MON</p>
            <span className="text-sm text-[#1E1E1E] font-bold leading-3">
              10
            </span>
            {isTaken ? (
              <PillIcon className="-translate-y-2" />
            ) : isBuyDate ? (
              <Calendar className="-translate-y-2" />
            ) : (
              <div className="w-6 h-7" />
            )}
          </div>
          <div className="w-full flex flex-col justify-start items-center gap-y-3 ">
            <p className="font-bold text-xs leading-3 text-[#3a3a3a]">MON</p>
            <span className="text-sm text-[#1E1E1E] font-bold leading-3">
              11
            </span>
            {isTaken ? (
              <PillIcon className="-translate-y-2" />
            ) : isBuyDate ? (
              <Calendar className="-translate-y-2" />
            ) : (
              <div className="w-6 h-7" />
            )}
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col justify-center px-7 mt-[56px] gap-y-5">
        <h2 className="font-semibold text-lg tracking-tight">
          오늘의 복용 스케줄
        </h2>
        <div className="w-full flex flex-col justify-start items-start gap-y-2">
          <h4>8:00 am</h4>
          <PillCard pillName="오메가3" frequency="하루에 한 번" />
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-y-2">
          <h4>12:00 am</h4>
          <PillCard pillName="오메가3" frequency="하루에 한 번" />
          <PillCard pillName="오메가3" frequency="하루에 한 번" />
        </div>
      </section>
    </main>
  );
}
