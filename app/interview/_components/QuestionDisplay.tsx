import React from "react";

interface QuestionDisplayProps {
  currentQuestion: string | null;
}

const QuestionDisplay = ({ currentQuestion }: QuestionDisplayProps) => {
  if (!currentQuestion) return null;

  const formattedQuestion = currentQuestion.split("/").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h3 className="text-3xl font-bold text-[#202226] text-center">
        {formattedQuestion}
      </h3>
    </div>
  );
};

export default QuestionDisplay;
