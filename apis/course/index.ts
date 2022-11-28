import { axiosInstance } from "../../axiosInstance";
import {
  IAccommodationListType,
  IAddRecommendPlaceType,
  ICourseDistanceType,
  IMakingNoteCoordinateType,
  IMakingNoteCourseDataType,
  ISaveProcessedCourseListType,
  ITravelNoteDetailCourseInfoType,
} from "../../types/course";

// 코스 정보 조회
export const fetchMakingNoteCourse = async (
  travelNoteId: number
): Promise<IMakingNoteCourseDataType[]> => {
  const { data } = await axiosInstance.get(`/course/${travelNoteId}`);
  return data.data;
};

// 경로 정보 조회
export const fetchCourseDistance = async (
  travelNoteId: number
): Promise<ICourseDistanceType[]> => {
  const { data } = await axiosInstance.get(`/course/route/${travelNoteId}`);
  return data.data;
};

// 코스 정보 조회 (일차)
export const fetchTravelNoteDetailCourseInfo = async (
  travelNoteId: number,
  day: number
): Promise<ITravelNoteDetailCourseInfoType> => {
  const { data } = await axiosInstance.get(`/course/${travelNoteId}/${day}`);
  return data.data;
};

// 경로 정보 조회 (일차)
export const fetchTravelNoteDetailCoordinateInfo = async (
  travelNoteId: number,
  day: number
): Promise<ICourseDistanceType> => {
  const { data } = await axiosInstance.get(
    `/course/route/${travelNoteId}/${day}`
  );
  return data.data;
};

// 좌표 정보 조회
export const fetchMakingNoteCoordinate = async (
  travelNoteId: number
): Promise<IMakingNoteCoordinateType[]> => {
  const { data } = await axiosInstance.get(
    `/course/coordinate/${travelNoteId}`
  );
  return data.data;
};

// 코스 저장
export const saveProcessedCourseList = async ({
  courseList,
  travelNoteId,
}: ISaveProcessedCourseListType): Promise<void> => {
  const { data } = await axiosInstance.put(`/course`, {
    travelNoteId,
    courseList,
  });
  return data;
};

// 여행지 추가
export const addRecommendPlace = async ({
  travelNoteId,
  day,
  placeIdList,
}: IAddRecommendPlaceType): Promise<void> => {
  const { data } = await axiosInstance.patch(`/course`, {
    travelNoteId,
    day,
    placeIdList,
  });
  return data;
};

// 동선 최적화
export const optimizeTravelNoteCourse = async (
  travelNoteId: number
): Promise<void> => {
  const { data } = await axiosInstance.post(`/course/optimize`, {
    travelNoteId,
  });
  return data;
};

// 근처 숙소 조회
export const fetchAccommodationList = async (
  travelNoteId: number,
  day: number,
  type: number,
  page: number,
  limit: number
): Promise<IAccommodationListType> => {
  const { data } = await axiosInstance.get(
    `/course/accommodation?travelNoteId=${travelNoteId}&day=${day}&type=${type}&page=${page}&limit=${limit}`
  );
  return data;
};
