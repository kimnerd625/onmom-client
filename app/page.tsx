import Image from "next/image";
import Link from "next/link";
import SwipeIcon from "@/public/icons/icon-swipe.svg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center select-none overflow-x-hidden">
      <div className="mt-[80px] relative w-[375px] h-[400px] flex flex-row justify-center items-center">
        <Image
          src="/images/onboarding-hero-image.png"
          alt="온보딩 이미지"
          fill
        />
      </div>
      <div className="px-[30px] w-full flex flex-col justify-center items-center gap-y-2 -translate-y-16">
        <h2 className="font-bold text-2xl text-black tracking-tight leading-5">
          온맘에 오신걸 환영해요 👋🏻
        </h2>
        <p className="font-normal text-sm text-black tracking-tight leading-5 text-center">
          온맘과 함께 가족들과 하나되는 경험 <br />
          시작해보세요!
        </p>
      </div>
      <Link href="/signin" className="w-full px-4">
        <div className="w-full h-[54px] flex flex-row justify-start items-center bg-[#F8F7F7] rounded-[34px] max-w-[343px] border border-[#E5E5E5] p-0.5 relative group">
          <div className="rounded-[34px] bg-[#FF7B00] p-2.5 absolute left-1 transition-transform duration-500 transform group-hover:translate-x-[266px]">
            <SwipeIcon width={48} height={24} />
          </div>
          <div className="flex flex-row justify-start items-center py-4 absolute right-28 transition-transform duration-500 transform group-hover:-translate-x-[60px]">
            <h4 className="text-base font-bold leading-4">시작하기</h4>
          </div>
        </div>
      </Link>
    </main>
  );
}
