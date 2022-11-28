import { axiosInstance } from "../../../axiosInstance";
import { ICommonContentType } from "../../../types/common";
import { ICommonChangeLikeStateType } from "../../../types/course";
import {
  IDetailCommentsType,
  ITravelNoteDetailInfoType,
} from "../../../types/note/detail";

// 기본 정보 조회
export const fetchTravelNoteDetailInfo = async (
  travelNoteId: number
): Promise<ITravelNoteDetailInfoType> => {
  const { data } = await axiosInstance.get(`/note/detail/${travelNoteId}`);
  return data;
};

// 댓글 조회
export const fetchTravelNoteCommentList = async (
  travelNoteId: number
): Promise<IDetailCommentsType[]> => {
  const { data } = await axiosInstance.get(
    `/note/detail/comment/${travelNoteId}`
  );
  return data.data;
};

// 댓글 추가
export const addTravelNoteDetailComment = async ({
  id,
  content,
}: ICommonContentType): Promise<void> => {
  const { data } = await axiosInstance.post(`/note/detail/comment`, {
    id,
    content,
  });
  return data;
};

// 댓글 삭제
export const deleteTravelNoteDetailComment = async (
  commentId: number
): Promise<void> => {
  const { data } = await axiosInstance.delete(
    `/note/detail/comment/${commentId}`
  );
  return data;
};

// 댓글 좋아요 변경
export const changeTravelNoteDetailCommentLikeState = async ({
  id,
  like,
}: ICommonChangeLikeStateType): Promise<void> => {
  const { data } = await axiosInstance.patch(`/note/detail/comment/like`, {
    id,
    like,
  });
  return data;
};

// 이 일정으로 계획 만들기
export const travelNoteDetailMakeMyNote = async (
  travelNoteId: number
): Promise<number> => {
  const { data } = await axiosInstance.post(`/note/detail/new`, {
    travelNoteId,
  });
  return data.travelNoteId;
};
