"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import CopyIcon from "@/public/icons/copy-fill.svg";

interface ClientInviteCodeContentProps {
  inviteCode?: string;
  error?: string;
}

const ClientInviteCodeContent = ({
  inviteCode,
  error,
}: ClientInviteCodeContentProps) => {
  const [displayCode, setDisplayCode] = useState("Z7A3P");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (inviteCode) {
      setDisplayCode(inviteCode);
      setIsLoading(false);
    } else if (error) {
      setIsLoading(false);
    }
  }, [inviteCode, error]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(displayCode)
      .then(() => {
        toast.success("초대 코드가 복사되었습니다.");
      })
      .catch((error) => {
        console.error("Error copying invite code:", error);
        toast.error("초대 코드 복사에 실패했습니다.");
      });
  };

  return (
    <section className="flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto w-full">
      <div className="text-center mt-[20px]">
        <h2 className="font-bold text-4xl text-[#689EFF] tracking-tight leading-5 pl-2 mt-30 pt-2">
          {displayCode}
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
      {isLoading && (
        <p className="text-xs text-[#838383] mt-2">
          초대 코드를 가져오는 중...
        </p>
      )}
    </section>
  );
};

export default ClientInviteCodeContent;
