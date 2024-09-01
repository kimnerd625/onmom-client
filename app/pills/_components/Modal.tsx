import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
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
        className="bg-white p-8 rounded-lg shadow-lg w-[90%] relative"
        onClick={handleBackgroundClick} // 모달 내부 클릭 시 전파 중지
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
