import { axiosInstance } from "../../axiosInstance";
import {
  IDeletePhotodigmPictureType,
  IMyPhotodigmListType,
  IPhotodigmFrameType,
  IPhotodigmInfoType,
  IPhotodigmModifyFrameType,
  IPhotodigmModifyPictureType,
  IPhotodigmModifyTitleType,
  IPhotodigmPictureListType,
} from "../../types/photodigm";

// 새 포토다임 생성
export const createNewPhotodigm = async (): Promise<{
  photodigmId: number;
}> => {
  const { data } = await axiosInstance.post(`/photodigm/new`);
  return data;
};

// 포토다임 정보 조회
export const fetchPhotodigmInfo = async (
  photodigmId: number
): Promise<IPhotodigmInfoType> => {
  const { data } = await axiosInstance.get(`/photodigm/${photodigmId}`);
  return data;
};

// 내 포토다임 조회
export const fetchMyPhotodigmList = async (
  page: number,
  limit: number
): Promise<IMyPhotodigmListType> => {
  const { data } = await axiosInstance.get(`/photodigm/${page}/${limit}`);
  return data;
};

// 사진 정보 조회
export const fetchPhotodigmPictureList = async (
  photodigmId: number
): Promise<IPhotodigmPictureListType> => {
  const { data } = await axiosInstance.get(`/photodigm/picture/${photodigmId}`);
  return data;
};

// 사진 수정
export const modifyPhotodigmPicture = async (file: FormData): Promise<void> => {
  const { data } = await axiosInstance.put(`/photodigm/picture`, file);
  return data;
};

// 사진 삭제
export const deletePhotodigmPicture = async ({
  photodigmId,
  target,
}: IDeletePhotodigmPictureType): Promise<void> => {
  const { data } = await axiosInstance.delete(
    `/photodigm/picture/${photodigmId}/${target}`
  );
  return data;
};

// 프레임 조회
export const fetchPhotodigmFrame = async (): Promise<IPhotodigmFrameType[]> => {
  const { data } = await axiosInstance.get(`/photodigm/frame`);
  return data.data;
};

// 포토다임 프레임 수정
export const modifyPhotodigmFrame = async ({
  photodigmId,
  frameId,
}: IPhotodigmModifyFrameType): Promise<void> => {
  const { data } = await axiosInstance.put(`/photodigm/frame`, {
    photodigmId,
    frameId,
  });
  return data;
};

// 포토다임 제목 수정
export const modifyPhotodigmTitle = async ({
  photodigmId,
  title,
}: IPhotodigmModifyTitleType): Promise<void> => {
  const { data } = await axiosInstance.patch(`/photodigm/title`, {
    photodigmId,
    title,
  });
  return data;
};
