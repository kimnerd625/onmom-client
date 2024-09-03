"use client"; // 클라이언트 컴포넌트로 선언

import React from "react";
import { removeLoginUser, setLoginUser } from "../_utils/loginUserInfo";
import { setGroupId } from "../_utils/groupId";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Action Card Component (버튼 및 링크를 포함하는 카드)
const ActionCard = ({
  title,
  description,
  link,
  isButton = false,
}: {
  title: string;
  description: string;
  link?: string;
  isButton?: boolean;
}) => {
  const router = useRouter();

  const handleLoginButton = async () => {
    try {
      await removeLoginUser();
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "nahw@onmom.com",
          password: "qwer1234@@",
        }),
      });

      if (!response.ok) {
        throw new Error("로그인에 실패했습니다.");
      }

      const userData = await response.json();
      setLoginUser(userData);
      const userId = userData.userId;

      const groupIdResponse = await fetch(`/api/getGroupId?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!groupIdResponse.ok) {
        throw new Error("그룹 아이디를 불러 오는데 실패했습니다.");
      }

      const groupIdData = await groupIdResponse.json();
      setGroupId(groupIdData.groupId);
      const groupId = groupIdData.groupId;
      toast.success("어르신 계정으로 로그인했습니다!");
      setTimeout(() => {
        router.push("/interview");
      }, 1500);
    } catch (error) {
      toast.error("어르신 계정으로 로그인에 실패했습니다.");
    }
  };

  return (
    <div className="px-6 py-4 rounded-xl shadow-md bg-white flex flex-col items-start">
      <h3 className="font-semibold text-slate-900 text-lg mb-2 tracking-tight leading-snug">
        {title}
      </h3>
      <p className="text-sm text-slate-700 mb-4 tracking-tight leading-snug">
        {description}
      </p>
      {isButton ? (
        <button
          onClick={handleLoginButton}
          className="w-full text-center px-4 py-2 rounded-md bg-brand-main_500 text-white font-semibold text-sm"
        >
          실행하기
        </button>
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

// Test Account Info Card Component
const TestAccountInfoCard = () => {
  return (
    <div className="px-6 py-4 rounded-xl shadow-md bg-white flex flex-col items-start">
      <h3 className="font-semibold text-slate-900 text-lg mb-2 tracking-tight leading-snug">
        🧑‍💻 자녀 테스트 계정 정보
      </h3>
      <p className="text-sm text-slate-700 mb-2 tracking-tight leading-snug">
        이메일: <span className="font-mono">parkdh@onmom.com</span>
      </p>
      <p className="text-sm text-slate-700 tracking-tight leading-snug">
        비밀번호: <span className="font-mono">qwer1234@@</span>
      </p>
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
          isButton
        />
        {/* 새로운 테스트 계정 정보 카드 */}
        <TestAccountInfoCard />
      </div>
    </div>
  );
};

export default ActionCards;
