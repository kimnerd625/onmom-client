import Image from "next/image";
import StartButton from "../_components/StartButton";

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
      <div className="w-full px-4">
        <StartButton />
      </div>
    </main>
  );
}
