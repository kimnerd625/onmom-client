import React from "react";

interface MenuCardProps {
  mainText: string;
  subText: string;
}

const MenuCard = ({ mainText, subText }: MenuCardProps) => {
  return (
    <div className="w-full flex flex-row justify-start items-start gap-x-3">
      <div className="min-h-5 min-w-5 bg-system-divider rounded-full border border-[#838383]"></div>
      <div className="w-full flex flex-1 flex-col justify-start items-start">
        <h4 className="text-sm text-text-main font-semibold tracking-tight leading-6">
          {mainText}
        </h4>
        <span className="text-[10px] text-text-sub font-normal tracking-tight leading-6">
          {subText}
        </span>
      </div>
    </div>
  );
};

export default MenuCard;
