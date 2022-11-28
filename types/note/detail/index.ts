export interface ITravelNoteDetailInfoType {
  title: string;
  period: string;
  region: string[];
  theme: string[];
  thumbnail: string;
}

export interface IDetailCommentsType {
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
