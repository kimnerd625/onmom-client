"use client";

import React, { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  handleEmailChange,
  handlePhoneChange,
} from "../_utils/handleValidation";
import Spinner from "@/app/_components/Spinner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface SignUpFormProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

const SignUpForm = ({ isLoading, setIsLoading }: SignUpFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmed, setPasswordConfirmed] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("1995-02-10");

  const router = useRouter();

  const handleSignUpButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
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
          gender,
        }),
      });

      if (!response.ok) {
        throw new Error("회원가입에 실패했습니다.");
      }
      toast.success("회원가입이 성공적으로 이뤄졌습니다!");
      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } catch (error) {
      toast.error("회원가입에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex flex-row justify-start items-center px-2">
        <h3 className="text-xl font-bold tracking-tight text-black leading-5">
          계정을 생성해볼까요?
        </h3>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-y-3">
        <input
          id="email"
          type="email"
          className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
          placeholder="이메일"
          value={email}
          onChange={(e) => handleEmailChange(e, setEmail, setEmailValid)}
        />
        <input
          id="password"
          type="password"
          className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          id="passwordConfirmed"
          type="password"
          className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
          placeholder="비밀번호 확인"
          value={passwordConfirmed}
          onChange={(e) => setPasswordConfirmed(e.target.value)}
        />
        <input
          id="name"
          type="text"
          className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select onValueChange={(value) => setGender(value)}>
          <SelectTrigger
            className="h-[46px] w-full rounded-2xl border border-[#E5E5E5] px-5 py-2.5 text-sm font-bold text-[#636473] focus:outline-none focus:border-none focus:ring-0"
            onClick={(e) => e.stopPropagation()} // 이벤트 전파 방지
          >
            <SelectValue placeholder="성별" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">남성</SelectItem>
            <SelectItem value="female">여성</SelectItem>
          </SelectContent>
        </Select>
        <input
          id="phone"
          type="tel"
          className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => {
            handlePhoneChange(e, setPhone);
          }}
        />
        <button
          onClick={handleSignUpButton}
          className={`mt-[12px] h-[46px] w-full rounded-2xl text-white font-bold text-base tracking-tight leading-4 px-5 py-2.5 ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-brand-main_600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "가입 중..." : "회원가입"}
        </button>
      </div>
    </>
  );
};

export default SignUpForm;
