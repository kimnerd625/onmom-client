export interface DiaryData {
  imageUrl: string;
  data: {
    title: string;
    date: string; //Date 객체를 이용할 수도 있음
    contents: string;
  };
}
