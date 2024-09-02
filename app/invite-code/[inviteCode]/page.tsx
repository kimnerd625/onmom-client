"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // usePathname 추가
import { getLoginUser } from "../../_utils/loginUserInfo";
import { toast } from "sonner";

export default function Group() {
  const [inviteCode, setInviteCode] = useState<string[]>(Array(5).fill(""));
  const [role, setRole] = useState<"자식" | "부모" | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기
  const inviteCodeFromURL = pathname.split("/").pop(); // URL의 마지막 부분에서 초대 코드 추출

  useEffect(() => {
    if (inviteCodeFromURL && inviteCodeFromURL.length === 5) {
      setInviteCode(inviteCodeFromURL.split(""));
    }
  }, [inviteCodeFromURL]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...inviteCode];
      newCode[index] = value.toUpperCase();
      setInviteCode(newCode);

      if (value !== "" && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && index > 0 && inviteCode[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleRoleSelect = (selectedRole: "자식" | "부모") => {
    setRole(selectedRole);
  };

  const getRoleButtonClass = (buttonRole: "자식" | "부모") => {
    const baseClass = "font-bold rounded-[22px] px-3 py-3 ";
    const unselectedClass =
      "bg-[#FFFFFF] border border-[#FF6411] text-[#FF6411] text-xs ";
    const selectedClass = "bg-[#FFECD6] text-[#FF6411] text-xs ";

    return baseClass + (role === buttonRole ? selectedClass : unselectedClass);
  };

  const handleGroupJoinSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const codeString = inviteCode.join("");
    if (codeString.length === 5 && role) {
      console.log("Submitted Code:", codeString);
      console.log("Selected Role:", role);

      const loginUser = getLoginUser();
      const userId = JSON.parse(loginUser!).userId;
      const inviteCode = codeString;

      try {
        const response = await fetch("/api/joinGroup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: Number(userId),
            code: inviteCode,
            role: role,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "그룹 참여에 실패했습니다.");
        }
        const responseData = await response.json();
        console.log("Response:", responseData);
        toast.success("성공적으로 그룹에 가입했습니다!");

        // 현재 URL의 앞부분을 사용하여 group-join-success로 이동
        const newPath = `${pathname}/wait-queue`;
        setTimeout(() => {
          router.push(newPath);
        }, 1500);
      } catch (error) {
        console.error("Error:", error);
        toast.error(
          error instanceof Error ? error.message : "그룹 참여에 실패했습니다."
        );
      }
    } else {
      console.log("Please fill in all fields and select a role");
      toast.error("모든 필드를 입력하고 역할을 선택해주세요.");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto w-full min-h-screen">
      <div className="text-center">
        <h2 className="font-bold text-xl text-black tracking-tight leading-5 mt-30">
          가족분에게 참여 코드를 받았나요?
        </h2>
        <p className="text-xs pt-2 text-[#838383] tracking-tight leading-5">
          그룹 참여 코드 5자리를 입력해주세요
        </p>
      </div>

      <div className="mt-16 px-8 flex justify-between space-x-2">
        {inviteCode.map((char, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={char}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className="w-12 h-12 text-center text-2xl border-b-2 border-gray-300 focus:outline-none focus:border-[#FF6411] uppercase"
          />
        ))}
      </div>

      <div className="text-center">
        <p className="text-[14px] pt-7 text-[#838383] tracking-tight leading-5">
          코드는 초대자에게 발송됩니다.
        </p>
        <div className="flex text-[14px] justify-center text-center pt-2">
          <p className="font-bold text-black">그룹을 생성하고 싶다면?</p>
          <Link href="create-group">
            <p className="font-bold text-[#FFC46C] pl-2">그룹 만들기</p>
          </Link>
        </div>
      </div>

      <div className="flex justify-center space-x-8 mt-16">
        <button
          type="button"
          onClick={() => handleRoleSelect("자식")}
          className={getRoleButtonClass("자식")}
        >
          자식으로 참여
        </button>
        <button
          type="button"
          onClick={() => handleRoleSelect("부모")}
          className={getRoleButtonClass("부모")}
        >
          부모님으로 참여
        </button>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleGroupJoinSubmit}
          className="flex justify-center items-center rounded-[22px] bg-[#FF7B00] px-36 py-2 text-[#FFFFFF] font-bold disabled:opacity-50"
        >
          확인
        </button>
      </div>
    </main>
  );
}
