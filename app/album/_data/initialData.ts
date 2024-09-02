import { DiaryData } from "../Types/DiaryData";

export const initialDiaryData: DiaryData[] = [
  {
    title: "노인회관에서 고스톱 한판",
    translatedContent: "",
    medicationStatus: false,
    createdAt: "2024-09-01",
    diaryEntryId: 789,
    summaryContent:
      "오늘은 노인회관에 가서 고스톱을 치러 가신다고 하셨어요. 고스톱을 즐기시는 모습이 생생했어요. 편안한 분위기 속에서 즐거운 시간 보내시길 바랄게요. 그림에는 노인회관에서 고스톱을 즐기시는 모습을 표현해볼까요?",
    imageUrl: "/images/test1.png",
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
    title: "노인회관에서 즐거운 추억",
    translatedContent: "",
    medicationStatus: false,
    createdAt: "2024-09-02",
    diaryEntryId: 790,
    summaryContent:
      "오늘은 노인회관에 가셔서 고스톱을 치시는 날이셨군요. 노인회관에서는 친구들과 함께 시간을 보내시는 모습이 인상적이었어요. 친구들과의 이야기와 게임으로 즐거운 시간을 보내셨을 텐데, 그 모습을 보니 행복해 보였어요. 노인회관에서의 소중한 추억을 만드시는 모습이 마음에 남아요.",
    imageUrl: "/images/test2.png",
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
    title: "명절에 가족들과 모임",
    translatedContent: "",
    medicationStatus: false,
    createdAt: "2024-09-03",
    diaryEntryId: 790,
    summaryContent:
      "오늘 명절이라 오랜만에 온 가족이 모였어. 다들 편안한 옷을 입고, 거실에 둘러앉아 윷놀이를 했지. 손주도 같이 윷을 던지면서 정말 많이 웃었어. 함께 있는 시간이 너무 좋았어. 가족들이랑 같이 있으니까 집안이 더 따뜻하고 화목하게 느껴졌어. 이런 순간이 자주 있었으면 좋겠네",
    imageUrl: "/images/test3.png",
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
    title: "공원에서 손자와 하루",
    translatedContent: "",
    medicationStatus: false,
    createdAt: "2024-09-04",
    diaryEntryId: 790,
    summaryContent:
      "오늘 공원에 나가서 할아버지랑 시간을 보냈어. 둘이 벤치에 앉아서 옛날 이야기하면서 많이 웃었지. 할아버지가 옛날 얘기 꺼내면서 웃으시는데, 나도 덩달아 기분이 좋아지더라. 공원에서 같이 있으니까 마음이 참 편안하고 따뜻했어. 요즘 이런 시간이 더 소중하게 느껴져. 앞으로도 이런 시간을 자주 가졌으면 좋겠어",
    imageUrl: "/images/test4.png",
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
