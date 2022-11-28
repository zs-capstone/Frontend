import { axiosInstance } from "../../../axiosInstance";
import { IDetailCommentAddType, IDetailLikeType } from "../../../types/common";
import { ICommonChangeLikeStateType } from "../../../types/course";
import { IDetailCommentsType } from "../../../types/note/detail";
import {
  IPlaceDetailAdditionalInfoType,
  IPlaceDetailInfoType,
} from "../../../types/place/detail";

// 기본 정보 조회
export const fetchPlaceDetailInfo = async (
  placeId: number,
  option: string
): Promise<IPlaceDetailInfoType> => {
  const { data } = await axiosInstance.get(
    `/place/detail/?placeId=${placeId}&option=${option}`
  );
  return data;
};

// 추가 정보 조회
export const fetchPlaceDetailAdditionalInfo = async (
  placeId: number,
  option: string
): Promise<IPlaceDetailAdditionalInfoType> => {
  const { data } = await axiosInstance.get(
    `/place/detail/info?placeId=${placeId}&option=${option}`
  );
  return data;
};

// 댓글 조회
export const fetchPlaceDetailCommentList = async (
  placeId: number
): Promise<IDetailCommentsType[]> => {
  const { data } = await axiosInstance.get(`/place/detail/comment/${placeId}`);
  return data.data;
};

// 댓글 추가
export const addPlaceDetailComment = async ({
  id,
  text,
}: IDetailCommentAddType): Promise<void> => {
  const { data } = await axiosInstance.post(`/place/detail/comment`, {
    id,
    text,
  });
  return data;
};

// 댓글 삭제
export const deletePlaceDetailComment = async (
  commentId: number
): Promise<void> => {
  const { data } = await axiosInstance.delete(
    `/place/detail/comment/${commentId}`
  );
  return data;
};

// 댓글 좋아요 조회
export const fetchPlaceDetailLike = async (
  placeCommentId: number
): Promise<IDetailLikeType> => {
  const { data } = await axiosInstance.get(
    `/place/detail/comment/like/${placeCommentId}`
  );
  return data;
};

// 댓글 좋아요 변경
export const changePlaceDetailCommentLikeState = async ({
  id,
  like,
}: ICommonChangeLikeStateType): Promise<void> => {
  const { data } = await axiosInstance.patch(`/place/detail/comment/like`, {
    id,
    like,
  });
  return data;
};
