import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
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

const SpoqaHan = localFont({
  src: [
    {
      path: "../public/fonts/SpoqaHanSansNeo-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/SpoqaHanSansNeo-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/SpoqaHanSansNeo-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SpoqaHanSansNeo-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/SpoqaHanSansNeo-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
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
      <body className={AppleSDGothicNeo.className}>
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
