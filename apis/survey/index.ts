import { axiosInstance } from "../../axiosInstance";
import {
  IGetTravelSurveyType,
  ISubmitTravelSurveyType,
} from "../../types/survey";

// 설문 정보 조회
export const getTravelSurvey = async (
  progress: number
): Promise<IGetTravelSurveyType[]> => {
  const { data } = await axiosInstance.get(`/survey/${progress}`);
  return data.data;
};

// 설문 결과 제출
export const submitTravelSurvey = async ({
  progress,
  contentId,
}: ISubmitTravelSurveyType): Promise<void> => {
  const { data } = await axiosInstance.post(`/survey/result`, {
    progress,
    contentId,
  });
  return data;
};

// 멤버 설문 번호 조회
export const surveyProgress = async (): Promise<{ progress: number }> => {
  const { data } = await axiosInstance.get(`/survey/progress`);
  return data;
};
