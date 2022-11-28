import { IRouteInfosType } from "../common";

export interface IPopularPlacesDataType {
  placeId: number;
  title: string;
  imageUrl: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface IRestaurantListType {
  next: number;
  data: IRestaurantListDataType[];
}

export interface IRestaurantListDataType {
  restaurantId: number;
  title: string;
  address: string;
  type: string;
  imageUrl: string;
  tag: string[];
  routeInfo: IRouteInfosType;
}

export interface IPlaceProfileType {
  placeId: number;
  title: string;
  address: string;
  imageUrl: string;
  tag: string;
  introduction: string;
  latitude: number;
  longitude: number;
  child: boolean;
  animal: boolean;
}
