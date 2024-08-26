import Image from "next/image";

import Frame from "@/public/icons/frame.svg";

import type { DiaryData } from "../../Types/DiaryData";

export default function DiaryCard({ imageUrl, data }: DiaryData) {
  return (
    <section className="relative w-[270px] h-[380px] bg-white p-2 font-yoonchildfundDaeHan">
      <div className="top-[-12px] right-[-10px] absolute">
        <Frame />
      </div>
      <div className="relative flex flex-row justify-between h-[40px]">
        <div>{data.title}</div>
        <div>{data.date}</div>
      </div>

      <div className="relative h-[225px] overflow-hidden rounded-lg flex-row justify-between flex ">
        <Image
          src={imageUrl}
          alt="그림일기 이미지"
          layout="fill"
          className="object-fill"
        ></Image>
      </div>

      <div className="relative flex flex-col mt-1">
        <div className="text-xs leading-[26px]">{data.contents}</div>
      </div>
    </section>
  );
}
