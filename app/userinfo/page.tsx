import MenuCard from "./_components/MenuCard";
import UserProfile from "./_components/UserProfile";

import NotificationIcon from "@/public/icons/icon-notification.svg";
import FeedbackIcon from "@/public/icons/icon-feedback.svg";
import UserIcon from "@/public/icons/icon-user.svg";
import UserSettingIcon from "@/public/icons/icon-user-setting.svg";
import LogoutIcon from "@/public/icons/icon-logout.svg";
import TrashIcon from "@/public/icons/icon-trash.svg";

export default function UserInfoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center select-none overflow-x-hidden overflow-y-scroll">
      <UserProfile />
      <div className="w-full min-h-1 bg-system-divider" />
      <section className="px-7 py-5 w-full flex flex-col justify-center items-start gap-y-3">
        <MenuCard
          mainText="알림"
          subText="소리크기, 메세지, 알림"
          Icon={NotificationIcon}
        />
        <div className="w-full min-h-[1px] bg-system-divider" />
        <MenuCard mainText="비밀번호 변경" subText="비밀번호" Icon={UserIcon} />
        <div className="w-full min-h-[1px] bg-system-divider" />
        <MenuCard
          mainText="피드백 남기기"
          subText="별점 남기기, 온맘에 문의하기"
          Icon={FeedbackIcon}
        />
        <div className="w-full min-h-[1px] bg-system-divider" />
        <MenuCard
          mainText="환경설정"
          subText="테마, 폰트"
          Icon={UserSettingIcon}
        />
      </section>
      <div className="w-full min-h-1 bg-system-divider" />
      <section className="px-7 py-5 w-full flex flex-col justify-center items-start gap-y-3">
        <MenuCard
          mainText="로그아웃"
          subText="계정을 로그아웃합니다."
          Icon={LogoutIcon}
        />
        <MenuCard
          mainText="회원탈퇴"
          subText="계정을 영구적으로 삭제합니다."
          Icon={TrashIcon}
        />
      </section>
    </main>
  );
}
