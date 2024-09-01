import { DiaryData } from "../Types/DiaryData";

export const initialDiaryData: DiaryData[] = [
  {
    title: "오늘의 일기",
    translatedContent: "",
    medicationStatus: false,
    createdAt: "2024-08-27",
    diaryEntryId: 789,
    summaryContent:
      "오늘 노인정에서 신성우 할머니와 화투를 쳤어. 항상 내가 이기는데도 매번 하는데 그 할매는 언제쯤 잘 치려나 모르겠네. 그리고 점심으로 노인정에서 칼국수가 나와서 친구들이랑 다같이 먹고 에어컨 바람 쐐면서 시원하게 보냈어",
    imageUrl: "/images/test1.jpg",
    audioUrl: "https://s3.amazonaws.com/bucket-name/audio/1/1234567890.mp3",
    dailyAnswers: [
      {
        id: 1,
        questionText: "약은 드셨나요?",
        answerText: "응 먹었어",
        createdAt: "2024-08-27",
      },
    ],
  },
  {
    title: "다음의 일기",
    translatedContent: "",
    medicationStatus: false,
    createdAt: "2024-08-27",
    diaryEntryId: 790,
    summaryContent:
      "오늘 노인정에서 신성우 할머니와 화투를 쳤어. 항상 내가 이기는데도 매번 하는데 그 할매는 언제쯤 잘 치려나 모르겠네. 그리고 점심으로 노인정에서 칼국수가 나와서 친구들이랑 다같이 먹고 에어컨 바람 쐐면서 시원하게 보냈어",
    imageUrl: "/images/test1.jpg",
    audioUrl: "https://s3.amazonaws.com/bucket-name/audio/1/1234567890.mp3",
    dailyAnswers: [
      {
        id: 1,
        questionText: "약은 드셨나요?",
        answerText: "응 먹었어",
        createdAt: "2024-08-27",
      },
    ],
  },
];
