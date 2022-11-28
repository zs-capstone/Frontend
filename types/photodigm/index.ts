export interface IPhotodigmInfoType {
  photodigmId: number;
  title: string;
  frameId: number;
  frameWidth: number;
  frameHeight: number;
  imageUrl: string;
  hasModified: boolean;
  dateTime: string;
}

export interface IMyPhotodigmListType {
  next: number;
  data: IMyPhotodigmListDataType[];
}

export interface IMyPhotodigmListDataType {
  photodigmId: number;
  title: string;
  imageUrl: string;
  hasModified: boolean;
  dateTime: string;
}

export interface IPhotodigmPictureListType {
  photodigmId: number;
  photodigmUrl: string;
  pictureIds: number[];
  pictureUrls: string[];
}

export interface IPhotodigmFrameType {
  frameId: number;
  title: string;
  imageUrl: string;
}

export interface IPhotodigmModifyTitleType {
  photodigmId: number;
  title: string;
}

export interface IDeletePhotodigmPictureType {
  photodigmId: number;
  target: number;
}

export interface IPhotodigmModifyFrameType {
  photodigmId: number;
  frameId: number;
}

export interface IPhotodigmModifyPictureType {
  photodigmId: number;
  picture1?: FormData;
  picture2?: FormData;
  picture3?: FormData;
  picture4?: FormData;
}
