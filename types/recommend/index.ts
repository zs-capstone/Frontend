export interface ITravelNoteRecommendPlaceType {
  placeId: number;
  title: string;
  address: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
}

export interface IMainPlaceInfoDataType {
  hasLiked: boolean;
  imageUrl: string;
  likeCount: number;
  title: string;
  placeId: number;
}

export interface ITravelNoteDetailRecommendedTravelNotesType {
  travelNoteId: number;
  title: string;
  imageUrl: string;
  theme: string[];
}
