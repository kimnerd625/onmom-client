"use client";

import InviteCodeTitle from "./_sections/InviteCodeTitle";
import InviteCodeContent from "./_sections/InviteCodeContent";
import KakaoShare from "@/public/icons/icon-kakao-share.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getGroupId } from "../_utils/groupId";
import { getLoginUser } from "../_utils/loginUserInfo";

export default function InviteCode() {
  const [groupId, setGroupId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const id = getGroupId();
    setGroupId(id);

    const loginUser = getLoginUser();
    setName(JSON.parse(loginUser!).name);
  }, []);

  return (
    <main className="mt-40 w-full min-h-screen flex flex-col items-start justify-start">
      <InviteCodeTitle name={name} />
      <div className="flex w-full justify-center items-center">
        <div className="relative justify-center items-center w-[230px] h-[210px]">
          <Image src="/images/letter.png" alt="초대 이미지" fill />
        </div>
      </div>
      {groupId && <InviteCodeContent groupId={groupId} />}{" "}
      {/* groupId가 존재할 때만 InviteCodeContent 렌더링 */}
      <div className="flex w-full justify-center items-center pt-20">
        <KakaoShare />
      </div>
    </main>
  );
}
