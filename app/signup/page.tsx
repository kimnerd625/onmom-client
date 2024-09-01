"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import SignUpForm from "./_components/SignUpForm";
import Spinner from "../_components/Spinner";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <main className="flex min-h-screen flex-col items-center select-none overflow-x-hidden overflow-y-scroll">
      {isLoading && <Spinner />}
      <section className="mt-3 w-full py-10 px-5">
        <div className="w-full flex flex-col justify-start items-start gap-y-6">
          <SignUpForm isLoading={isLoading} setIsLoading={setIsLoading} />
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
