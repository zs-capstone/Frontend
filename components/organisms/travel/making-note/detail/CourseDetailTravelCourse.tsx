import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { fetchTravelNoteDetailCourseInfo } from "../../../../../apis/course";
import { iconUrl } from "../../../../../axiosInstance/constants";
import { useTravelNoteDetailMakeMyNote } from "../../../../../hooks/travel/making-note/detail/useTravelNoteDetailMakeMyNote";
import { queryKeys } from "../../../../../react-query/constants";
import { ITravelNoteDetailCourseInfoType } from "../../../../../types/course";
import TravelNoteDropdown, {
  TravelNoteDropdownType,
} from "../../../../atoms/travel/making-note/detail/TravelNoteDropdown";
import { CommonButton } from "../../../../atoms/ui/Button/CommonButton";
import { Spacer } from "../../../../atoms/ui/Spacer/Spacer";
import CourseDetailTravelPlace from "../../../../molecules/travel/making-note/detail/CourseDetailTravelPlace";

const CourseDetailTravelCourse: React.FC<{
  travelNoteId: number;
  courseDay: number;
  setCourseDay: Dispatch<SetStateAction<number>>;
  selectDay: number;
  setSelectDay: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const { travelNoteId, courseDay, setCourseDay, selectDay, setSelectDay } =
    props;

  const queryClient = useQueryClient();

  const [itemList, setItemList] = useState<TravelNoteDropdownType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const travelNoteDetailMakeMyNoteAction = useTravelNoteDetailMakeMyNote();

  const { data: detailCourseInfo } = useQuery<ITravelNoteDetailCourseInfoType>(
    [queryKeys.travelNoteDetailCourseInfo, +travelNoteId, courseDay],
    () => fetchTravelNoteDetailCourseInfo(+travelNoteId, courseDay)
  );

  useEffect(() => {
    setItemList(
      [...Array(detailCourseInfo?.totalDay)].map((_, index) => {
        return {
          id: index,
          value: index + 1,
        };
      })
    );
  }, [detailCourseInfo?.totalDay]);

  useEffect(() => {
    if (detailCourseInfo && courseDay < detailCourseInfo.totalDay) {
      queryClient.prefetchQuery<ITravelNoteDetailCourseInfoType>(
        [queryKeys.travelNoteDetailCourseInfo, +travelNoteId, courseDay + 1],
        () => fetchTravelNoteDetailCourseInfo(+travelNoteId, courseDay + 1)
      );
    }
  }, [courseDay, queryClient, travelNoteId, detailCourseInfo]);

  const handleIncreaseCourseDay = () => {
    if (!detailCourseInfo?.hasNext) {
      setCourseDay(1);
      setSelectDay(1);
    } else {
      setCourseDay((prev) => prev + 1);
      setSelectDay((prev) => prev + 1);
    }
  };

  const handleDecreaseCourseDay = () => {
    if (!detailCourseInfo?.hasPrev && detailCourseInfo?.totalDay) {
      setCourseDay(detailCourseInfo.totalDay);
      setSelectDay(detailCourseInfo.totalDay);
    } else {
      setCourseDay((prev) => prev - 1);
      setSelectDay((prev) => prev - 1);
    }
  };

  const handleSetSelectDay = (value: number) => {
    setSelectDay(value);
    setIsOpen((prev) => !prev);
    setCourseDay(value);
  };

  return (
    <Container>
      <TitleWrapper>
        <ImageContainer>
          <Image
            src={iconUrl("decrease_button")}
            alt={"여행 노트 상세 페이지 여행 코스 일차 증가 아이콘"}
            width={32}
            height={32}
            onClick={handleDecreaseCourseDay}
          />
        </ImageContainer>
        <TravelNoteDropdown
          selectDay={selectDay}
          itemList={itemList}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleSetSelectDay={handleSetSelectDay}
        />
        <ImageContainer>
          <Image
            src={iconUrl("increase_button")}
            alt={"여행 노트 상세 페이지 여행 코스 일차 감소 아이콘"}
            width={32}
            height={32}
            onClick={handleIncreaseCourseDay}
          />
        </ImageContainer>
      </TitleWrapper>
      {detailCourseInfo?.places.map((courseInfo, index) => (
        <CourseDetailTravelPlace
          key={courseInfo.placeId}
          placeId={courseInfo.placeId}
          title={courseInfo.title}
          index={index + 1}
          address={courseInfo.address}
          hasNext={courseInfo.hasNext}
          routeInfo={courseInfo.routeInfo}
        />
      ))}
      <Spacer size={28} />
      <CommonButton
        width={"276px"}
        height={"50px"}
        backgroundColor={"#FA8125"}
        size={15}
        radius={"10px"}
        color={"#FFFFFF"}
        rWidth={"100%"}
        onClick={() => travelNoteDetailMakeMyNoteAction(travelNoteId)}
      >
        이 일정으로 계획 만들기
      </CommonButton>
    </Container>
  );
};

export default React.memo(CourseDetailTravelCourse);

const Container = styled.div`
  width: 308px;
  height: fit-content;
  border: 1px solid ${({ theme }) => theme.color.border2};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  border-radius: 8px;
  padding: 16px 16px 24px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
      border: "none",
      boxShadow: "none",
      borderRadius: 0,
      padding: "0 16px",
    })}
`;

const TitleWrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const ImageContainer = styled.div`
  cursor: pointer;
`;
