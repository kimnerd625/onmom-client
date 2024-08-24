import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignInForm from "./_components/SignInForm";

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
          <SignInForm />
          <div className="w-full flex flex-col justify-center items-start gap-y-3">
            <Link
              href="signup"
              className="w-full flex flex-row justify-center items-center"
            >
              <span className="text-sm text-[#636473] font-bold tracking-tight leading-4">
                계정이 없으신가요?{" "}
                <span className="text-brand-main_700">회원가입하러 가기</span>
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
