import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { dehydrate, QueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchTotalTravelNoteCount, fetchWeeklyNotes } from "../apis/note";
import { fetchRecentlyMostVisitedPlaceList } from "../apis/place";
import {
  fetchMainRecommendNoteList,
  fetchMainRecommendPlaceList,
} from "../apis/recommend";
import { Spacer } from "../components/atoms/ui/Spacer/Spacer";
import ErrorBoundary from "../ErrorBoundary";
import { queryKeys } from "../react-query/constants";
import { IMainTravelNoteInfoDataType } from "../types/common";
import { IPopularPlacesDataType } from "../types/place";
import { IMainPlaceInfoDataType } from "../types/recommend";
import Custom404 from "./404";

const RecentlyMostVisitedPlace = dynamic(
  () => import("../components/organisms/main/RecentlyMostVisitedPlace"),
  { ssr: false }
);

const MakingNoteLink = dynamic(
  () => import("../components/molecules/main/MakingNoteLink"),
  { ssr: false }
);

const FeedLink = dynamic(
  () => import("../components/molecules/main/FeedLink"),
  { ssr: false }
);

const RecommendCourseList = dynamic(
  () => import("../components/organisms/main/RecommendCourseList"),
  { suspense: true }
);

const WeeklyCourseList = dynamic(
  () => import("../components/organisms/main/WeeklyCourseList"),
  { suspense: true }
);

const RecommendPlaceList = dynamic(
  () => import("../components/organisms/main/RecommendPlaceList"),
  { suspense: true }
);

const PhotodigmLink = dynamic(
  () => import("../components/molecules/main/PhotodigmLink"),
  { ssr: false }
);

const Home: NextPage = () => {
  return (
    <ErrorBoundary fallback={<Custom404 />}>
      <Container>
        <MenuWrapper>
          <PhotodigmLink />
          <Spacer size={20} axis={"horizontal"} />
          <MakingNoteLink />
        </MenuWrapper>
        <Spacer size={16} />
        <FeedWrapper>
          <FeedLink />
        </FeedWrapper>
        <ResponsiveSpacer size={47} />
        <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
          <RecommendCourseList />
        </Suspense>
        <ResponsiveSpacer size={47} />
        <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
          <RecommendPlaceList />
        </Suspense>
        <ResponsiveSpacer size={47} />
        <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
          <WeeklyCourseList />
        </Suspense>
        <ResponsiveSpacer size={47} />
        <RecentlyMostVisitedPlace />
      </Container>
    </ErrorBoundary>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<IMainTravelNoteInfoDataType[]>(
    queryKeys.recommendNoteList,
    fetchMainRecommendNoteList
  );

  await queryClient.prefetchQuery<IMainPlaceInfoDataType[]>(
    queryKeys.recommendPlaceList,
    fetchMainRecommendPlaceList
  );

  await queryClient.prefetchQuery<IMainTravelNoteInfoDataType[]>(
    queryKeys.weeklyNoteList,
    fetchWeeklyNotes
  );

  await queryClient.prefetchQuery<IPopularPlacesDataType[]>(
    queryKeys.recentlyMostVisitedPlaceList,
    fetchRecentlyMostVisitedPlaceList
  );

  await queryClient.prefetchQuery<{ totalCount: number }>(
    queryKeys.totalTravelNoteCount,
    fetchTotalTravelNoteCount
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Container = styled.div`
  max-width: 962px;
  margin: 47px auto 235px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      maxWidth: "674px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: "100%",
      margin: "16px 0px 48px",
    })}
`;

const MenuWrapper = styled.span`
  display: flex;
  flex-direction: row;

  ${({ theme }) =>
    theme.media.mobile({
      flexDirection: "column",
      width: "100%",
      gap: "8px",
      padding: "0 17px 0",
    })}
`;

const ResponsiveSpacer = styled(Spacer)`
  ${({ theme }) =>
    theme.media.mobile({
      height: "24px",
      minHeight: "24px",
    })}
`;

const FeedWrapper = styled.div`
  ${({ theme }) =>
    theme.media.mobile({
      padding: "0 17px 0",
      width: "100%",
    })}
`;
