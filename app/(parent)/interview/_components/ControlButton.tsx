import React, { useState } from "react";

interface ControlButtonProps {
  isRecording: boolean;
  onClick: () => void;
}

const ControlButton = ({ isRecording, onClick }: ControlButtonProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleMouseEnter = () => {
    if (!isRecording) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isRecording) {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    setIsVisible(false); // 버튼을 클릭하면 숨기기
    onClick(); // 외부에서 전달된 onClick 함수 호출
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`absolute inset-0 w-full h-full bg-gray-200 bg-opacity-50 flex items-center justify-center text-slate-900 rounded transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-4xl font-bold tracking-tight">
        {isRecording ? "" : "어르신 오늘 하루는 어떠셨어요?"}
      </span>
    </button>
  );
};

export default ControlButton;
