import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  fetchMakingNoteCoordinate,
  fetchMakingNoteCourse,
} from "../../../apis/course";
import { fetchMakingNoteProfile } from "../../../apis/note";
import { fetchNoteRecommendPlaceList } from "../../../apis/recommend";
import { loaderAirplaneUrl } from "../../../axiosInstance/constants";
import { KakaoMap } from "../../../components/atoms/travel/making-note/KakaoMap";
import { Spacer } from "../../../components/atoms/ui/Spacer/Spacer";
import MakingNoteCourse from "../../../components/organisms/travel/making-note/MakingNoteCourse";
import RecommendAccommodation from "../../../components/organisms/travel/making-note/RecommendAccommodation";
import TravelProfile from "../../../components/organisms/travel/making-note/TravelProfile";
import { queryKeys } from "../../../react-query/constants";
import {
  IMakingNoteCoordinateType,
  IMakingNoteCourseDataType,
} from "../../../types/course";
import { IMakingNoteProfileType } from "../../../types/note";
import { ITravelNoteRecommendPlaceType } from "../../../types/recommend";

const MakingNoteFlight = dynamic(
  () =>
    import("../../../components/organisms/travel/making-note/MakingNoteFlight"),
  { ssr: false }
);

const MakingNote: NextPage<{ makingNoteId: string }> = ({ makingNoteId }) => {
  const { data: profileData } = useQuery<IMakingNoteProfileType>(
    [queryKeys.makingNoteProfile, +makingNoteId],
    ({ signal }) => fetchMakingNoteProfile(+makingNoteId, signal)
  );

  const { data: coordinateData } = useQuery<IMakingNoteCoordinateType[]>(
    [queryKeys.makingNoteCoordinate, +makingNoteId],
    () => fetchMakingNoteCoordinate(+makingNoteId)
  );

  const { data: courseData } = useQuery<IMakingNoteCourseDataType[]>(
    [queryKeys.makingNoteCourse, +makingNoteId],
    () => fetchMakingNoteCourse(+makingNoteId)
  );

  const { data: placesRecommended } = useQuery<ITravelNoteRecommendPlaceType[]>(
    [queryKeys.makingNotePlacesRecommended, +makingNoteId],
    () => fetchNoteRecommendPlaceList(+makingNoteId)
  );

  const [accommodationMobileOpen, setAccommodationMobileOpen] =
    useState<boolean>(false);

  if (!profileData || !coordinateData || !courseData || !placesRecommended) {
    return (
      <MakingContainer>
        <Image
          src={loaderAirplaneUrl}
          alt={"AI 여행 계획 작성임을 알리는 gif"}
          width={120}
          height={120}
        />
        <MakingText>여행 노트를 불러오고 있어요.</MakingText>
      </MakingContainer>
    );
  }

  const {
    adult,
    animal,
    child,
    dayEnd,
    dayStart,
    noteAuthority,
    publicShare,
    region,
    theme,
    title,
  } = profileData;

  return (
    <Container>
      <LeftMenuWrapper>
        <TravelProfile
          makingNoteId={+makingNoteId}
          duration={courseData.length}
          title={title}
          dayStart={dayStart}
          dayEnd={dayEnd}
          adult={adult}
          animal={animal}
          noteAuthority={noteAuthority}
          region={region}
          theme={theme}
          child={child}
          publicShare={publicShare}
          placesRecommended={placesRecommended}
          accommodationMobileOpen={accommodationMobileOpen}
          setAccommodationMobileOpen={setAccommodationMobileOpen}
        />
        <AccommodationWrapper accommodationMobileOpen={accommodationMobileOpen}>
          <RecommendAccommodation
            dayStart={profileData.dayStart}
            travelNoteId={+makingNoteId}
            dayLength={courseData.length}
          />
        </AccommodationWrapper>
      </LeftMenuWrapper>
      <RightMenuWrapper>
        <MapTitle>여행 지도</MapTitle>
        <KakaoMap
          width={"554px"}
          height={"230px"}
          rWidth={"100%"}
          rHeight={"256px"}
          coordinateData={coordinateData.map((pos) => pos.places)}
          markerColor={coordinateData.map((pos) => pos.markerColor)}
        />
        <Spacer size={40} />
        <MakingNoteFlight
          dayStart={profileData.dayStart}
          dayEnd={profileData.dayEnd}
          adult={adult}
          child={child}
        />
        <Spacer size={30} />
        <MakingNoteCourse
          makingNoteId={+makingNoteId}
          courseData={courseData}
        />
      </RightMenuWrapper>
    </Container>
  );
};

export default MakingNote;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { makingNoteId } = context.query;
  const cookies = context.req.cookies;

  if (!cookies.nickname) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
      props: {},
    };
  }

  return {
    props: {
      makingNoteId,
    },
  };
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 964px;
  margin: 32px auto 0px;

  ${({ theme }) =>
    theme.media.mobile({
      flexDirection: "column",
      alignItems: "center",
      marginTop: 0,
    })}
`;

const LeftMenuWrapper = styled.span`
  display: flex;
  flex-direction: column;
  row-gap: 26px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
      rowGap: 0,
    })}
`;

const RightMenuWrapper = styled.span`
  margin-left: 50px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      marginLeft: "30px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      marginLeft: "0px",
      borderTop: `4px solid ${theme.color.background}`,
      paddingTop: "32px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
    })}
`;

const MapTitle = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin-bottom: 30px;

  ${({ theme }) =>
    theme.media.mobile({
      padding: "0 16px",
    })}
`;

const AccommodationWrapper = styled.div<{ accommodationMobileOpen: boolean }>`
  display: flex;

  ${(props) =>
    !props.accommodationMobileOpen &&
    props.theme.media.mobile({
      display: "none",
    })}

  ${(props) =>
    props.accommodationMobileOpen &&
    props.theme.media.mobile({
      justifyContent: "center",
    })}
`;

const MakingText = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.main50, 700)};
  font-family: "PretendardBold";
  margin-top: 20px;
`;

const MakingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 32px;
`;
