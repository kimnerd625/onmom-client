export interface DiaryData {
  title: string;
  createdAt: string;
  diaryEntryId: number;
  textContent: string;
  imageUrl: string;
  audioUrl: string;
  dailyAnswers: [
    {
      id: number;
      questionText: string;
      answerText: string;
      createdAt: string;
    }
  ];
}
