import React from "react";

interface QuestionDisplayProps {
  currentQuestion: string | null;
}

const QuestionDisplay = ({ currentQuestion }: QuestionDisplayProps) => {
  if (!currentQuestion) return null;

  return (
    <div className="w-full flex flex-col justify-center item-center">
      <h3 className="text-2xl font-bold text-[#202226] text-center">
        {currentQuestion}
      </h3>
    </div>
  );
};

export default QuestionDisplay;
