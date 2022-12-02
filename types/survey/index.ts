export interface IGetTravelSurveyType {
  id: number;
  title: string;
  introduction: string;
  type: string;
  tag: string[];
  imageUrl: string;
}

export interface ISubmitTravelSurveyType {
  progress: number;
  contentId: number;
}
