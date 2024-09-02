"use client";

import Spinner from "@/app/_components/Spinner";
import { getGroupId } from "@/app/_utils/groupId";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import PlusIcon from "@/public/icons/icon-plus-image.svg";

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

export default function InviteCodePage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);
  const [loginUserId, setLoginUserId] = useState<string>("");

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
      } else {
        toast.error("그룹 아이디가 없습니다.");
        setLoading(false);
      }
    };

    fetchGroupInfo();
  }, []);

  // 역할과 성별에 따라 표시할 이름을 결정하는 함수
  const getRoleLabel = (role: string, gender: string | null) => {
    if (role === "자식") {
      if (gender === "남성") return "아들";
      if (gender === "여성" || gender === null) return "딸";
    } else if (role === "부모") {
      if (gender === "남성") return "아빠";
      if (gender === "여성") return "엄마";
    }
    return role; // 기본 값 반환
  };

  // 역할에 따라 적절한 랜덤 프로필 이미지를 반환하는 함수
  const getRandomProfileImage = (role: string) => {
    if (role === "부모") {
      return "/images/granny-default.jpeg";
    } else {
      const images = [
        "/images/daughter-default.jpeg",
        "/images/daughter-default-two.jpeg",
      ];
      return images[Math.floor(Math.random() * images.length)];
    }
  };

  return (
    <main className="w-full flex flex-col justify-center items-center px-10 py-12 gap-y-4">
      {loading && <Spinner />}
      {!loading && groupInfo && (
        <>
          <section className="w-full flex flex-col justify-center items-center">
            <div
              onClick={() => {}}
              className="min-h-[140px] relative w-full flex flex-col justify-center items-center"
            >
              <Image
                src="/images/group-hero.png"
                alt="그룹 히어로 이미지"
                fill
                style={{ objectFit: "contain" }}
              />
              <div className="w-[70px] h-[70px] flex flex-col justify-center items-center absolute bg-[#d9d9d9] rounded-full overflow-hidden">
                {groupInfo.groupImageUrl ? (
                  <Image
                    src={groupInfo.groupImageUrl}
                    alt="Group Image"
                    width={70}
                    height={70}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <Image
                    src="/images/family-bg.jpeg"
                    alt="Default Group Image"
                    width={70}
                    height={70}
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              <PlusIcon
                width={22}
                height={22}
                className="absolute translate-x-6 translate-y-6"
              />
            </div>
          </section>
          <h2 className="font-bold text-xl tracking-tight leading-10 text-[#202226]">
            {groupInfo.groupName}
          </h2>

          <section className="w-full flex flex-col items-center gap-2">
            <h3 className="text-lg font-semibold mb-2 text-[#202226] tracking-tight leading-10">
              우리 가족 구성원
            </h3>
            {groupInfo.members.map((member) => (
              <div
                key={member.userId}
                className="w-full px-2 py-3 border border-gray-200 rounded-lg shadow-md flex justify-start items-center bg-white"
              >
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  {member.profileImageUrl ? (
                    <Image
                      src={member.profileImageUrl}
                      alt={`${member.name}의 프로필 이미지`}
                      width={50}
                      height={50}
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <Image
                      src={getRandomProfileImage(member.role)}
                      alt="Default User Profile"
                      width={50}
                      height={50}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">
                    {getRoleLabel(member.role, member.gender)}
                  </p>
                  <h4 className="font-bold text-md">{member.name}</h4>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </main>
  );
}
