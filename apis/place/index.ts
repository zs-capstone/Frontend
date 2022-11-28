import { axiosInstance } from "../../axiosInstance";
import { IDetailLikeType, IPlaceListType } from "../../types/common";
import { ICommonChangeLikeStateType } from "../../types/course";
import {
  IPlaceProfileType,
  IPopularPlacesDataType,
  IRestaurantListType,
} from "../../types/place";

// 좋아요 누른 여행지 조회
export const fetchPlaceLikedList = async (
  page: number,
  limit: number,
  option?: number | null
): Promise<IPlaceListType> => {
  if (option) {
    const { data } = await axiosInstance.get(
      `/place/like/list?page=${page}&limit=${limit}&option=${option}`
    );
    return data;
  } else {
    const { data } = await axiosInstance.get(
      `/place/like/list?page=${page}&limit=${limit}`
    );
    return data;
  }
};

// 좋아요 누른 여행지 조회 (멤버 상세 페이지)
export const fetchMemberPlaceLikedList = async (
  memberId: number,
  page: number,
  limit: number
): Promise<IPlaceListType> => {
  const { data } = await axiosInstance.get(
    `/place/like/list/${memberId}/${page}/${limit}`
  );
  return data;
};

// 좋아요 정보 조회
export const fetchPlaceDetailLike = async (
  placeId: number
): Promise<IDetailLikeType> => {
  const { data } = await axiosInstance.get(`/place/like/${placeId}`);
  return data;
};

// 좋아요 변경
export const changePlaceDetailLikeState = async ({
  id,
  like,
}: ICommonChangeLikeStateType): Promise<void> => {
  const { data } = await axiosInstance.patch(`/place/like`, {
    id,
    like,
  });
  return data;
};

// 최근 많이 방문한 여행지 조회
export const fetchRecentlyMostVisitedPlaceList = async (): Promise<
  IPopularPlacesDataType[]
> => {
  const { data } = await axiosInstance.get(`/place/popular`);
  return data.data;
};

// 근처 음식점 조회
export const fetchRestaurantList = async (
  placeId: number,
  type: number,
  page: number,
  limit: number
): Promise<IRestaurantListType> => {
  const { data } = await axiosInstance.get(
    `/place/restaurant?placeId=${placeId}&type=${type}&page=${page}&limit=${limit}`
  );
  return data;
};

// 여행지 조회
export const fetchPlaceProfile = async (
  placeId: number
): Promise<IPlaceProfileType> => {
  const { data } = await axiosInstance.get(`/place/${placeId}`);
  return data;
};
