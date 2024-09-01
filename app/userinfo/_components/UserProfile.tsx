"use client";

import React, { useState, useEffect } from "react";
import { getLoginUser } from "@/app/_utils/loginUserInfo";

const UserProfile = () => {
  const [name, setName] = useState<string>("아무개");
  const [email, setEmail] = useState<string>("whynotworking@naver.com");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const loginDataString = getLoginUser();
      if (loginDataString) {
        const userId = JSON.parse(loginDataString).userId;
        try {
          const response = await fetch(`/api/getUserInfo?userId=${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
          }

          const data = await response.json();
          setName(data.name);
          setEmail(data.email);
        } catch (error) {
          console.error("사용자 정보 로드 중 오류 발생:", error);
        }
      }
    };

    fetchUserInfo();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  return (
    <section className="px-7 py-8 w-full flex flex-row justify-center items-start gap-x-5">
      <div className="min-w-[56px] min-h-[56px] rounded-full bg-slate-200"></div>
      <div className="w-full flex flex-col justify-center items-start gap-y-3">
        <div className="w-full flex flex-col justify-center items-start">
          <h3 className="text-xl text-text-main font-semibold tracking-tight leading-8">
            {name}
          </h3>
          <span className="text-sm font-normal text-text-sub tracking-tight leading-4">
            {email}
          </span>
        </div>
        <div className="px-6 py-3 border border-[#EDEDED] rounded-lg flex flex-row justify-center items-center">
          <span className="text-sm font-medium text-text-main tracking-tight leading-4">
            프로필 수정
          </span>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
