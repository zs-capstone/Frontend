import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Head from "next/head";
import Script from "next/script";
import styled from "styled-components";
import { markerImage } from "../../../../axiosInstance/constants";
import { IMakingNoteCoordinateDataType } from "../../../../types/common";
const NEXT_PUBLIC_KAKAO_JS_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_APP_KEY;

export const KakaoCourseDayMap: React.FC<{
  coordinateData: IMakingNoteCoordinateDataType[][];
  markerColor: string[];
  width: string;
  height: string;
  courseDay: number;
  setCourseDay: Dispatch<SetStateAction<number>>;
  setSelectDay: Dispatch<SetStateAction<number>>;
  rWidth: string;
  rHeight: string;
}> = (props) => {
  const {
    coordinateData,
    markerColor,
    width,
    height,
    courseDay,
    setCourseDay,
    setSelectDay,
    rWidth,
    rHeight,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSetCourseDay = useCallback(
    (marker: any, index: number) => {
      kakao.maps.event.addListener(marker, "click", () => {
        if (setCourseDay) {
          setCourseDay(index);
          setSelectDay(index);
        }
      });
    },
    [setCourseDay, setSelectDay]
  );

  const initMap = useCallback(() => {
    if (containerRef.current) {
      const map = new kakao.maps.Map(containerRef.current, {
        center: new kakao.maps.LatLng(
          coordinateData.length > 0
            ? coordinateData[courseDay - 1][0].latitude
            : 33.450701,
          coordinateData.length > 0
            ? coordinateData[courseDay - 1][0].longitude
            : 126.570667
        ),
        level: 10,
      });

      for (let i = 0; i < coordinateData.length; i++) {
        const linePath = [];
        const imageSrc = markerImage(i + 1);

        for (let j = 0; j < coordinateData[i].length; j++) {
          const marker = new kakao.maps.Marker({
            image: new kakao.maps.MarkerImage(
              imageSrc,
              new kakao.maps.Size(35, 40)
            ),
            position: new kakao.maps.LatLng(
              coordinateData[i][j].latitude,
              coordinateData[i][j].longitude
            ),
            clickable: true,
          });

          handleSetCourseDay(marker, i + 1);

          linePath.push(
            new kakao.maps.LatLng(
              coordinateData[i][j].latitude,
              coordinateData[i][j].longitude
            )
          );
          var polyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 4,
            strokeColor: markerColor ? markerColor[i] : "#FFAE00",
            strokeOpacity: 0.7,
            strokeStyle: "solid",
          });
          polyline.setMap(map);
          marker.setMap(map);
        }
      }
    }
  }, [coordinateData, markerColor, handleSetCourseDay, courseDay]);

  useEffect(() => {
    if (window.kakao) {
      kakao.maps.load(() => {
        initMap();
      });
    }
  }, [initMap]);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_JS_APP_KEY}&autoload=false`}
        onLoad={() => kakao.maps.load(initMap)}
      />
      <Head>
        <link rel="preconnect" href="https://dapi.kakao.com" />
        <link rel="dns-prefetch" href="https://dapi.kakao.com" />
      </Head>
      <Map
        ref={containerRef}
        width={width}
        height={height}
        rWidth={rWidth}
        rHeight={rHeight}
      />
    </>
  );
};

export const KakaoMap: React.FC<{
  coordinateData: IMakingNoteCoordinateDataType[][];
  markerColor: string[];
  width: string;
  height: string;
  rWidth?: string;
  rHeight?: string;
}> = (props) => {
  const { coordinateData, markerColor, width, height, rWidth, rHeight } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const initMap = useCallback(() => {
    if (containerRef.current) {
      const map = new kakao.maps.Map(containerRef.current, {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 10,
      });

      for (let i = 0; i < coordinateData.length; i++) {
        const linePath = [];
        const imageSrc = markerImage(i + 1);

        for (let j = 0; j < coordinateData[i].length; j++) {
          const marker = new kakao.maps.Marker({
            image: new kakao.maps.MarkerImage(
              imageSrc,
              new kakao.maps.Size(35, 40)
            ),
            position: new kakao.maps.LatLng(
              coordinateData[i][j].latitude,
              coordinateData[i][j].longitude
            ),
            clickable: true,
          });

          linePath.push(
            new kakao.maps.LatLng(
              coordinateData[i][j].latitude,
              coordinateData[i][j].longitude
            )
          );
          var polyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 4,
            strokeColor: markerColor ? markerColor[i] : "#FFAE00",
            strokeOpacity: 0.7,
            strokeStyle: "solid",
          });
          polyline.setMap(map);
          marker.setMap(map);
        }
      }
    }
  }, [coordinateData, markerColor]);

  useEffect(() => {
    if (window.kakao) {
      kakao.maps.load(() => {
        initMap();
      });
    }
  }, [initMap]);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_JS_APP_KEY}&autoload=false`}
        onLoad={() => kakao.maps.load(initMap)}
      />
      <Head>
        <link rel="preconnect" href="https://dapi.kakao.com" />
        <link rel="dns-prefetch" href="https://dapi.kakao.com" />
      </Head>
      <Map
        ref={containerRef}
        width={width}
        height={height}
        rWidth={rWidth}
        rHeight={rHeight}
      />
    </>
  );
};

export const DetailPlaceKakaoMap: React.FC<
  Partial<{
    latitude: number;
    longitude: number;
    width: string;
    height: string;
    rHeight: string;
    rWidth: string;
  }>
> = (props) => {
  const { latitude, longitude, width, height, rHeight, rWidth } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const imageSrc =
    "https://yeoreodigm-s3.s3.ap-northeast-2.amazonaws.com/assets/mapMarker/placeMarker.svg";

  const initMap = useCallback(() => {
    if (containerRef.current) {
      const map = new kakao.maps.Map(containerRef.current, {
        center: new kakao.maps.LatLng(
          latitude || 33.450701,
          longitude || 126.570667
        ),
        level: 9,
      });

      const marker = new kakao.maps.Marker({
        image: new kakao.maps.MarkerImage(
          imageSrc,
          new kakao.maps.Size(40, 56)
        ),
        position: new kakao.maps.LatLng(latitude || 0, longitude || 0),
      });
      marker.setMap(map);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (window?.kakao) {
      initMap();
    }
  }, [initMap]);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_JS_APP_KEY}&autoload=false`}
        onLoad={() => kakao.maps.load(initMap)}
      />
      <Head>
        <link rel="preconnect" href="https://dapi.kakao.com" />
        <link rel="dns-prefetch" href="https://dapi.kakao.com" />
      </Head>
      <Map
        ref={containerRef}
        width={width}
        height={height}
        rHeight={rHeight}
        rWidth={rWidth}
        mobile={true}
      />
    </>
  );
};

const Map = styled.div<
  Partial<{
    width: string;
    height: string;
    rWidth: string;
    rHeight: string;
    mobile: boolean;
  }>
>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) =>
    props.theme.media.tabletUnder({
      width: props.rWidth,
      height: props.rHeight,
    })};

  ${(props) =>
    props.theme.media.mobile({
      width: props.mobile && "100%",
    })};
`;
