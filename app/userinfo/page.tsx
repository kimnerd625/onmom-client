import MenuCard from "./_components/MenuCard";
import UserProfile from "./_components/UserProfile";

export default function UserInfoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center select-none overflow-x-hidden overflow-y-scroll">
      <UserProfile />
      <div className="w-full min-h-1 bg-system-divider" />
      <section className="px-7 py-5 w-full flex flex-col justify-center items-start gap-y-3">
        <MenuCard mainText="알림" subText="소리크기, 메세지, 알림" />
        <div className="w-full min-h-[1px] bg-system-divider" />
        <MenuCard mainText="비밀번호 변경" subText="비밀번호" />
        <div className="w-full min-h-[1px] bg-system-divider" />
        <MenuCard
          mainText="피드백 남기기"
          subText="별점 남기기, 온맘에 문의하기"
        />
        <div className="w-full min-h-[1px] bg-system-divider" />
        <MenuCard mainText="환경설정" subText="테마, 폰트" />
      </section>
      <div className="w-full min-h-1 bg-system-divider" />
    </main>
  );
}
