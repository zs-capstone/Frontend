export interface IPlaceDetailInfoType {
  title: string;
  tag: string;
  introduction: string;
  address: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  child: boolean;
  animal: boolean;
}

export interface IPlaceDetailAdditionalInfoType {
  operatingHours: string;
  fee: string;
  estimatedTime: string;
}
