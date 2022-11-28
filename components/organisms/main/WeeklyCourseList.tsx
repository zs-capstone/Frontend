import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchWeeklyNotes } from "../../../apis/note";
import { queryKeys } from "../../../react-query/constants";
import { IMainTravelNoteInfoDataType } from "../../../types/common";
import CourseFrame from "../../molecules/main/CourseFrame";

const WeeklyCourseList: React.FC<{}> = () => {
  const { data: weeklyNotes } = useQuery<IMainTravelNoteInfoDataType[]>(
    queryKeys.weeklyNoteList,
    fetchWeeklyNotes,
    { suspense: true }
  );

  return (
    <Container>
      <Title>주간 인기 여행 노트</Title>
      <CourseFrameWrapper>
        {weeklyNotes?.map((note, index) => (
          <CourseFrame
            key={note.travelNoteId}
            hasLiked={note.hasLiked}
            likeCount={note.likeCount}
            travelNoteId={note.travelNoteId}
            rank={index + 1}
            title={note.title}
            imageUrl={note.imageUrl}
          />
        ))}
      </CourseFrameWrapper>
    </Container>
  );
};

export default WeeklyCourseList;

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
