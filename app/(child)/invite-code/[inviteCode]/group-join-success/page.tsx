"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getGroupId } from "@/app/_utils/groupId"; // 그룹 ID를 가져오는 유틸리티
import { toast } from "sonner";
import Spinner from "../../../../_components/Spinner";

interface User {
  userId: number;
  name: string;
  role: string;
  profileImageUrl?: string | null;
  gender: string | null;
}

interface GroupInfo {
  groupName: string;
  members: User[];
  groupImageUrl?: string | null;
}

export default function GroupJoinSuccessPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchGroupInfo = async () => {
      const groupId = getGroupId();
      if (groupId) {
        try {
          const response = await fetch(`/api/getGroupInfo?groupId=${groupId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("그룹 정보를 가져오는 데 실패했습니다.");
          }

          const data = await response.json();
          setGroupInfo({
            groupName: data.groupName,
            members: data.members,
            groupImageUrl: data.groupImageUrl || null,
          });
        } catch (error) {
          toast.error("그룹 정보를 가져오지 못했습니다.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGroupInfo();
  }, []);

  return (
    <main className="flex-col justify-center items-center overflow-x-hidden overflow-y-scroll w-full min-h-screen">
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      )}
      <div className="font-bold text-xl text-black tracking-tight leading-5 mt-40 flex justify-center">
        <h2>{groupInfo?.groupName || "그룹 이름을 불러오지 못했습니다."}</h2>
      </div>
      <div className="mt-16 flex w-full items-center flex-col">
        <div className="relative flex-col justify-center items-center w-[250px] h-[266px] -translate-x-5">
          <Image
            src={groupInfo?.groupImageUrl || "/images/heart-hand.png"} // 기본 이미지 설정
            alt="그룹 참여 성공 이미지"
            width={250}
            height={266}
          />
        </div>
      </div>
      <div className="flex w-full justify-center mt-[48px] space-x-0">
        <Link href="/pills" className="w-full flex justify-center items-center">
          <div className="flex justify-center items-center rounded-[22px] bg-[#FF7B00] px-28 py-2 text-[#FFFFFF] font-bold disabled:opacity-50">
            그룹 입장하기
          </div>
        </Link>
      </div>
    </main>
  );
}
