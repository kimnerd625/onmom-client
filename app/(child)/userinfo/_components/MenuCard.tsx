import React from "react";

interface MenuCardProps {
  mainText: string;
  subText: string;
  Icon: React.ElementType;
  color?: string;
  handleButton?: () => {};
}

const MenuCard = ({
  mainText,
  subText,
  Icon,
  color = "main",
  handleButton,
}: MenuCardProps) => {
  return (
    <div
      onClick={handleButton}
      className="w-full flex flex-row justify-start items-start gap-x-3"
    >
      <Icon width={20} height={20} />
      <div className="w-full flex flex-1 flex-col justify-start items-start">
        <h4
          className={`text-sm font-semibold tracking-tight leading-6 ${
            color === "red" ? "text-system-critical" : "text-text-main"
          }`}
        >
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
