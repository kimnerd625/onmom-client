"use client";

import MenuCard from "./_components/MenuCard";
import UserProfile from "./_components/UserProfile";

import NotificationIcon from "@/public/icons/icon-notification.svg";
import FeedbackIcon from "@/public/icons/icon-feedback.svg";
import UserIcon from "@/public/icons/icon-user.svg";
import UserSettingIcon from "@/public/icons/icon-user-setting.svg";
import LogoutIcon from "@/public/icons/icon-logout.svg";
import TrashIcon from "@/public/icons/icon-trash.svg";
import UserDeleteIcon from "@/public/icons/icon-delete-user.svg";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UserInfoPage() {
  const router = useRouter();

  const signOutUser = async () => {
    try {
      const response = await fetch("/api/signOut", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("로그아웃에 실패했습니다.");
      }

      toast.success("성공적으로 로그아웃했습니다.");
      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } catch (error) {
      toast.error("로그아웃에 실패했습니다.");
    }
  };

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
          color="red"
          Icon={LogoutIcon}
          handleButton={signOutUser}
        />
        <Dialog>
          <DialogTrigger asChild>
            <MenuCard
              mainText="회원탈퇴"
              subText="계정을 영구적으로 삭제합니다."
              color="red"
              Icon={TrashIcon}
            />
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <div className="w-full flex flex-col justify-start items-center gap-y-6 px-6 py-7">
              <section className="w-full flex flex-col justify-center items-center gap-y-3">
                <UserDeleteIcon width={132} height={132} />
                <h4 className="text-xl tracking-tight leading-10 text-[#27364E] font-bold">
                  계정을 영구적으로 삭제하시겠습니까?
                </h4>
                <p className="text-sm tracking-tight leading-7 text-[#838FA0] font-medium text-center">
                  온맘에서 작성한 모든 활동 내역이 삭제됩니다. <br />
                  삭제된 정보는 다시 복구할 수 없습니다. <br />
                  <br />
                  기기변경 / 재설치의 경우에는 탈퇴하지 마시고 <br />
                  기존 온맘 계정으로 접속하시면 복원 가능합니다. <br />
                </p>
              </section>
              <button className="flex flex-col justify-center items-center py-3 px-11 rounded-[30px] bg-brand-main_600">
                <span className="font-semibold text-base text-white tracking-tight leading-6">
                  회원 탈퇴하기
                </span>
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </main>
  );
}
