import Image from "next/image";
import { Toaster } from "sonner";
import IntroText from "../_components/IntroText";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster position="top-center" richColors />
      {/* 배경 이미지 추가 */}
      <div className="absolute inset-0 -z-10 hidden md:block">
        <Image
          src="/images/bg-gradient-2.png" // 이미지 경로 설정
          alt="Background gradient"
          layout="fill" // 전체 화면을 채우도록 설정
          style={{ objectFit: "contain" }}
          quality={100} // 이미지 품질 설정 (선택 사항)
          priority // 페이지 로딩 시 우선 로드
        />
      </div>
      <IntroText />
      <div className="w-full min-h-screen flex justify-center items-center relative">
        <div className="w-full md:w-[375px] bg-white shadow-md">{children}</div>
      </div>
    </>
  );
}
