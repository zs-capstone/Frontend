import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchMainRecommendPlaceList } from "../../../apis/recommend";
import { queryKeys } from "../../../react-query/constants";
import { IMainPlaceInfoDataType } from "../../../types/recommend";
import PlaceFrame from "../../molecules/main/PlaceFrame";

const RecommendPlaceList: React.FC = () => {
  const { data: recommendedPlaces } = useQuery<IMainPlaceInfoDataType[]>(
    queryKeys.recommendPlaceList,
    fetchMainRecommendPlaceList,
    { suspense: true }
  );

  return (
    <Container>
      <Title>추천 여행지</Title>
      <PlaceFrameWrapper>
        {recommendedPlaces?.map((place) => (
          <PlaceFrame
            key={place.placeId}
            hasLiked={place.hasLiked}
            likeCount={place.likeCount}
            placeId={place.placeId}
            title={place.title}
            imageUrl={place.imageUrl}
          />
        ))}
      </PlaceFrameWrapper>
    </Container>
  );
};

export default RecommendPlaceList;

const Container = styled.div`
  width: 100%;
  position: relative;

  ${({ theme }) =>
    theme.media.mobile({
      padding: "0 17px 24px",
      borderBottom: `8px solid ${theme.color.background}`,
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(24, theme.color.black, 700)};
  font-family: "PretendardBold";

  ${({ theme }) =>
    theme.media.tabletUnder({
      fontSize: "20px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "140px",
    })}
`;

const MoreCourse = styled.p`
  cursor: pointer;
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.grey60, 700)};
`;

const PlaceFrameWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${({ theme }) =>
    theme.media.tabletUnder({
      justifyContent: "flex-start",
      overflowX: "auto",
      gap: 10,
    })};

  ${({ theme }) =>
    theme.media.mobile({
      flexDirection: "column",
      alignItems: "center",
    })}
`;
