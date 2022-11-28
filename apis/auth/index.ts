import { axiosInstance } from "../../axiosInstance";
import {
  ILoginType,
  IRegisterType,
  IReissueTokenType,
  IUserType,
} from "../../types/member";

// 회원가입
export const register = async ({
  email,
  nickname,
  password,
  year,
  month,
  day,
  region,
  optional,
}: IRegisterType): Promise<void> => {
  const { data } = await axiosInstance.post(`/auth/new`, {
    email,
    nickname,
    password,
    year,
    month,
    day,
    region,
    optional,
  });
  return data;
};

// 로그인
export const login = async ({
  email,
  password,
}: ILoginType): Promise<IUserType> => {
  const { data } = await axiosInstance.post(`/auth/login`, {
    email,
    password,
  });
  return data;
};

// 토큰 재발급
export const reissueToken = async ({
  accessToken,
  refreshToken,
  grantType,
}: IReissueTokenType): Promise<IUserType> => {
  const { data } = await axiosInstance.post(`/auth/reissue`, {
    accessToken,
    refreshToken,
    grantType,
  });
  return data;
};

// 로그아웃
export const logout = async (): Promise<void> => {
  const { data } = await axiosInstance.post(`/auth/logout`);
  return data;
};
