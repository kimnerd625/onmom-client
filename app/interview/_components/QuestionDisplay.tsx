import React from "react";

interface QuestionDisplayProps {
  currentQuestion: string | null;
}

const QuestionDisplay = ({ currentQuestion }: QuestionDisplayProps) => {
  if (!currentQuestion) return null;

  return (
    <div className="mt-8 text-2xl font-bold text-white z-10 relative">
      <h2>{currentQuestion}</h2>
    </div>
  );
};

export default QuestionDisplay;
