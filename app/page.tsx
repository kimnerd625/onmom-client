import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center select-none overflow-x-hidden">
      <div className="mt-[130px] relative w-[375px] h-[400px] flex flex-row justify-center items-center">
        <Image
          src="/images/onboarding-hero-image.png"
          alt="온보딩 이미지"
          fill
        />
      </div>
    </main>
  );
}
