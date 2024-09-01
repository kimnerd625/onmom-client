import React, { useState } from "react";
import Modal from "./Modal";
import MedicationForm from "./MedicationFormProps";

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
      <div className="w-full h-12 bg-gray-200 flex justify-center items-center gap-2">
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </svg>
        <span className="mt-1 cursor-pointer" onClick={handleOpenModal}>
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
