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
  phone,
  region,
  name,
}: IRegisterType): Promise<void> => {
  const { data } = await axiosInstance.post(`/auth/signup`, {
    email,
    nickname,
    password,
    phone,
    name,
    region,
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
export const reissueToken = async (): Promise<IUserType> => {
  const { data } = await axiosInstance.post(`/auth/reissue`);
  return data;
};

// 로그아웃
export const logout = async (): Promise<void> => {
  const { data } = await axiosInstance.post(`/auth/logout`);
  return data;
};
