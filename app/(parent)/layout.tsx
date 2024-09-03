"use client";

import React from "react";
import Image from "next/image";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation"; // useRouter 훅 가져오기

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter(); // useRouter 훅 사용

  // 뒤로 가기 함수
  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      {/* 배경 이미지 추가 */}
      <div className="absolute inset-0 -z-10 hidden md:block">
        <Image
          src="/images/bg-gradient-2.png" // 이미지 경로 설정
          alt="Background gradient"
          fill
          style={{ objectFit: "cover" }} // 이미지를 화면에 맞게 조절
          quality={100} // 이미지 품질 설정 (선택 사항)
          priority // 페이지 로딩 시 우선 로드
        />
      </div>

      {/* 뒤로 가기 버튼 */}
      <button
        onClick={handleGoBack}
        className="flex flex-col justify-center items-center fixed top-4 left-4 z-50 bg-brand-main_500 text-white px-4 py-2 rounded hover:bg-brand-main_700 transition-colors"
      >
        <span className="font-bold tracking-tight ">뒤로 가기</span>
      </button>

      <div className="w-full min-h-screen flex justify-center items-center relative">
        <div className="w-full md:w-[1200px] bg-white shadow-md">
          {children}
        </div>
      </div>
    </>
  );
}
