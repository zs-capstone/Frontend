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
  data: {
    accessToken: string;
    refreshToken: string;
    userResponse: {
      email: string;
      nickname: string;
      isSurvey: boolean;
    };
  };
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
