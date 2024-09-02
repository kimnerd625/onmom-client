import React from "react";

interface ControlButtonProps {
  isRecording: boolean;
  onClick: () => void;
}

const ControlButton = ({ isRecording, onClick }: ControlButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 mb-4 text-white bg-blue-600 rounded hover:bg-blue-700 z-10 relative opacity-0"
    >
      {isRecording ? "Stop Recording" : "Start Recording"}
    </button>
  );
};

export default ControlButton;
