import React, { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchMakingNoteCoordinate } from "../../../../../apis/course";
import { queryKeys } from "../../../../../react-query/constants";
import { IMakingNoteCoordinateType } from "../../../../../types/course";
import { KakaoCourseDayMap } from "../../../../atoms/travel/making-note/KakaoMap";
import { Spacer } from "../../../../atoms/ui/Spacer/Spacer";

const CourseDetailMap: React.FC<{
  travelNoteId: number;
  courseDay: number;
  setCourseDay: Dispatch<SetStateAction<number>>;
  setSelectDay: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const { travelNoteId, courseDay, setCourseDay, setSelectDay } = props;

  const { data: coordinates = [] } = useQuery<IMakingNoteCoordinateType[]>(
    [queryKeys.travelNoteCoordinate, +travelNoteId],
    () => fetchMakingNoteCoordinate(+travelNoteId)
  );

  return (
    <Container>
      <Title>여행 지도</Title>
      <Spacer size={20} />
      <KakaoCourseDayMap
        width={"636px"}
        height={"308px"}
        rWidth={"100%"}
        rHeight={"256px"}
        coordinateData={coordinates.map((coordinate) => coordinate.places)}
        markerColor={coordinates.map((coordinate) => coordinate.markerColor)}
        courseDay={courseDay}
        setCourseDay={setCourseDay}
        setSelectDay={setSelectDay}
      />
    </Container>
  );
};

export default CourseDetailMap;

const Container = styled.div`
  width: 636px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      maxWidth: "328px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
      maxWidth: "100%",
      padding: "0 16px",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;
