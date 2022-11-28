import { axiosInstance } from "../../axiosInstance";
import { IMainTravelNoteInfoDataType } from "../../types/common";
import {
  IMainPlaceInfoDataType,
  ITravelNoteDetailRecommendedTravelNotesType,
  ITravelNoteRecommendPlaceType,
} from "../../types/recommend";

// 추천 여행지 조회 (여행 노트)
export const fetchNoteRecommendPlaceList = async (
  travelNoteId: number
): Promise<ITravelNoteRecommendPlaceType[]> => {
  const { data } = await axiosInstance.get(`/recommend/place/${travelNoteId}`);
  return data.data;
};

// 추천 여행지 조회 (메인 페이지)
export const fetchMainRecommendPlaceList = async (): Promise<
  IMainPlaceInfoDataType[]
> => {
  const { data } = await axiosInstance.get(`/recommend/place`);
  return data.data;
};

// 추천 여행 노트 조회 (메인 페이지)
export const fetchMainRecommendNoteList = async (): Promise<
  IMainTravelNoteInfoDataType[]
> => {
  const { data } = await axiosInstance.get(`/recommend/note`);
  return data.data;
};

// 추천 여행 노트 조회 (상세 페이지)
export const fetchNoteDetailRecommendNote = async (
  travelNoteId: number
): Promise<ITravelNoteDetailRecommendedTravelNotesType[]> => {
  const { data } = await axiosInstance.get(
    `/recommend/similar/note/${travelNoteId}`
  );
  return data.data;
};
