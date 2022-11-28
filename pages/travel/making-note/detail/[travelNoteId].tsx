import { dehydrate, QueryClient, useQuery } from "react-query";
import { queryKeys } from "../../../../react-query/constants";
import { GetStaticProps } from "next";
import styled from "styled-components";
import { Spacer } from "../../../../components/atoms/ui/Spacer/Spacer";
import { Suspense, useState } from "react";
import { useChangeTravelNoteDetailLikeState } from "../../../../hooks/travel/making-note/detail/useChangeTravelNoteDetailLikeState";
import { fetchTravelNoteDetailInfo } from "../../../../apis/note/detail";
import { fetchTravelNoteDetailCourseInfo } from "../../../../apis/course";
import { fetchTravelNoteDetailLike } from "../../../../apis/note";
import { ITravelNoteDetailInfoType } from "../../../../types/note/detail";
import { ITravelNoteDetailCourseInfoType } from "../../../../types/course";
import { IDetailLikeType } from "../../../../types/common";
import { ClipLoader } from "react-spinners";
import { axiosInstance } from "../../../../axiosInstance";
import ErrorBoundary from "../../../../ErrorBoundary";
import Custom404 from "../../../404";
import dynamic from "next/dynamic";

const CourseDetailProfile = dynamic(
  () =>
    import(
      "../../../../components/organisms/travel/making-note/detail/CourseDetailProfile"
    ),
  { suspense: true }
);

const CourseDetailMap = dynamic(
  () =>
    import(
      "../../../../components/organisms/travel/making-note/detail/CourseDetailMap"
    ),
  { ssr: false }
);

const CourseDetailRecommendedTravelNotes = dynamic(
  () =>
    import(
      "../../../../components/organisms/travel/making-note/detail/CourseDetailRecommendedTravelNotes"
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

const CourseDetailComment = dynamic(
  () =>
    import(
      "../../../../components/organisms/travel/making-note/detail/CourseDetailComment"
    ),
  { ssr: false }
);

const CourseDetailTravelCourse = dynamic(
  () =>
    import(
      "../../../../components/organisms/travel/making-note/detail/CourseDetailTravelCourse"
    ),
  { ssr: false }
);

const MakingNoteDetail: React.FC<{ travelNoteId: string }> = ({
  travelNoteId,
}) => {
  const [courseDay, setCourseDay] = useState<number>(1);
  const [selectDay, setSelectDay] = useState<number>(1);

  const { data: likeInfo } = useQuery<IDetailLikeType>(
    [queryKeys.travelNoteDetailLike, +travelNoteId],
    () => fetchTravelNoteDetailLike(+travelNoteId)
  );

  const { mutate: changeTravelNoteDetailLikeStateAction, isLoading } =
    useChangeTravelNoteDetailLikeState(+travelNoteId);

  const handleChangeTravelNoteDetailLike = () => {
    changeTravelNoteDetailLikeStateAction({
      id: +travelNoteId,
      like: !likeInfo?.hasLiked,
    });
  };

  return (
    <ErrorBoundary fallback={<Custom404 />}>
      <Container>
        <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
          <CourseDetailProfile travelNoteId={+travelNoteId} />
        </Suspense>
        <Spacer size={40} />
        <Wrapper>
          <LeftWrapper>
            <CourseDetailMap
              travelNoteId={+travelNoteId}
              setSelectDay={setSelectDay}
              courseDay={courseDay}
              setCourseDay={setCourseDay}
            />
            <Spacer size={30} />
            <CourseDetailRecommendedTravelNotes travelNoteId={+travelNoteId} />
            <LikeWrapper>
              {isLoading ? (
                <ClipLoader color={"#FA8125"} />
              ) : (
                <PlaceDetailLike
                  selectedLanguage="ko"
                  handleLikeChange={handleChangeTravelNoteDetailLike}
                  hasLiked={likeInfo?.hasLiked}
                  likeCount={likeInfo?.likeCount}
                />
              )}
            </LikeWrapper>
            <Spacer size={40} />
            <CourseDetailComment travelNoteId={+travelNoteId} />
          </LeftWrapper>
          <CourseDetailTravelCourse
            selectDay={selectDay}
            courseDay={courseDay}
            setSelectDay={setSelectDay}
            setCourseDay={setCourseDay}
            travelNoteId={+travelNoteId}
          />
        </Wrapper>
      </Container>
    </ErrorBoundary>
  );
};

export default MakingNoteDetail;

export const getStaticProps: GetStaticProps = async (context) => {
  const query = context.params!;
  const travelNoteId = query.travelNoteId!;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<ITravelNoteDetailInfoType>(
    [queryKeys.travelNoteDetailInfo, +travelNoteId],
    () => fetchTravelNoteDetailInfo(+travelNoteId)
  );

  await queryClient.prefetchQuery<ITravelNoteDetailCourseInfoType>(
    [queryKeys.travelNoteDetailCourseInfo, +travelNoteId, 1],
    () => fetchTravelNoteDetailCourseInfo(+travelNoteId, 1)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      travelNoteId,
    },
  };
};

export const getStaticPaths = async () => {
  const { data } = await axiosInstance.get("/note/all");

  const noteIds = data.data
    .slice(0, 1000)
    .map((element: { travelNoteId: string }) => element.travelNoteId);

  const paths = noteIds.map((id: string) => ({
    params: { travelNoteId: id },
  }));

  return { paths, fallback: "blocking" };
};

const Container = styled.div`
  max-width: 964px;
  margin: 40px auto 126px;

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

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${({ theme }) =>
    theme.media.mobile({
      flexDirection: "column-reverse",
      alignItems: "center",
      rowGap: "30px",
    })}
`;

const LeftWrapper = styled.span`
  display: flex;
  flex-direction: column;

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
      borderTop: `4px solid ${theme.color.background}`,
      paddingTop: "23px",
    })}
`;

const LikeWrapper = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;
