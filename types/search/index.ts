import { ICommonMemberType } from "../common";

export interface IRelatedSearchListType {
  places: ISearchPlacesType[];
  travelNotes: ISearchTravelNoteType[];
  members: ICommonMemberType[];
}

export interface ISearchPlacesType {
  placeId: number;
  title: string;
}

export interface ISearchTravelNoteType {
  travelNoteId: number;
  title: string;
}

export interface IIntegratedPlaceSearchListType {
  next: number;
  data: IIntegratedPlaceSearchListDataType[];
}

export interface IIntegratedPlaceSearchListDataType {
  placeId: number;
  title: string;
  imageUrl: string;
  address: string;
  hasLiked: boolean;
  likeCount: number;
}

export interface IIntegratedMemberSearchListType {
  next: number;
  data: ICommonMemberType[];
}
