import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center select-none overflow-x-hidden">
      <section className="mt-[100px] w-full py-10 px-5">
        <div className="w-full flex flex-col justify-start items-start gap-y-6">
          <div className="w-full flex flex-row justify-start items-cetner px-2">
            <h3 className="text-xl font-bold tracking-tight text-black leading-5">
              계정에 로그인하세요!
            </h3>
          </div>
          <div className="w-full flex flex-col justify-center items-start gap-y-3">
            <input
              type="text"
              id="email"
              className="w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
              placeholder="이메일"
            />
            <input
              type="text"
              id="password"
              className="w-full rounded-2xl focus:outline-none border border-[#E5E5E5] placeholder:text-[#666666] px-5 py-2.5 text-sm font-bold text-[#636473]"
              placeholder="비밀번호"
            />
            <button className="w-full rounded-2xl bg-[#FF7B00] text-white font-bold text-base tracking-tight leading-4 px-5 py-2.5">
              로그인하기
            </button>
            <Link
              href="findpw"
              className="w-full flex flex-row justify-center items-center"
            >
              <span className="text-sm text-[#636473] font-bold tracking-tight leading-4">
                비밀번호를 잊으셨나요?
              </span>
            </Link>
          </div>
          <div className="w-full flex flex-row justify-center items-center gap-y-4">
            <span className="text-sm text-[#636473] font-bold tracking-tight leading-4">
              or
            </span>
          </div>
          <Link
            href="#"
            className="mt-[100px] w-full flex flex-row justify-center items-center"
          >
            <div className="relative w-[60px] h-[60px]">
              <Image src="/icons/icon-kakao.png" alt="카카오톡 로그인" fill />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
