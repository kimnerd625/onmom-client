"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { getLoginUser } from "@/app/_utils/loginUserInfo";
import { useRouter } from "next/navigation";
import { setGroupId } from "@/app/_utils/groupId";

export default function Group() {
  const [image, setImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [groupName, setGroupName] = useState("");
  const [selectedRole, setSelectedRole] = useState<"자식" | "부모" | null>(
    null
  );

  const router = useRouter();
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
      setImageSrc(null);
    }
  };

  const handleGroupNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleRoleSelect = (role: "자식" | "부모") => {
    setSelectedRole(role);
  };

  const getRoleButtonClass = (role: "자식" | "부모") => {
    const baseClass = "font-bold rounded-[22px] px-3 py-3 ";
    const unselectedClass =
      "bg-[#FFFFFF] border border-[#FF6411] text-[#FF6411] text-xs ";
    const selectedClass = "bg-[#FFECD6] text-[#FF6411] text-xs ";

    return (
      baseClass + (selectedRole === role ? selectedClass : unselectedClass)
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error("참여 역할을 선택해주세요.");
      return;
    }

    if (!groupName.trim()) {
      toast.error("그룹명을 입력해주세요.");
      return;
    }

    const loginUser = getLoginUser();
    const userId = JSON.parse(loginUser!).userId;

    if (userId) {
      const formData = new FormData();
      formData.append("groupName", groupName);
      formData.append("role", selectedRole);
      formData.append("userId", userId);
      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await fetch("/api/createGroup", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("서버 응답이 실패했습니다.");
        }

        console.log("제출된 데이터:", {
          groupName,
          imageUploaded: !!image,
          role: selectedRole,
        });

        const data = await response.json();
        setGroupId(data.groupId);

        toast.success("그룹이 성공적으로 생성되었습니다!");
        setTimeout(() => {
          router.push("/invite-code");
        }, 1500);
      } catch (error) {
        console.error("그룹 생성 중 오류 발생:", error);
        toast.error("그룹 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <main className="flex flex-col justify-center items-center overflow-x-hidden overflow-y-hidden w-full min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="text-center">
          <h2 className="font-bold text-xl text-black tracking-tight leading-5 mt-30">
            그룹 만들기
          </h2>
          <p className="text-xs pt-2 text-[#838383] tracking-tight leading-5">
            만드실 그룹의 정보를 입력해주세요
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <div className="relative w-[106px] h-[106px]">
            <Image
              src={imageSrc || "/images/default-profile.png"}
              alt="Profile"
              fill
              priority
              sizes="106px"
              className="rounded-full object-cover"
            />
            <label
              htmlFor="imageUpload"
              className="absolute bottom-0 right-0 flex justify-center items-center rounded-full w-[25px] h-[25px] cursor-pointer"
              onClick={imageSrc ? removeImage : undefined}
            >
              <Image
                src={
                  imageSrc ? "/images/delete-icon.png" : "/images/add-icon.png"
                }
                alt={imageSrc ? "delete-profile" : "add-profile"}
                fill
                sizes="25px"
              />
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="mt-16 px-8">
          <input
            type="text"
            placeholder="그룹명을 입력하세요"
            className="w-full px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-[#FF6411]"
            value={groupName}
            onChange={handleGroupNameChange}
          />
        </div>

        <div className="flex justify-center space-x-8 mt-8">
          <button
            type="button"
            onClick={() => handleRoleSelect("자식")}
            className={getRoleButtonClass("자식")}
          >
            자식으로 참여
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect("부모")}
            className={getRoleButtonClass("부모")}
          >
            부모님으로 참여
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="flex justify-center items-center rounded-[22px] bg-[#FF7B00] px-36 py-2 text-[#FFFFFF] font-bold disabled:opacity-50"
          >
            확인
          </button>
        </div>
        <div className="mt-8 flex text-[14px] justify-center text-center pt-2">
          <p className="font-bold text-black">초대 받은 그룹이 있다면?</p>
          <Link href="/invite-code/00000">
            <p className="font-bold text-[#FFC46C] pl-2">초대 코드 입력하기</p>
          </Link>
        </div>
      </form>
    </main>
  );
}
