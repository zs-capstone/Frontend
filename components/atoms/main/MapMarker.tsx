import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

const MapMarker: React.FC<{
  imageUrl: string;
  bottom: number;
  left: number;
  placeId: number;
  mapWidth: number;
  mapHeight: number;
}> = (props) => {
  const { imageUrl, bottom, left, placeId, mapWidth, mapHeight } = props;

  return (
    <Link href={`/travel/place/detail/${placeId}`}>
      <a>
        <Container
          bottom={bottom}
          left={left}
          mapWidth={mapWidth}
          mapHeight={mapHeight}
        >
          <ImageContainer>
            <Image
              src={imageUrl}
              width={70}
              height={70}
              alt={
                "메인 페이지 최근 많이 방문한 여행지 마커에 있는 여행지 이미지"
              }
            />
          </ImageContainer>
        </Container>
      </a>
    </Link>
  );
};

export default MapMarker;

const Container = styled.div<{
  bottom: number;
  left: number;
  mapWidth: number;
  mapHeight: number;
}>`
  ${({ theme }) => theme.mixin.flexCenter()};
  position: absolute;
  bottom: ${(props) => props.bottom}px;
  left: ${(props) => props.left}px;
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.color.main50};
  border-radius: 100%;
  transform: translateY(50%);

  &:hover {
    transform: translateY(25%);
    transition: transform 0.3s ease-in-out;
  }

  ${(props) =>
    props.theme.media.tabletUnder({
      left: `${props.left / 1.43}px`,
      bottom: `${props.bottom / 1.43}px`,
    })}

  ${(props) =>
    props.theme.media.mobile({
      left: `${props.left / (962 / props.mapWidth)}px`,
      bottom: `${props.bottom / (506 / props.mapHeight)}px`,
      height: "40px",
      width: "40px",
    })}
`;

const ImageContainer = styled.div`
  width: 70px;
  height: 70px;
  overflow: hidden;
  border-radius: 100%;

  ${({ theme }) =>
    theme.media.mobile({
      height: "34px",
      width: "34px",
    })}
`;
