import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center select-none overflow-x-hidden overflow-y-scroll">
      <section className="mt-3 w-full py-10 px-5">
        <div className="w-full flex flex-col justify-start items-start gap-y-6">
          <div className="w-full flex flex-row justify-start items-cetner px-2">
            <h3 className="text-xl font-bold tracking-tight text-black leading-5">
              계정을 생성해볼까요?
            </h3>
          </div>
          <div className="w-full flex flex-col justify-center items-start gap-y-3">
            <input
              type="text"
              id="email"
              className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
              placeholder="이메일"
            />
            <input
              type="text"
              id="password"
              className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
              placeholder="비밀번호"
            />
            <input
              type="text"
              id="passwordConfirmed"
              className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
              placeholder="비밀번호 확인"
            />
            <input
              type="text"
              id="name"
              className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
              placeholder="이름"
            />
            <input
              type="text"
              id="phone"
              className="h-[46px] w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
              placeholder="전화번호"
            />
            <button className="mt-[12px] h-[46px] w-full rounded-2xl bg-brand-main_600 text-white font-bold text-base tracking-tight leading-4 px-5 py-2.5">
              회원가입
            </button>
          </div>
          <div className="mt-3 w-full flex flex-row justify-center items-center">
            <span className="text-sm text-[#636473] font-bold tracking-tight leading-4">
              or
            </span>
          </div>
          <Link
            href="#"
            className="mt-3 w-full flex flex-row justify-center items-center"
          >
            <div className="relative w-[60px] h-[60px]">
              <Image src="/icons/icon-kakao.png" alt="카카오톡 로그인" fill />
            </div>
          </Link>
          <Link
            href="signin"
            className="mt-2 w-full flex flex-row justify-center items-center"
          >
            <span className="text-xs text-[#636473] font-bold tracking-tight leading-4">
              이미 계정이 있으신가요?{" "}
              <span className="text-brand-main_700">로그인하러 가기</span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
