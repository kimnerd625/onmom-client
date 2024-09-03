"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setLoginUser } from "@/app/_utils/loginUserInfo";
import { setGroupId } from "@/app/_utils/groupId";

const SignInForm = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();

  const handleLoginButton = async () => {
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
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
      toast.success("로그인이 성공적으로 이뤄졌습니다!");
      setTimeout(() => {
        if (groupId == "") {
          router.push("/create-group");
        } else {
          router.push("/pills");
        }
      }, 1500);
    } catch (error) {
      toast.error("로그인에 실패했습니다.");
    }
  };

  return (
    <>
      <input
        type="text"
        id="email"
        className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        id="password"
        className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => handleLoginButton()}
        className="h-[46px] w-full rounded-2xl bg-brand-main_600 text-white font-bold text-base tracking-tight leading-4 px-5 py-2.5"
      >
        로그인하기
      </button>
    </>
  );
};

export default SignInForm;
