import React from "react";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchNoteDetailRecommendNote } from "../../../../../apis/recommend";
import { queryKeys } from "../../../../../react-query/constants";
import { ITravelNoteDetailRecommendedTravelNotesType } from "../../../../../types/recommend";
import RecommendedTravelNotes from "../../../../molecules/travel/making-note/detail/RecommendedTravelNotes";

const CourseDetailRecommendedTravelNotes: React.FC<{ travelNoteId: number }> = (
  props
) => {
  const { travelNoteId } = props;

  const { data: recommendedTravelNotes, isLoading } = useQuery<
    ITravelNoteDetailRecommendedTravelNotesType[]
  >([queryKeys.travelNoteRecommendedNote, +travelNoteId], () =>
    fetchNoteDetailRecommendNote(+travelNoteId)
  );

  return (
    <Container>
      <Title>유사한 여행 노트</Title>
      {isLoading ? (
        <ClipLoader color={"#FA8125"} />
      ) : (
        <TravelNotesWrapper>
          {recommendedTravelNotes?.map((note) => (
            <RecommendedTravelNotes
              key={note.travelNoteId}
              travelNoteId={note.travelNoteId}
              title={note.title}
              theme={note.theme}
              imageUrl={note.imageUrl}
            />
          ))}
        </TravelNotesWrapper>
      )}
    </Container>
  );
};

export default React.memo(CourseDetailRecommendedTravelNotes);

const Container = styled.div`
  width: 636px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      maxWidth: "328px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "100%",
      width: "100%",
      padding: "0 16px",
    })}
`;

const TravelNotesWrapper = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      gridTemplateColumns: "1fr",
      columnGap: "0px",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin-bottom: 16px;
`;
