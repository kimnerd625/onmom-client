"use client";

interface InviteCodeTitleProps {
  name: string | null; // string | null 타입으로 수정
}

const InviteCodeTitle = ({ name }: InviteCodeTitleProps) => {
  return (
    <section className="flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto w-full">
      <div className="text-center">
        <h2 className="font-bold text-xl text-black tracking-tight leading-5 mt-30">
          {name ? `${name}님의 초대코드` : "초대코드"}{" "}
          {/* name이 null일 때 처리 */}
        </h2>
        <p className="text-xs pt-2 text-[#838383] tracking-tight leading-5">
          가족들에게 초대코드를 공유해주세요!
        </p>
      </div>
    </section>
  );
};

export default InviteCodeTitle;
