import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import { IRouteInfosType } from "../../../../types/common";
import RecommendRestaurant from "./RecommendRestaurant";

export const PlaceBetween: React.FC<{
  hasNext: boolean;
  courseDistance: IRouteInfosType[];
  index: number;
  placeId: number;
}> = (props) => {
  const { hasNext, courseDistance, index, placeId } = props;

  return (
    <Container hasNext={hasNext}>
      <RecommendRestaurant placeId={placeId} />
      {hasNext && (
        <>
          <Bar />
          <ImageContainer>
            <Image
              src={iconUrl("arrow_circle_down")}
              width={20}
              height={20}
              alt={"여행 일정 코스별 여행 장소간 거리 아이콘"}
            />
          </ImageContainer>
        </>
      )}
      {courseDistance[index]?.searchUrl && (
        <Link href={courseDistance[index].searchUrl}>
          <a target={"_blank"}>
            <Distance>
              <Text>{courseDistance[index].distance}</Text>
              <Wrapper>
                <DistanceImageContainer>
                  <Image
                    src={iconUrl("car")}
                    width={14}
                    height={14}
                    alt={"여행 일정 코스별 여행 장소간 거리 아이콘"}
                  />
                </DistanceImageContainer>
                <Text>{courseDistance[index].car}</Text>
              </Wrapper>
              <Wrapper>
                <DistanceImageContainer>
                  <Image
                    src={iconUrl("walk")}
                    width={14}
                    height={14}
                    alt={"여행 일정 코스별 여행 장소간 거리 아이콘"}
                  />
                </DistanceImageContainer>
                <Text>{courseDistance[index].walk}</Text>
              </Wrapper>
            </Distance>
          </a>
        </Link>
      )}
    </Container>
  );
};

export const PlaceBetweenSingle: React.FC<{
  courseDistance: IRouteInfosType;
}> = (props) => {
  const { courseDistance } = props;

  return (
    <DetailContainer>
      <DetailBar />
      <DetailImageContainer>
        <Image
          src={iconUrl("arrow_circle_down")}
          width={20}
          height={20}
          alt={"여행 일정 코스별 여행 장소간 거리 아이콘"}
        />
      </DetailImageContainer>
      <Link href={courseDistance.searchUrl}>
        <a target={"_blank"}>
          <DetailDistance>
            <DetailText>{courseDistance?.distance}</DetailText>
            <Wrapper>
              <DistanceImageContainer>
                <Image
                  src={iconUrl("car")}
                  width={14}
                  height={14}
                  alt={"여행 일정 코스별 여행 장소간 거리 아이콘"}
                />
              </DistanceImageContainer>
              <DetailText>{courseDistance?.car}</DetailText>
            </Wrapper>
            <Wrapper>
              <DistanceImageContainer>
                <Image
                  src={iconUrl("walk")}
                  width={14}
                  height={14}
                  alt={"여행 일정 코스별 여행 장소간 거리 아이콘"}
                />
              </DistanceImageContainer>
              <DetailText>{courseDistance?.walk}</DetailText>
            </Wrapper>
          </DetailDistance>
        </a>
      </Link>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  position: relative;
  height: 80px;
`;

const Container = styled.div<{ hasNext?: boolean }>`
  position: relative;
  height: ${(props) => (!props.hasNext ? "50px" : "120px")};
`;

const DetailBar = styled.div`
  position: absolute;
  left: 10px;
  width: 2px;
  height: 80px;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.color.border2};
`;

const Bar = styled.div`
  position: absolute;
  left: 32px;
  width: 2px;
  height: 120px;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.color.border2};
`;

const DetailImageContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 40px;
  transform: translate(-50%, -50%);
`;

const ImageContainer = styled.div`
  position: absolute;
  left: 32px;
  top: 80px;
  transform: translate(-50%, -50%);
`;

const DetailDistance = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: fit-content;
  height: 20px;
  border-radius: 56px;
  padding: 0px 10px;
  background-color: ${({ theme }) => theme.color.background};
  left: 28px;
  top: 40px;
  transform: translateY(-50%);
`;

const Distance = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: fit-content;
  height: 20px;
  border-radius: 56px;
  padding: 0px 10px;
  background-color: ${({ theme }) => theme.color.background};
  left: 50px;
  top: 80px;
  transform: translateY(-50%);
`;

const DetailText = styled.p`
  font-size: ${(props) =>
    props.theme.mixin.fontSize(11, props.theme.color.grey60)};
`;

const Text = styled.p`
  font-size: ${(props) =>
    props.theme.mixin.fontSize(12, props.theme.color.grey60)};
`;

const DistanceImageContainer = styled.div`
  margin: 0 4px;
  display: flex;
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
