import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchMainRecommendNoteList } from "../../../apis/recommend";
import { queryKeys } from "../../../react-query/constants";
import { IMainTravelNoteInfoDataType } from "../../../types/common";
import CourseFrame from "../../molecules/main/CourseFrame";

const RecommendCourseList: React.FC = () => {
  const { data: recommendedNotes } = useQuery<IMainTravelNoteInfoDataType[]>(
    queryKeys.recommendNoteList,
    fetchMainRecommendNoteList,
    { suspense: true }
  );

  return (
    <Container>
      <Title>추천 여행 노트</Title>
      <CourseFrameWrapper>
        {recommendedNotes?.map((note) => (
          <CourseFrame
            key={note.travelNoteId}
            hasLiked={note.hasLiked}
            likeCount={note.likeCount}
            travelNoteId={note.travelNoteId}
            imageUrl={note.imageUrl}
            title={note.title}
          />
        ))}
      </CourseFrameWrapper>
    </Container>
  );
};

export default RecommendCourseList;

const Container = styled.div`
  width: 100%;

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

  ${({ theme }) => theme.media.mobile({})}
`;

const MoreCourse = styled.p`
  cursor: pointer;
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.grey60, 700)};
`;

const CourseFrameWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${({ theme }) =>
    theme.media.tabletUnder({
      justifyContent: "flex-start",
      overflowX: "auto",
      gap: 10,
    })}
`;
