export interface IFeedDetailProfileType {
  boardId: number;
  mine: boolean;
  memberId: number;
  profileImage: string;
  nickname: string;
  dateTime: string;
  text: string;
  imageList: string[];
  imageCount: number;
  travelNoteTag: number;
  placeTag: number[];
}

export interface IFeedCommentType {
  commentId: number;
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  text: string;
  hasModified: boolean;
  dateTime: string;
  hasLiked: boolean;
  likeCount: number;
  mine: boolean;
}
