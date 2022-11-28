import { axiosInstance } from "../../axiosInstance";
import {
  ICommonContentType,
  IDetailLikeType,
  IMainTravelNoteInfoDataType,
  ITravelNoteProfileListType,
} from "../../types/common";
import { ICommonChangeLikeStateType } from "../../types/course";
import {
  IAddCommentType,
  IChangeNotePersonnelType,
  IChangeNotePublicShareType,
  IChangeNoteTitleType,
  ICompanionListType,
  IDeleteCompanionType,
  IMakingNoteCommentType,
  IMakingNoteProfileType,
  IMyFeedTravelNoteType,
  IMyTravelNoteType,
  ISelectedFeedTravelNoteType,
  ISubmitMakingNoteAdvanceType,
} from "../../types/note";

// 새 여행 노트 생성
export const submitMakingNoteAdvance = async ({
  dayStart,
  dayEnd,
  adult,
  child,
  animal,
  region,
  theme,
  places,
}: ISubmitMakingNoteAdvanceType): Promise<{ travelNoteId: number }> => {
  const { data } = await axiosInstance.post(`/note/new`, {
    dayStart,
    dayEnd,
    adult,
    child,
    animal,
    region,
    theme,
    places,
  });
  return data;
};

// 기본 정보 조회
export const fetchMakingNoteProfile = async (
  travelNoteId: number,
  signal?: AbortSignal
): Promise<IMakingNoteProfileType> => {
  const { data } = await axiosInstance.get(`/note/info/${travelNoteId}`, {
    signal,
  });
  return data;
};

// 노트 이름 변경
export const changeNoteTitle = async ({
  travelNoteId,
  newTitle,
}: IChangeNoteTitleType): Promise<void> => {
  const { data } = await axiosInstance.patch(`/note/title`, {
    travelNoteId,
    newTitle,
  });
  return data;
};

// 인원 변경
export const changeNotePersonnel = async ({
  travelNoteId,
  adult,
  child,
  animal,
}: IChangeNotePersonnelType): Promise<void> => {
  const { data } = await axiosInstance.patch(`/note/composition`, {
    travelNoteId,
    adult,
    child,
    animal,
  });
  return data;
};

// 동선 공개 여부 변경
export const changeNotePublicShare = async ({
  travelNoteId,
  publicShare,
}: IChangeNotePublicShareType): Promise<void> => {
  const { data } = await axiosInstance.patch(`/note/public-share`, {
    travelNoteId,
    publicShare,
  });
  return data;
};

// 동행자 조회
export const fetchCompanionList = async (
  travelNoteId: number
): Promise<ICompanionListType[]> => {
  const { data } = await axiosInstance.get(`/note/companion/${travelNoteId}`);
  return data.data;
};

// 동행자 추가
export const addCompanion = async ({
  id,
  content,
}: ICommonContentType): Promise<void> => {
  const { data } = await axiosInstance.patch(`/note/companion`, {
    id,
    content,
  });
  return data;
};

// 동행자 삭제
export const deleteCompanion = async ({
  travelNoteId,
  memberId,
}: IDeleteCompanionType): Promise<void> => {
  const { data } = await axiosInstance.delete(
    `/note/companion/${travelNoteId}/${memberId}`
  );
  return data;
};

// 댓글 조회
export const fetchCommentList = async (
  travelNoteId: number,
  day: number
): Promise<IMakingNoteCommentType[]> => {
  const { data } = await axiosInstance.get(
    `/note/comment/${travelNoteId}/${day}`
  );
  return data.data;
};

// 댓글 추가
export const addComment = async ({
  travelNoteId,
  day,
  text,
}: IAddCommentType): Promise<{ commentId: number; createdTime: Date }> => {
  const { data } = await axiosInstance.post(`/note/comment`, {
    travelNoteId,
    day,
    text,
  });
  return data;
};

// 댓글 삭제
export const deleteComment = async (commentId: number): Promise<void> => {
  const { data } = await axiosInstance.delete(`/note/comment/${commentId}`);
  return data;
};

// 주간 인기 여행 노트 조회
export const fetchWeeklyNotes = async (): Promise<
  IMainTravelNoteInfoDataType[]
> => {
  const { data } = await axiosInstance.get(`/note/week`);
  return data.data;
};

// 좋아요 정보 조회
export const fetchTravelNoteDetailLike = async (
  travelNoteId: number
): Promise<IDetailLikeType> => {
  const { data } = await axiosInstance.get(`/note/like/${travelNoteId}`);
  return data;
};

// 좋아요 변경
export const changeTravelNoteDetailLikeState = async ({
  id,
  like,
}: ICommonChangeLikeStateType): Promise<void> => {
  const { data } = await axiosInstance.patch(`/note/like`, {
    id,
    like,
  });
  return data;
};

// 좋아요 누른 여행 노트 조회
export const fetchTravelNoteLikeList = async (
  page: number,
  limit: number,
  option?: number | null
): Promise<ITravelNoteProfileListType> => {
  if (option) {
    const { data } = await axiosInstance.get(
      `/note/like/list?page=${page}&limit=${limit}&option=${option}`
    );
    return data;
  } else {
    const { data } = await axiosInstance.get(
      `/note/like/list?page=${page}&limit=${limit}`
    );
    return data;
  }
};

// 좋아요 누른 여행 노트 조회 (멤버 상세 페이지)
export const fetchMemberTravelNoteLikedList = async (
  memberId: number,
  page: number,
  limit: number
): Promise<ITravelNoteProfileListType> => {
  const { data } = await axiosInstance.get(
    `/note/like/list/${memberId}/${page}/${limit}`
  );
  return data;
};

// 내 여행 노트 조회
export const fetchMyTravelNote = async (
  page: number,
  limit: number
): Promise<IMyTravelNoteType> => {
  const { data } = await axiosInstance.get(`/note/my/${page}/${limit}`);
  return data;
};

// 내 여행 노트 개수 조회
export const fetchMyTravelNoteCount = async (): Promise<{ count: number }> => {
  const { data } = await axiosInstance.get(`/note/my/count`);
  return data.count;
};

// 내 여행 노트 조회 (여행 피드 작성 페이지)
export const fetchMyFeedTravelNote = async (
  page: number,
  limit: number
): Promise<IMyFeedTravelNoteType> => {
  const { data } = await axiosInstance.get(`/note/my/board/${page}/${limit}`);
  return data;
};

// 내 여행 노트 조회 (여행 피드 작성 페이지)
export const fetchSelectedFeedTravelNote = async (
  travelNoteId: number
): Promise<ISelectedFeedTravelNoteType> => {
  const { data } = await axiosInstance.get(`/note/board/${travelNoteId}`);
  return data;
};

// 사용자 여행 노트 조회 (멤버 상세 페이지)
export const fetchMemberPublicTravelNote = async (
  memberId: number,
  page: number,
  limit: number
): Promise<ITravelNoteProfileListType> => {
  const { data } = await axiosInstance.get(
    `/note/public/${memberId}/${page}/${limit}`
  );
  return data;
};

// 모든 여행 노트 개수 조회
export const fetchTotalTravelNoteCount = async (): Promise<{
  totalCount: number;
}> => {
  const { data } = await axiosInstance.get(`/note/all/count`);
  return data;
};
