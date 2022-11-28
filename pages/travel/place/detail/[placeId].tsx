import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { dehydrate, useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchPlaceDetailLike } from "../../../../apis/place";
import { fetchPlaceDetailInfo } from "../../../../apis/place/detail";
import { axiosInstance } from "../../../../axiosInstance";
import { Spacer } from "../../../../components/atoms/ui/Spacer/Spacer";
import ErrorBoundary from "../../../../ErrorBoundary";
import { useChangePlaceDetailLikeState } from "../../../../hooks/travel/place/useChangePlaceDetailLikeState";
import { queryKeys } from "../../../../react-query/constants";
import queryClient from "../../../../react-query/queryClient";
import { IDetailLikeType } from "../../../../types/common";
import { IPlaceDetailInfoType } from "../../../../types/place/detail";
import Custom404 from "../../../404";

const PlaceDetailProfile = dynamic(
  () =>
    import(
      "../../../../components/organisms/travel/place/detail/PlaceDetailProfile"
    ),
  { ssr: false }
);

const PlaceDetailAddress = dynamic(
  () =>
    import(
      "../../../../components/organisms/travel/place/detail/PlaceDetailAddress"
    ),
  { ssr: false }
);

const PlaceDetailLike = dynamic(
  () =>
    import(
      "../../../../components/organisms/travel/place/detail/PlaceDetailLike"
    ),
  { ssr: false }
);

const PlaceDetailComment = dynamic(
  () =>
    import(
      "../../../../components/organisms/travel/place/detail/PlaceDetailComment"
    ),
  { ssr: false }
);

const PlaceDetailAdditionalProfile = dynamic(
  () =>
    import(
      "../../../../components/organisms/travel/place/detail/PlaceDetailAdditionalProfile"
    ),
  { ssr: false }
);

const PlaceDetail: React.FC<{ placeId: string }> = ({ placeId }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ko");

  const { data: detailInfo } = useQuery<IPlaceDetailInfoType>(
    [queryKeys.placeDetailInfo, +placeId, selectedLanguage],
    () => fetchPlaceDetailInfo(+placeId, selectedLanguage)
  );

  const { data: likeInfo } = useQuery<IDetailLikeType>(
    [queryKeys.placeDetailLike, +placeId],
    () => fetchPlaceDetailLike(+placeId)
  );

  const { mutate: changePlaceDetailLikeState, isLoading } =
    useChangePlaceDetailLikeState(+placeId);

  const handleChangePlaceDetailLike = () => {
    changePlaceDetailLikeState({ id: +placeId, like: !likeInfo?.hasLiked });
  };

  return (
    <ErrorBoundary fallback={<Custom404 />}>
      <Container>
        <FirstSection>
          <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
            <PlaceDetailProfile
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              imageUrl={detailInfo?.imageUrl}
              tag={detailInfo?.tag}
              title={detailInfo?.title}
            />
          </Suspense>
          <PlaceDetailAdditionalProfile
            placeId={+placeId}
            selectedLanguage={selectedLanguage}
            animal={detailInfo?.animal}
            child={detailInfo?.child}
          />
          <IntroductionWrapper>
            <Introduction>{detailInfo?.introduction}</Introduction>
          </IntroductionWrapper>
        </FirstSection>
        <Spacer size={23} />
        <PlaceDetailAddress
          selectedLanguage={selectedLanguage}
          address={detailInfo?.address}
          latitude={detailInfo?.latitude}
          longitude={detailInfo?.longitude}
        />
        <LikeWrapper>
          {isLoading ? (
            <ClipLoader color={"#FA8125"} />
          ) : (
            <PlaceDetailLike
              selectedLanguage={selectedLanguage}
              handleLikeChange={handleChangePlaceDetailLike}
              hasLiked={likeInfo?.hasLiked || false}
              likeCount={likeInfo?.likeCount || 0}
            />
          )}
        </LikeWrapper>
        <Spacer size={40} />
        <PlaceDetailComment
          selectedLanguage={selectedLanguage}
          placeId={+placeId}
        />
      </Container>
    </ErrorBoundary>
  );
};

export default PlaceDetail;

export const getStaticProps: GetStaticProps = async (context) => {
  const query = context.params!;
  const placeId = query.placeId!;

  await queryClient.prefetchQuery<IPlaceDetailInfoType>(
    [queryKeys.placeDetailInfo, +placeId, "ko"],
    () => fetchPlaceDetailInfo(+placeId, "ko")
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      placeId,
    },
  };
};

export const getStaticPaths = async () => {
  const { data } = await axiosInstance.get("/place/all");

  const placeIds = data.data.map(
    (element: { placeId: string }) => element.placeId
  );

  const paths = placeIds.map((id: string) => ({
    params: { placeId: id },
  }));

  return { paths, fallback: false };
};

const Container = styled.div`
  max-width: 964px;
  margin: 40px auto 57px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      maxWidth: "674px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "100%",
      margin: "0 auto",
    })}
`;

const IntroductionWrapper = styled.div`
  margin-top: 40px;
  max-width: 964px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      maxWidth: "674px",
    })}
`;

const Introduction = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.black)};
  line-height: 28px;

  ${({ theme }) =>
    theme.media.mobile({
      padding: "0 16px",
    })}
`;

const FirstSection = styled.div`
  border-bottom: 4px solid ${({ theme }) => theme.color.background};
  padding-bottom: 32px;
`;

const LikeWrapper = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 56px;
`;
