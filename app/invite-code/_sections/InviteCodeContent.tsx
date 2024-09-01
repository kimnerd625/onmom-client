"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import CopyIcon from "@/public/icons/copy-fill.svg";
import { getGroupId } from "@/app/_utils/groupId";
import Spinner from "@/app/_components/Spinner";

interface InviteCodeContentProps {
  groupId: string;
}

const InviteCodeContent = ({ groupId }: InviteCodeContentProps) => {
  const [inviteCode, setInviteCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getInviteCode = async () => {
      if (!groupId) return; // groupId가 없으면 실행하지 않음

      try {
        const response = await fetch("/api/createInviteCode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            groupId,
          }),
        });

        if (!response.ok) {
          throw new Error("초대코드 생성에 실패했습니다.");
        }

        const data = await response.json();
        setInviteCode(data.message);
      } catch (error) {
        toast.error("초대코드 발급에 실패했습니다");
      } finally {
        setIsLoading(false);
      }
    };

    if (groupId) {
      getInviteCode();
    }
  }, [groupId]); // groupId가 변경될 때만 실행

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(inviteCode)
      .then(() => {
        toast.success("초대 코드가 복사되었습니다.");
      })
      .catch((error) => {
        console.error("Error copying invite code:", error);
        toast.error("초대 코드 복사에 실패했습니다.");
      });
  };

  return (
    <>
      {isLoading && <Spinner />}
      <section className="flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto w-full">
        <div className="text-center mt-[20px]">
          <h2 className="font-bold text-4xl text-[#689EFF] tracking-tight leading-5 pl-2 mt-30 pt-2">
            {inviteCode}
          </h2>
          <div
            className="flex justify-center items-center pt-2 mt-[20px] cursor-pointer"
            onClick={handleCopyCode}
          >
            <CopyIcon />
            <p className="text-xs text-[#838383] tracking-tight leading-5 ml-2">
              코드 복사하기
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default InviteCodeContent;
