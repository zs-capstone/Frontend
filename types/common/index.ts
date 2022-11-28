export interface IPlaceListType {
  next: number;
  data: IPlaceListDataType[];
}

export interface IPlaceListDataType {
  placeId: number;
  title: string;
  imageUrl: string;
  address?: string;
  hasNext?: boolean;
  likeCount?: number;
  hasLiked?: boolean;
}

export interface IMakingNotePlaceListDataType {
  placeId: number;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  index: number;
  child: boolean;
  animal: boolean;
  hasNext: boolean;
}

export interface IRouteInfosType {
  distance: string;
  car: string;
  walk: string;
  searchUrl: string;
}

export interface IMakingNoteCoordinateDataType {
  placeId: number;
  title: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
}

export interface IMainTravelNoteInfoDataType {
  hasLiked: boolean;
  imageUrl: string;
  likeCount: number;
  title: string;
  travelNoteId: number;
}

export interface IDetailLikeType {
  hasLiked: boolean;
  likeCount: number;
}

export interface ICommonContentType {
  id: number;
  content: string;
}

export interface ITravelNoteProfileListType {
  next: number;
  data: ITravelNoteProfileListDataType[];
}

export interface ITravelNoteProfileListDataType {
  travelNoteId: number;
  title: string;
  thumbnail: string;
  region: string[];
  period: string;
  hasLiked: boolean;
  likeCount: number;
  placeCount: number;
  commentCount: number;
}

export interface IDetailCommentAddType {
  id: number;
  text: string;
}

export interface ICommonMemberType {
  memberId: number;
  profileImage: string;
  nickname: string;
}
