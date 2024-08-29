import Image from "next/image";

export default function Group() {
  return (
    <main className="flex-col justify-center items-center my-20 overflow-x-hidden overflow-y-scroll w-full min-h-screen">
      <div className="font-bold text-xl text-black tracking-tight leading-5 mt-32 flex justify-center">
        <h2>참여하실 그룹이 있으신가요?</h2>
      </div>
      <div className="flex w-full items-center flex-col">
        <div className="relative flex-col justify-center items-center w-[250px] h-[266px]">
          <Image src="/images/group-main.png" alt="그룹메인 이미지" fill />
        </div>
      </div>
      <div className="flex w-full justify-center mt-[72px] gap-10">
        <div className="flex justify-center items-center rounded-[22px] bg-[#FFECD6] px-10 py-2 text-[#FF6411] font-bold">
          그룹 만들기
        </div>
        <div className="flex justify-center items-center rounded-[22px] bg-[#FF6411] px-10 py-2 text-[#FFECD6] font-bold">
          그룹 입장하기
        </div>
      </div>
    </main>
  );
}
