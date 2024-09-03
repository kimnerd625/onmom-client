import React from "react";

interface QuestionDisplayProps {
  currentQuestion: string | null;
}

const QuestionDisplay = ({ currentQuestion }: QuestionDisplayProps) => {
  if (!currentQuestion) return null;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h3
        className="text-3xl font-bold text-[#202226] text-center"
        style={{
          lineHeight: "64px",
          wordBreak: "keep-all",
          whiteSpace: "pre-wrap",
        }}
      >
        {currentQuestion}
      </h3>
    </div>
  );
};

export default QuestionDisplay;
