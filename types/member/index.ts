// 회원가입 타입
export interface IRegisterType {
  email: string;
  nickname: string;
  password: string;
  name: string;
  phone: string;
  region: string;
}

// 로그인 타입
export interface ILoginType {
  email: string;
  password: string;
}

export interface IUserType {
  accessToken: string;
  refreshToken: string;
  grantType: string;
  memberId: number;
  email: string;
  nickname: string;
  authority: string;
  surveyIndex?: number;
}

export interface IProfileType {
  nickname: string;
  profileImage: string;
  introduction: string;
  defaultProfileImage: boolean;
}

export interface IFollowType {
  memberId: number;
  follow: boolean;
}

export interface IReissueTokenType {
  accessToken: string;
  refreshToken: string;
  grantType: string;
}
