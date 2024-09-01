"use client";

import InviteCodeTitle from "./_sections/InviteCodeTitle";
import InviteCodeContent from "./_sections/InviteCodeContent";
import KakaoShare from "@/public/icons/icon-kakao-share.svg";
import Image from "next/image";

interface TitleProps {
  name: string;
}

export default function InviteCode() {
  return (
    <main className="mt-40 w-full min-h-screen flex flex-col items-start justify-start">
      <InviteCodeTitle />
      <div className="flex w-full justify-center items-center">
        <div className="relative justify-center items-center w-[230px] h-[210px]">
          <Image src="/images/letter.png" alt="초대 이미지" fill />
        </div>
      </div>
      <InviteCodeContent />
      <div className="flex w-full justify-center items-center pt-20">
        <KakaoShare />
      </div>
    </main>
  );
}
