"use client";

import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // 스크롤 방지 핸들러 함수
  const preventScroll = (e: Event) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isOpen) {
      // 모달이 열렸을 때 스크롤 방지 이벤트 리스너 추가
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      // 모달이 닫혔을 때 스크롤 방지 이벤트 리스너 제거
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    }

    // 컴포넌트가 언마운트될 때(모달이 닫힐 때) 이벤트 리스너 제거
    return () => {
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 모달 내부 클릭을 방지하기 위해 이벤트 전파 중지
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // 배경 클릭 시 모달 닫힘
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg relative md:w-[345px]"
        onClick={handleBackgroundClick}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-4xl mr-2 mt-4"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
