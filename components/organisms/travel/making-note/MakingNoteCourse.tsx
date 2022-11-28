import { useState } from "react";
import styled from "styled-components";
import { useSaveProcessedCourseList } from "../../../../hooks/travel/making-note/useSaveProcessedCourseList";
import { IMakingNoteCourseDataType } from "../../../../types/course";
import { CommonButton } from "../../../atoms/ui/Button/CommonButton";
import { Spacer } from "../../../atoms/ui/Spacer/Spacer";
import DayOfCourse from "../../../molecules/travel/making-note/DayOfCourse";
import EditDayOfCourse from "../../../molecules/travel/making-note/EditDayOfCourse";

const MakingNoteCourse: React.FC<{
  courseData: IMakingNoteCourseDataType[];
  makingNoteId: number;
}> = (props) => {
  const { courseData, makingNoteId } = props;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [processedCourseList, setProcessedCourseList] = useState<number[][]>(
    []
  );

  const saveProcessedCourseList = useSaveProcessedCourseList(makingNoteId);

  const handleButtonClick = () => {
    if (isEdit && processedCourseList.length > 0) {
      saveProcessedCourseList({
        courseList: processedCourseList,
        travelNoteId: makingNoteId,
      });
    }
    setIsEdit((prev) => !prev);
  };

  return (
    <Container>
      <Wrapper>
        <Title>여행 일정</Title>
        <CommonButton
          onClick={handleButtonClick}
          radius={"10px"}
          size={15}
          color={"#FA8125"}
          fontFamily={"PretendardBold"}
        >
          {isEdit ? "편집완료" : "편집하기"}
        </CommonButton>
      </Wrapper>
      <Spacer size={30} />
      {!isEdit &&
        courseData.map((course) => (
          <DayOfCourse
            makingNoteId={makingNoteId}
            key={course.day}
            day={course.day}
            places={course.places}
          />
        ))}
      {isEdit && (
        <EditDayOfCourse
          setProcessedCourseList={setProcessedCourseList}
          isEdit={isEdit}
          courseData={courseData}
        />
      )}
    </Container>
  );
};

export default MakingNoteCourse;

const Container = styled.div`
  width: 554px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "328px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) =>
    theme.media.mobile({
      padding: "0 16px",
    })}
`;
