import React from "react";
import SettingIcon from "@/public/icons/icon-setting.svg";
import Link from "next/link";

interface TitleProps {
  name: string;
  examinationDay: number;
}
const Title = ({ name, examinationDay }: TitleProps) => {
  return (
    <section className="px-6 w-full flex flex-col justify-center items-start gap-y-1">
      <div className="w-full flex flex-row justify-between">
        <p className="text-sm text-gray-500 tracking-tight leading-5">
          안녕하세요 {name}님👋🏻
        </p>
        <Link href="/userinfo">
          <SettingIcon width={24} height={24} className="-translate-y-2" />
        </Link>
      </div>
      <h1 className="font-bold text-xl">
        어머님 병원 검진일이 {examinationDay}일 남았습니다.
      </h1>
    </section>
  );
};

export default Title;
