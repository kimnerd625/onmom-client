import React, { useState } from "react";
import Modal from "./Modal";
import MedicationForm from "./MedicationFormProps";
import PlusIcon from "@/public/icons/icon-plus-white.svg";

interface AddPillProps {
  userId: number;
  groupId: number | null;
}

const AddPill = ({ userId, groupId }: AddPillProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className="relative w-full h-12 bg-brand-main_500 flex justify-center items-center rounded-xl"
        onClick={handleOpenModal}
      >
        <PlusIcon
          width={24}
          height={24}
          className="absolute -translate-x-[42px] -translate-y-[1px]"
        />
        <span className="font-semibold text-lg text-white tracking-tight  cursor-pointer">
          약 추가
        </span>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-2xl font-semibold mb-4">복약 정보 등록</h2>
        <MedicationForm
          userId={userId}
          groupId={groupId}
          onSubmit={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default AddPill;
