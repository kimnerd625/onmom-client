import React from "react";
import Pill1 from "@/public/icons/pill1.svg";
import Pill2 from "@/public/icons/pill2.svg";
import NextIcon from "@/public/icons/navigate_next.svg";

interface PillCardProps {
  pillName: string;
  frequency: string;
}

const PillCard = ({ pillName, frequency }: PillCardProps) => {
  return (
    <div className="p-[14px] pr-[25px] w-full flex flex-row justify-between items-center bg-[#FFF2E2] rounded-[12px]">
      <div className="flex flex-row justify-start items-center gap-x-4">
        <div className="flex justify-center items-center rounded-full bg-white">
          <Pill1 />
        </div>
        <div className="flex flex-col justify-center items-start">
          <h5 className="font-bold">{pillName}</h5>
          <span>{frequency}</span>
        </div>
      </div>
      <div className="">
        <NextIcon />
      </div>
    </div>
  );
};

export default PillCard;
