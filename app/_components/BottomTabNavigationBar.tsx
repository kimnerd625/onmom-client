"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeIconUnselected from "@/public/icons/icon-home-black.svg";
import DiaryIconUnselected from "@/public/icons/icon-diary-black.svg";
import AlarmIconUnselected from "@/public/icons/icon-alarm-black.svg";
import MenuIconUnselected from "@/public/icons/icon-menu-black.svg";
import ModalIcon from "@/public/icons/icon-modal-white.svg";

import HomeIconSelected from "@/public/icons/icon-home-selected.svg";
import DiaryIconSelected from "@/public/icons/icon-diary-selected.svg";

const BottomTabNavigationBar = () => {
  const currentSelected = usePathname().split("/").pop();

  return (
    <section className="bg-white fixed bottom-0 w-full flex flex-row justify-between items-center px-8 py-6 sm:w-[375px]">
      <Link href="/pills">
        <div className="flex flex-row justify-center items-center">
          {currentSelected == "pills" ? (
            <HomeIconSelected width={24} height={24} />
          ) : (
            <HomeIconUnselected width={24} height={24} />
          )}
        </div>
      </Link>
      <Link href="/album">
        <div className="flex flex-row justify-center items-center">
          {currentSelected == "album" ? (
            <DiaryIconSelected width={24} height={24} />
          ) : (
            <DiaryIconUnselected width={24} height={24} />
          )}
        </div>
      </Link>
      <div className="relative flex flex-row justify-center">
        <div
          className="absolute flex justify-center items-center w-[70px] h-[70px] rounded-full -translate-y-10"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 100, 17, 0.2) 35% , rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0) 100%)",
          }}
        />
        <div className="absolute flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#FF6411] shadow-lg -translate-y-12">
          <ModalIcon width={24} height={24} />
        </div>
      </div>
      <Link href="/pills">
        <div className="flex flex-row justify-center items-center">
          <AlarmIconUnselected width={24} height={24} />
        </div>
      </Link>
      <Link href="/pills">
        <div className="flex flex-row justify-center items-center">
          <MenuIconUnselected width={24} height={24} />
        </div>
      </Link>
    </section>
  );
};

export default BottomTabNavigationBar;
