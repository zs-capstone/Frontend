export const baseUrl = "http://jejuwhere.xyz/api";
export const baseImageUrl = `${baseUrl}/images`;
export const iconUrl = (url: string) => {
  return `https://capstone4-s3.s3.ap-northeast-2.amazonaws.com/images/${url}.svg`;
};

export const markerImage = (day: number) => {
  return `https://yeoreodigm-s3.s3.ap-northeast-2.amazonaws.com/assets/mapMarker/markerDay${day}.svg`;
};

export const loaderDestUrl =
  "https://capstone4-s3.s3.ap-northeast-2.amazonaws.com/loader_dest.gif";

export const loaderAirplaneUrl =
  "https://capstone4-s3.s3.ap-northeast-2.amazonaws.com/loader_airplane.gif";
