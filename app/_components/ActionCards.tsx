"use client"; // 클라이언트 컴포넌트로 선언

import React from "react";

// Action Card Component (버튼 및 링크를 포함하는 카드)
const ActionCard = ({
  title,
  description,
  link,
  isButton = false,
}: {
  title: string;
  description: string;
  link: string;
  isButton?: boolean;
}) => {
  return (
    <div className="px-6 py-4 rounded-xl shadow-md bg-white flex flex-col items-start">
      <h3 className="font-semibold text-slate-900 text-lg mb-2 tracking-tight leading-snug">
        {title}
      </h3>
      <p className="text-sm text-slate-700 mb-4 tracking-tight leading-snug">
        {description}
      </p>
      {isButton ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center px-4 py-2 rounded-md bg-brand-main_500 text-white font-semibold text-sm"
        >
          실행하기
        </a>
      ) : (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {link}
        </a>
      )}
    </div>
  );
};

// Action Cards 컴포넌트
const ActionCards = () => {
  return (
    <div className="fixed top-16 right-12 z-10 hidden md:block">
      <div className="mt-8 grid grid-cols-1 gap-4">
        <ActionCard
          title="📝 온맘 Project Wiki"
          description="온맘 프로젝트 진행 상황을 확인할 수 있어요."
          link="https://url.kr/h9jg3z"
        />
        <ActionCard
          title="🐙 GitHub Repository"
          description="온맘 프로젝트의 소스 코드를 확인해 보세요."
          link="https://github.com/OnMomAiHackathon/"
        />
        <ActionCard
          title="🧪 테스트 계정 실행"
          description="독거 노인 AI 그림일기 생성을 테스트해보세요."
          link="https://your-test-link"
          isButton
        />
      </div>
    </div>
  );
};

export default ActionCards;
