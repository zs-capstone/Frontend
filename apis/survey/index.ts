import { axiosInstance } from "../../axiosInstance";
import {
  IGetTravelSurveyType,
  ISubmitTravelSurveyType,
} from "../../types/survey";

// 설문 정보 조회
export const getTravelSurvey = async (): Promise<IGetTravelSurveyType[]> => {
  const { data } = await axiosInstance.get("/surveys");
  return data.data;
};

// 설문 결과 제출
export const submitTravelSurvey = async (
  surveyInitRatingList: ISubmitTravelSurveyType[]
): Promise<void> => {
  const { data } = await axiosInstance.post(`/surveys`, {
    surveyInitRatingList,
  });
  return data;
};

// 멤버 설문 번호 조회
export const surveyProgress = async (): Promise<{ progress: number }> => {
  const { data } = await axiosInstance.get(`/survey/progress`);
  return data;
};
