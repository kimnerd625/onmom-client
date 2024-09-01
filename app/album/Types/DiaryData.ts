export interface DailyAnswer {
  id: number;
  questionText: string;
  answerText: string;
  createdAt: string;
}

export interface DiaryData {
  title: string;
  translatedContent: string;
  medicationStatus: boolean;
  createdAt: string;
  diaryEntryId: number;
  summaryContent: string;
  imageUrl: string;
  audioUrl: string;
  dailyAnswers: DailyAnswer[];
}
