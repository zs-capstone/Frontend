export interface IFeedListType {
  next: number;
  data: IFeedListDataType[];
}
export interface IFeedListDataType {
  memberId: number;
  profileImage: string;
  boardId: number;
  nickname: string;
  text: string;
  thumbnail: string;
  singleImage: boolean;
  dateTime: string;
  hasLiked: boolean;
  likeCount: number;
  commentCount: number;
}

export interface IFeedModifyProfileType {
  pictures: string[];
  text: string;
  travelNoteTag: number;
  placeTag: number[];
}

export interface IMyFeedListType {
  next: number;
  data: IMyFeedListDataType[];
}

export interface IMyFeedListDataType {
  boardId: number;
  text: string;
  thumbnail: string;
  singleImage: boolean;
  dateTime: string;
  commentCount: number;
}
