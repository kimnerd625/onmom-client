import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";

const AppleSDGothicNeo = localFont({
  src: [
    {
      path: "../public/fonts/AppleSDGothicNeoT.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoEB.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoB.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoSB.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoM.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoR.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoL.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoUL.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoH.ttf",
      weight: "100",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "온맘 - ON:MOM",
  description: "GEN AI HACKATHON - 온맘 : 독거노인 가족 연결 AI 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={`${AppleSDGothicNeo.className} bg-[#f7f7f7]`}>
        <Toaster position="top-center" richColors />
        {/* 모바일 크기로 고정 */}
        <div className="w-full min-h-screen flex justify-center items-center">
          {/* 모바일 화면 고정 크기와 그림자 추가 */}
          <div className="w-full sm:w-[375px] bg-white shadow-md">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
