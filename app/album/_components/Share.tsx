"use client";

import { SetStateAction, Dispatch, useState } from "react";

import type { AppList } from "../Types/AppList";
import type { FriendList } from "../Types/FriendList";

import CloseIcon from "@/public/icons/icon-close.svg";
import ShareAppButton from "./Share/ShareAppButton";
import ShareTargetCard from "./Share/ShareTargetCard";

interface ShareProps {
  isOpenShare: boolean;
  setIsOpenShare: Dispatch<SetStateAction<boolean>>;
}

export default function Share({ isOpenShare, setIsOpenShare }: ShareProps) {
  // 앱 리스트 상태 관리
  const [appList, setAppList] = useState<AppList[]>([
    { imageUrl: "/images/message.png", appName: "Message" },
    { imageUrl: "/images/instagram.png", appName: "instagram" },
    { imageUrl: "/images/email.png", appName: "Mail" },
    { imageUrl: "/images/add-link.png", appName: "add-link" },
    { imageUrl: "/images/more.png", appName: "More apps" },
  ]);

  // 내 친구 목록 상태 관리
  const [friendList, setFriendList] = useState<FriendList[]>([
    {
      imageUrl: "/images/profile-img1.png",
      nickName: "큰 딸",
      targetName: "김윤서",
    },
    {
      imageUrl: "/images/profile-img2.png",
      nickName: "작은 딸",
      targetName: "나혜원",
    },
  ]);

  // 공유하기 창 닫기
  const closeHandler = () => {
    setIsOpenShare(true);
  };

  // useEffect hook으로 데이터 받아오기
  //

  return (
    <div
      className={`absolute z-50 w-full bottom-0 flex flex-col h-2/3 transition-transform duration-500 ease-in-out transform ${
        isOpenShare ? "translate-y-full" : "-translate-y-0"
      }`}
    >
      <div className="flex justify-end">
        <button
          onClick={closeHandler}
          className="hover:bg-opacity-80 flex justify-center items-center rounded-full bg-white w-7 h-7 m-3"
        >
          <CloseIcon></CloseIcon>
        </button>
      </div>
      <div className="bg-white w-full h-full p-6 rounded-t-[20px] shadow-inner">
        <div className="flex justify-center">
          <div className="font-bold">공유하기</div>
        </div>

        <div className="flex justify-between py-5">
          {appList.map((app, idx) => {
            return (
              <ShareAppButton
                key={`${idx}_app`}
                imageUrl={app.imageUrl}
                appName={app.appName}
              />
            );
          })}
        </div>

        <div className="flex flex-col border-t">
          {friendList.map((friend, idx) => {
            return (
              <ShareTargetCard
                key={`${idx}_friend`}
                imageUrl={friend.imageUrl}
                nickName={friend.nickName}
                targetName={friend.targetName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
