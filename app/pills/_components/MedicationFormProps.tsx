import React, { useState } from "react";

interface MedicationFormProps {
  userId: number;
  groupId: number | null;
  onSubmit: () => void;
}

const MedicationForm = ({ userId, groupId, onSubmit }: MedicationFormProps) => {
  const [medicineName, setMedicineName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [frequency, setFrequency] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      userId,
      groupId,
      medicineName,
      startDate,
      endDate,
      frequency,
    };
    console.log(data);

    try {
      const response = await fetch("http://15.165.54.182:8080/medication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Response:", result);
      if (response.ok) {
        alert("복약 정보가 성공적으로 등록되었습니다.");
        onSubmit(); // 폼 제출 후 모달 닫기
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="font-semibold text-gray-700">약 이름</label>
        <input
          type="text"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          className="p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700">시작 날짜</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700">종료 날짜</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700">
          복용 빈도 (하루에 몇 번)
        </label>
        <input
          type="number"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          className="p-2 border rounded-md"
          min={1}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-[#FF6411] text-white font-semibold rounded-md hover:bg-[#ff5900]"
      >
        등록하기
      </button>
    </form>
  );
};

export default MedicationForm;
