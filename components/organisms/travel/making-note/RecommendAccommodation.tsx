import { useEffect, useState } from "react";
import styled from "styled-components";
import AccommodationDaySelect from "../../../atoms/travel/making-note/AccommodationDaySelect";
import AccommodationList from "../../../molecules/travel/making-note/AccommodationList";
import AccomodationType from "../../../atoms/travel/making-note/AccommodationType";
import { TravelNoteDropdownType } from "../../../atoms/travel/making-note/detail/TravelNoteDropdown";

const RecommendAccommodation: React.FC<{
  travelNoteId: number;
  dayLength: number;
  dayStart: string;
}> = (props) => {
  const { travelNoteId, dayLength, dayStart } = props;

  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<number>(1);
  const [itemList, setItemList] = useState<TravelNoteDropdownType[]>([]);

  useEffect(() => {
    setItemList(
      [...Array(dayLength)].map((_, index) => {
        return {
          id: index,
          value: index + 1,
        };
      })
    );
  }, [dayLength]);

  return (
    <Container>
      <Title>추천 숙소</Title>
      <AccommodationDaySelect
        dayLength={dayLength}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        itemList={itemList}
      />
      <AccomodationType
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <AccommodationList
        dayStart={dayStart}
        travelNoteId={travelNoteId}
        selectedDay={selectedDay}
        selectedType={selectedType}
      />
    </Container>
  );
};

export default RecommendAccommodation;

const Container = styled.div`
  width: 360px;
  height: fit-content;
  padding: 20px 24px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.border2};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  border-radius: 8px;

  ${({ theme }) =>
    theme.media.mobile({
      border: "none",
      borderRadius: 0,
      width: "100%",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;
