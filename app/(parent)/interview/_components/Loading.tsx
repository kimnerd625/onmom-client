import Image from "next/image";
import React from "react";

const DrawLoading = () => {
  return (
    <div
      role="status"
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-80 z-50 gap-y-6"
    >
      <Image
        src="/images/draw-loading.gif"
        alt="그림 로딩 이미지"
        width={360}
        height={270}
        className="rounded-2xl overflow-hidden"
      />
      <h5 className="text-slate-100 font-bold tracking-tight leading-6 text-xl">
        AI가 그림을 그려주고 있어요. 조금만 기다려주세요!
      </h5>
      <div className="min-h-[48px]" />
    </div>
  );
};

export default DrawLoading;
