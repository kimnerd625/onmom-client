import Image from "next/image";
import Link from "next/link";

export default function Group() {
  return (
    <main className="flex-col justify-center items-center overflow-x-hidden overflow-y-scroll w-full min-h-screen">
      <div className="font-bold text-xl text-black tracking-tight leading-5 mt-52 flex justify-center">
        <h2>참여하실 그룹이 있으신가요?</h2>
      </div>
      <div className="flex w-full items-center flex-col">
        <div className="relative flex-col justify-center items-center w-[250px] h-[266px]">
          <Image src="/images/group-main.png" alt="그룹메인 이미지" fill />
        </div>
      </div>
      <div className="flex w-full justify-center mt-[72px] space-x-0">
        <Link
          href="create-group"
          className="w-full flex flex-row justify-center items-center pl-6"
        >
          <div className="flex justify-center items-center rounded-[22px] bg-[#FFECD6] px-10 py-3 text-[#FF6411] font-bold ">
            그룹 만들기
          </div>
        </Link>

        <Link
          href="create-group"
          className="w-full flex flex-row justify-center items-center pr-6"
        >
          <div className="flex justify-center items-center rounded-[22px] bg-[#FF6411] px-8 py-3 text-[#FFECD6] font-bold">
            그룹 입장하기
          </div>
        </Link>
      </div>
    </main>
  );
}
