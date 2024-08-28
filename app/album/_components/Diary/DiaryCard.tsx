import Image from "next/image";

import Frame from "@/public/icons/frame.svg";

import type { DiaryData } from "../../Types/DiaryData";

type DiaryCardData = Pick<
  DiaryData,
  "title" | "createdAt" | "imageUrl" | "textContent"
>;

export default function DiaryCard({
  title,
  createdAt,
  imageUrl,
  textContent,
}: DiaryCardData) {
  return (
    <section className="relative w-[270px] h-[380px] bg-white p-2 font-yoonchildfundDaeHan">
      <div className="top-[-12px] right-[-10px] absolute">
        <Frame />
      </div>
      <div className="relative flex flex-row justify-between h-[40px]">
        <div>{title}</div>
        <div>{createdAt}</div>
      </div>

      <div className="relative h-[225px] overflow-hidden rounded-lg flex-row justify-between flex ">
        <Image
          src={imageUrl}
          alt="그림일기 이미지"
          fill
          className="object-fill"
        ></Image>
      </div>

      <div className="relative flex flex-col mt-1">
        <div className="text-xs leading-[26px]">{textContent}</div>
      </div>
    </section>
  );
}
