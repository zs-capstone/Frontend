import { axiosInstance } from "../../axiosInstance";
import { IPlaceListType, ITravelNoteProfileListType } from "../../types/common";
import {
  IIntegratedMemberSearchListType,
  IIntegratedPlaceSearchListType,
  IRelatedSearchListType,
} from "../../types/search";

// 여행지 검색 결과 전송
export const fetchPlaceSearchList = async (
  page: number,
  content: string
): Promise<IPlaceListType> => {
  const { data } = await axiosInstance.get(
    `/search/place?content=${content}&page=${page}`
  );
  return data;
};

// 연관 검색
export const fetchRelatedSearchList = async (
  content: string
): Promise<IRelatedSearchListType> => {
  const { data } = await axiosInstance.get(`/search?content=${content}`);
  return data;
};

// 여행지 통합 검색
export const fetchIntegratedPlaceSearchList = async (
  content: string,
  page: number,
  limit: number,
  option?: number | null
): Promise<IIntegratedPlaceSearchListType> => {
  if (option) {
    const { data } = await axiosInstance.get(
      `/search/place?content=${content}&page=${page}&limit=${limit}&option=${option}`
    );
    return data;
  } else {
    const { data } = await axiosInstance.get(
      `/search/place?content=${content}&page=${page}&limit=${limit}`
    );
    return data;
  }
};

// 여행 노트 통합 검색
export const fetchIntegratedTravelNoteSearchList = async (
  content: string,
  page: number,
  limit: number,
  option?: number | null
): Promise<ITravelNoteProfileListType> => {
  if (option) {
    const { data } = await axiosInstance.get(
      `/search/note?content=${content}&page=${page}&limit=${limit}&option=${option}`
    );
    return data;
  } else {
    const { data } = await axiosInstance.get(
      `/search/note?content=${content}&page=${page}&limit=${limit}`
    );
    return data;
  }
};

// 멤버 통합 검색
export const fetchIntegratedMemberSearchList = async (
  content: string,
  page: number,
  limit: number
): Promise<IIntegratedMemberSearchListType> => {
  const { data } = await axiosInstance.get(
    `/search/member?content=${content}&page=${page}&limit=${limit}`
  );
  return data;
};
