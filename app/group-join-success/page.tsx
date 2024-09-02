import Image from "next/image";
import Link from "next/link";

export default function Group() {
  return (
    <main className="flex-col justify-center items-center overflow-x-hidden overflow-y-scroll w-full min-h-screen">
      <div className="font-bold text-xl text-black tracking-tight leading-5 mt-52 flex justify-center">
        <h2>은수네 패밀리</h2>
      </div>
      <div className="flex w-full items-center flex-col">
        <div className="relative flex-col justify-center items-center w-[250px] h-[266px] -translate-x-5">
          <Image
            src="/images/heart-hand.png"
            alt="그룹 참여성공 이미지"
            width={250}
            height={266}
          />
        </div>
      </div>
      <div className="flex w-full justify-center mt-[72px] space-x-0">
        <Link href="pills" className="w-full flex justify-center items-center">
          <div className="flex justify-center items-center rounded-[22px] bg-[#FF7B00] px-28 py-2 text-[#FFFFFF] font-bold disabled:opacity-50">
            그룹 입장하기
          </div>
        </Link>
      </div>
    </main>
  );
}
