"use client";

import React, { useState } from "react";

const SignUpForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmed, setPasswordConfirmed] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("1995-02-10");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("010-7510-1981");

  const handleSignUpButton = async () => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          birthdate,
          phone,
        }),
      });

      if (!response.ok) {
        throw new Error("회원가입에 실패했습니다.");
      }

      console.log("회원가입 성공!");
    } catch (error) {
      console.error("회원가입 중 오류가 발생했습니다: ", error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-row justify-start items-center px-2">
        <h3 className="text-xl font-bold tracking-tight text-black leading-5">
          계정을 생성해볼까요?
        </h3>
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-y-3">
        <input
          type="email"
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
        <input
          type="password"
          id="passwordConfirmed"
          className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
          placeholder="비밀번호 확인"
          value={passwordConfirmed}
          onChange={(e) => setPasswordConfirmed(e.target.value)}
        />
        <input
          type="text"
          id="name"
          className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          id="phone"
          className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          onClick={handleSignUpButton}
          className="mt-[12px] h-[46px] w-full rounded-2xl bg-brand-main_600 text-white font-bold text-base tracking-tight leading-4 px-5 py-2.5"
        >
          회원가입
        </button>
      </div>
    </>
  );
};

export default SignUpForm;
