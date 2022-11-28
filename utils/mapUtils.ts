export const calculateMapLatitude = (latitude: number) => {
  return ((latitude - 33.2) * 415.73) / 0.36 + 44.59;
};

export const calculateMapLongitude = (longitude: number) => {
  return ((longitude - 126.16) * 743.06) / 0.8 + 109.61;
};
