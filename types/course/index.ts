import {
  IMakingNoteCoordinateDataType,
  IMakingNotePlaceListDataType,
  IRouteInfosType,
} from "../common";

export interface IMakingNoteCourseDataType {
  day: number;
  places: IMakingNotePlaceListDataType[];
}

export interface ICourseDistanceType {
  day: number;
  routeInfos: IRouteInfosType[];
}

export interface ITravelNoteDetailCourseInfoType {
  day: number;
  places: {
    index: number;
    placeId: number;
    title: string;
    address: string;
    hasNext: boolean;
    routeInfo: IRouteInfosType;
  }[];
  hasNext: boolean;
  hasPrev: boolean;
  totalDay: number;
}

export interface IMakingNoteCoordinateType {
  day: number;
  markerColor: string;
  places: IMakingNoteCoordinateDataType[];
}

export interface ISaveProcessedCourseListType {
  courseList: number[][];
  travelNoteId: number;
}

export interface IAddRecommendPlaceType {
  travelNoteId: number;
  day: number;
  placeIdList: number[];
}

export interface ICommonChangeLikeStateType {
  id: number;
  like: boolean;
}

export interface IAccommodationListType {
  hasPrev: boolean;
  hasNext: boolean;
  totalDay: number;
  accommodations: IAccommodationListDataType;
}

export interface IAccommodationListDataType {
  next: number;
  data: IAccommodationDataType[];
}

export interface IAccommodationDataType {
  accommodationId: number;
  title: string;
  address: string;
  type: string;
  imageUrl: string;
  tag: string[];
}
