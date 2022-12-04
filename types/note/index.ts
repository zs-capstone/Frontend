export interface ISubmitMakingNoteAdvanceType {
  title: string;
  dayStart: string;
  dayEnd: string;
  adult: string;
  child: string;
  animal: string;
  placeList: number[];
  publicShare: string;
  maxPlacePerDay: string;
}

export interface IMakingNoteProfileType {
  noteAuthority: string;
  title: string;
  dayStart: string;
  dayEnd: string;
  adult: number;
  child: number;
  animal: number;
  region: string[];
  theme: string[];
  publicShare: boolean;
}

export interface IChangeNoteTitleType {
  travelNoteId: number;
  newTitle: string;
}

export interface IChangeNotePersonnelType {
  travelNoteId: number;
  adult: number;
  child: number;
  animal: number;
}

export interface IChangeNotePublicShareType {
  travelNoteId: number;
  publicShare: boolean;
}

export interface ICompanionListType {
  memberId: number;
  profileImage: string;
  nickname: string;
  email: string;
}

export interface IDeleteCompanionType {
  travelNoteId: number;
  memberId: number;
}

export interface IMakingNoteCommentType {
  commentId: number;
  text: string;
  memberId: number;
  profileImageUrl: string;
  nickname: string;
  isModified: boolean;
  dateTime: string;
  mine: boolean;
}

export interface IAddCommentType {
  travelNoteId: number;
  day: number;
  text: string;
}

export interface IMyTravelNoteType {
  next: number;
  data: IMyTravelNoteDataType[];
}

export interface IMyTravelNoteDataType {
  travelNoteId: number;
  title: string;
  dayStart: string;
  dayEnd: string;
  period: string;
  adult: number;
  child: number;
  animal: number;
  thumbnail: string;
}

export interface IMyFeedTravelNoteType {
  next: number;
  data: IMyFeedTravelNoteDataType[];
}

export interface IMyFeedTravelNoteDataType {
  travelNoteId: number;
  title: string;
  dayStart: string;
  dayEnd: string;
  thumbnail: string;
  publicShare: boolean;
  placeCount: number;
}

export interface ISelectedFeedTravelNoteType {
  travelNoteId: number;
  title: string;
  dayStart: string;
  dayEnd: string;
  thumbnail: string;
  placeCount: number;
}
