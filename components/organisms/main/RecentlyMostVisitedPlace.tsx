import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IPopularPlacesDataType } from "../../../types/place";
import {
  calculateMapLatitude,
  calculateMapLongitude,
} from "../../../utils/mapUtils";
import MapMarker from "../../atoms/main/MapMarker";
import { debounce } from "lodash";
import { iconUrl } from "../../../axiosInstance/constants";
import { useQuery } from "react-query";
import { queryKeys } from "../../../react-query/constants";
import { fetchRecentlyMostVisitedPlaceList } from "../../../apis/place";

const RecentlyMostVisitedPlace: React.FC = () => {
  const { data: coordinateData } = useQuery<IPopularPlacesDataType[]>(
    queryKeys.recentlyMostVisitedPlaceList,
    fetchRecentlyMostVisitedPlaceList
  );

  const [mapWidth, setMapWidth] = useState<number>(1);
  const [mapHeight, setMapHeight] = useState<number>(1);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 500);

  useEffect(() => {
    if (mapContainerRef.current) {
      setMapWidth(mapContainerRef.current.getBoundingClientRect().width);
      setMapHeight(mapContainerRef.current.offsetHeight);
    }
  }, [windowSize]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <Container>
      <Title>최근 많이 방문한 여행지</Title>
      <ImageContainer ref={mapContainerRef}>
        <Image
          src={iconUrl("main_map")}
          alt={"메인페이지 최근 많이 방문한 여행지를 표시헤주는 지도"}
        />
        {coordinateData?.map((data) => (
          <MapMarker
            key={data.placeId}
            imageUrl={data.imageUrl}
            placeId={data.placeId}
            bottom={calculateMapLatitude(data.latitude)}
            left={calculateMapLongitude(data.longitude)}
            mapWidth={mapWidth}
            mapHeight={mapHeight}
          />
        ))}
      </ImageContainer>
    </Container>
  );
};

export default RecentlyMostVisitedPlace;

const Container = styled.div`
  width: 100%;

  ${({ theme }) =>
    theme.media.mobile({
      padding: "0 17px",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(24, theme.color.black, 700)};
  font-family: "PretendardBold";
  margin-bottom: 32px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      fontSize: "20px",
    })}
`;

const ImageContainer = styled.div`
  position: relative;
  width: 962px;
  aspect-ratio: 962 / 506;
  border-radius: 10px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "674px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;
