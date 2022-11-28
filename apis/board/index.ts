import { axiosInstance } from "../../axiosInstance";
import {
  IFeedListType,
  IFeedModifyProfileType,
  IMyFeedListType,
} from "../../types/board";
import { IDetailLikeType } from "../../types/common";
import { ICommonChangeLikeStateType } from "../../types/course";

// 새 피드 생성
export const makeNewBoard = async (
  file: FormData
): Promise<{ boardId: number }> => {
  const { data } = await axiosInstance.post(`/board/new`, file);
  return data;
};

// 피드 수정
export const modifyBoard = async (file: FormData): Promise<void> => {
  const { data } = await axiosInstance.put(`/board`, file);
  return data;
};

// 피드 조회
export const fetchFeedList = async (
  page: number,
  limit: number,
  option?: number | null
): Promise<IFeedListType> => {
  if (option) {
    const { data } = await axiosInstance.get(
      `/board?page=${page}&limit=${limit}&option=${option}`
    );
    return data;
  } else {
    const { data } = await axiosInstance.get(
      `/board?page=${page}&limit=${limit}`
    );
    return data;
  }
};

// 피드 수정 페이지 조회
export const fetchModifyFeedProfile = async (
  boardId: number
): Promise<IFeedModifyProfileType> => {
  const { data } = await axiosInstance.get(`/board/modification/${boardId}`);
  return data;
};

export const fetchMyFeedList = async (
  page: number,
  limit: number
): Promise<IMyFeedListType> => {
  const { data } = await axiosInstance.get(`/board/my/${page}/${limit}`);
  return data;
};

// 피드 좋아요 조회
export const fetchFeedLike = async (
  boardId: number
): Promise<IDetailLikeType> => {
  const { data } = await axiosInstance.get(`/board/like/${boardId}`);
  return data;
};

// 피드 좋아요 변경
export const changeFeedLikeState = async ({
  id,
  like,
}: ICommonChangeLikeStateType): Promise<void> => {
  const { data } = await axiosInstance.patch(`/board/like`, { id, like });
  return data;
};

// 피드 삭제
export const removeFeed = async (boardId: number): Promise<void> => {
  const { data } = await axiosInstance.delete(`/board/${boardId}`);
  return data;
};
