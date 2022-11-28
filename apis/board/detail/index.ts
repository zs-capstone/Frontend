import { axiosInstance } from "../../../axiosInstance";
import {
  IFeedCommentType,
  IFeedDetailProfileType,
} from "../../../types/board/detail";
import { IDetailCommentAddType, IDetailLikeType } from "../../../types/common";
import { ICommonChangeLikeStateType } from "../../../types/course";

// 피드 정보 조회 (피드 상세 페이지)
export const fetchFeedDetailProfile = async (
  boardId: number
): Promise<IFeedDetailProfileType> => {
  const { data } = await axiosInstance.get(`/board/detail/${boardId}`);
  return data;
};

// 댓글 개수 조회
export const fetchFeedCommentCount = async (
  boardId: number
): Promise<number> => {
  const { data } = await axiosInstance.get(
    `/board/detail/comment/count/${boardId}`
  );
  return data.count;
};

// 댓글 조회
export const fetchFeedComment = async (
  boardId: number
): Promise<IFeedCommentType[]> => {
  const { data } = await axiosInstance.get(`/board/detail/comment/${boardId}`);
  return data.data;
};

// 댓글 추가
export const addFeedComment = async ({
  id,
  text,
}: IDetailCommentAddType): Promise<void> => {
  const { data } = await axiosInstance.post(`/board/detail/comment`, {
    id,
    text,
  });
  return data;
};

// 댓글 삭제
export const deleteFeedComment = async (commentId: number): Promise<void> => {
  const { data } = await axiosInstance.delete(
    `/board/detail/comment/${commentId}`
  );
  return data;
};

// 댓글 좋아요 조회
export const fetchFeedCommentLikes = async (
  commentId: number
): Promise<IDetailLikeType> => {
  const { data } = await axiosInstance.get(
    `/board/detail/comment/like/${commentId}`
  );
  return data;
};

// 댓글 좋아요 변경
export const changeFeedCommentLikeState = async ({
  id,
  like,
}: ICommonChangeLikeStateType): Promise<void> => {
  const { data } = await axiosInstance.patch(`/board/detail/comment/like`, {
    id,
    like,
  });
  return data;
};
