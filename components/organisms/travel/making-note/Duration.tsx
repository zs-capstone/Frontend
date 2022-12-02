import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Spacer } from "../../../atoms/ui/Spacer/Spacer";
import Block from "../../../molecules/travel/making-note/Block";
import Calendar from "../../../molecules/travel/making-note/CalendarInput";

const Duration: React.FC<{
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
}> = (props) => {
  const { startDate, setStartDate, endDate, setEndDate } = props;

  return (
    <Block height={"152px"}>
      <Wrapper>
        <Title>여행 일정</Title>
      </Wrapper>
      <Spacer size={24} />
      <Calendar
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    </Block>
  );
};

export default Duration;

const Wrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;
