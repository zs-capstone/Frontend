import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import TravelNoteDropdown, {
  TravelNoteDropdownType,
} from "./detail/TravelNoteDropdown";

const AccommodationDaySelect: React.FC<{
  selectedDay: number;
  setSelectedDay: Dispatch<SetStateAction<number>>;
  itemList: TravelNoteDropdownType[];
  dayLength: number;
}> = (props) => {
  const { selectedDay, setSelectedDay, itemList, dayLength } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSetSelectDay = (value: number) => {
    setSelectedDay(value);
    setIsOpen((prev) => !prev);
  };

  const handleIncreaseCourseDay = () => {
    if (selectedDay >= dayLength) {
      setSelectedDay(1);
    } else {
      setSelectedDay((prev) => prev + 1);
    }
  };

  const handleDecreaseCourseDay = () => {
    if (selectedDay <= 1) {
      setSelectedDay(dayLength);
    } else {
      setSelectedDay((prev) => prev - 1);
    }
  };

  return (
    <Container>
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
        itemList={itemList}
        selectDay={selectedDay}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSetSelectDay={handleSetSelectDay}
      />
      <ImageContainer>
        <Image
          src={iconUrl("increase_button")}
          alt={"여행 노트 상세 페이지 여행 코스 일차 증가 아이콘"}
          width={32}
          height={32}
          onClick={handleIncreaseCourseDay}
        />
      </ImageContainer>
    </Container>
  );
};

export default AccommodationDaySelect;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const ImageContainer = styled.div`
  cursor: pointer;
`;
