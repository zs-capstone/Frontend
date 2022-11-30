import { axiosInstance } from "../../axiosInstance";
import { ICommonMemberType } from "../../types/common";
import { IFollowType, IProfileType } from "../../types/member";

// 이메일 중복 확인
export const checkDupEmail = async (email: string): Promise<void> => {
  const { data } = await axiosInstance.post(`/auth/email`, { email });
  return data;
};

// 닉네임 중복 확인
export const checkDupNickname = async (nickname: string): Promise<void> => {
  const { data } = await axiosInstance.post(`/auth/nickname`, {
    nickname,
  });
  return data;
};

// 닉네임 변경
export const changeNickname = async (nickname: string): Promise<void> => {
  const { data } = await axiosInstance.patch("/member/nickname", { nickname });
  return data;
};

// 이메일 인증 코드 요청
export const callEmailConfirmCode = async (email: string): Promise<void> => {
  const { data } = await axiosInstance.post(`/member/auth`, {
    email,
  });
  return data;
};

// 이메일 인증 코드 확인
export const submitEmailConfirmCode = async (code: string): Promise<void> => {
  const { data } = await axiosInstance.patch(`/member/auth`, {
    code,
  });
  return data;
};

// 비밀번호 확인
export const checkOriginPassword = async (password: string): Promise<void> => {
  const { data } = await axiosInstance.post("/member/password", { password });
  return data;
};

// 비밀번호 초기화
export const findPassword = async (email: string): Promise<void> => {
  const { data } = await axiosInstance.put(`/member/password`, {
    email,
  });
  return data;
};

// 비밀번호 변경
export const changePassword = async (password: string): Promise<void> => {
  const { data } = await axiosInstance.patch("/member/password", { password });
  return data;
};

// 프로필 정보 조회
export const fetchProfile = async (): Promise<IProfileType> => {
  const { data } = await axiosInstance.get("/member/profile");
  return data;
};

// 프로필 정보 조회 (멤버 상세 페이지)
export const fetchMemberProfile = async (
  memberId: number
): Promise<IProfileType> => {
  const { data } = await axiosInstance.get(`/member/profile/${memberId}`);
  return data;
};

// 자기 소개 수정
export const modifyProfileBio = async (introduction: string): Promise<void> => {
  const { data } = await axiosInstance.patch("/member/profile/introduction", {
    introduction,
  });
  return data;
};

// 프로필 사진 수정
export const modifyProfileImage = async (file: FormData): Promise<void> => {
  const { data } = await axiosInstance.patch("/member/profile/image", file);
  return data;
};

// 프로필 사진 삭제
export const deleteProfileImage = async (): Promise<void> => {
  const { data } = await axiosInstance.delete("/member/profile/image");
  return data;
};

// 회원 탈퇴
export const membershipWithdrawal = async (): Promise<void> => {
  const { data } = await axiosInstance.delete("/member");
  return data;
};

// 팔로워 수 조회
export const fetchMyFollowerCount = async (): Promise<{ count: number }> => {
  const { data } = await axiosInstance.get(`/member/follower/my/count`);
  return data.count;
};

// 팔로워 조회
export const fetchMyFollowerList = async (): Promise<ICommonMemberType[]> => {
  const { data } = await axiosInstance.get(`/member/follower/my`);
  return data.data;
};

// 팔로잉 수 조회
export const fetchMyFolloweeCount = async (): Promise<{ count: number }> => {
  const { data } = await axiosInstance.get(`/member/followee/my/count`);
  return data.count;
};

// 팔로잉 조회
export const fetchMyFolloweeList = async (): Promise<ICommonMemberType[]> => {
  const { data } = await axiosInstance.get(`/member/followee/my`);
  return data.data;
};

// 팔로우 여부 조회
export const fetchFollowState = async (
  memberId: number
): Promise<{ follow: boolean }> => {
  const { data } = await axiosInstance.get(`/member/follow/${memberId}`);
  return data.follow;
};

// 팔로우 변경
export const changeFollowState = async ({
  memberId,
  follow,
}: IFollowType): Promise<void> => {
  const { data } = await axiosInstance.patch(`/member/follow`, {
    memberId,
    follow,
  });
  return data;
};
