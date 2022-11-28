import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import styled from "styled-components";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { iconUrl } from "../../../../axiosInstance/constants";

const CalendarInput: React.FC<{
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
}> = (props) => {
  const { startDate, setStartDate, endDate, setEndDate } = props;
  registerLocale("ko", ko);

  const handleDateChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    if (start && end) {
      let date_diff = end.getTime() - start.getTime();
      date_diff /= 1000 * 60 * 60 * 24;
      if (date_diff >= 15) {
        toast.error("15일 이상의 경로는 정확하지 않을 수 있습니다.");
      }
    }
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Wrapper>
      <ReactDatePicker
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateChange}
        locale="ko"
        disabledKeyboardNavigation
        selectsRange
        popperPlacement="bottom"
        minDate={new Date()}
        customInput={
          startDate && endDate ? (
            <Container>
              <Image
                src={iconUrl("calendar")}
                alt={"여행 일정 준비 페이지 달력 아이콘"}
                width={16}
                height={16}
              />
              <DurationDescription>
                {startDate.toLocaleDateString()} ~{" "}
                {endDate.toLocaleDateString()}
              </DurationDescription>
            </Container>
          ) : (
            <Container>
              <Image
                src={iconUrl("calendar")}
                alt={"여행 일정 준비 페이지 달력 아이콘"}
                width={16}
                height={16}
              />
              <DurationDescription>
                여행 기간을 입력해주세요
              </DurationDescription>
            </Container>
          )
        }
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <CalendarHeader>
            <ImageContainer>
              <Image
                src={iconUrl("decrease_button")}
                alt={"여행 일정 준비 페이지 달력 이전 월 선택 아이콘"}
                width={32}
                height={32}
                onClick={decreaseMonth}
              />
            </ImageContainer>
            <CalendarYearMonth>
              {getYear(date)} {getMonth(date) + 1}
            </CalendarYearMonth>
            <ImageContainer>
              <Image
                src={iconUrl("increase_button")}
                alt={"여행 일정 준비 페이지 달력 이전 월 선택 아이콘"}
                width={32}
                height={32}
                onClick={increaseMonth}
              />
            </ImageContainer>
          </CalendarHeader>
        )}
      />
    </Wrapper>
  );
};

export default CalendarInput;

const Wrapper = styled.div`
  .react-datepicker {
    border: 1px solid ${({ theme }) => theme.color.border2};
  }

  .react-datepicker__month-container {
    width: 328px;
    height: 408px;
  }

  .react-datepicker__header {
    background-color: ${({ theme }) => theme.color.white};
    border-bottom: none;
  }

  .react-datepicker__day-name {
    width: 35px;
    height: 30px;
    margin: 8px 0;
    font-size: ${({ theme }) =>
      theme.mixin.fontSize(14, theme.color.grey90, 700)};
  }

  .react-datepicker__day {
    width: 35px;
    height: 30px;
    margin: 8px 0;
    font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey90)};
    border-radius: 0;

    &--outside-month,
    &--disabled {
      color: ${({ theme }) => theme.color.grey50};
    }

    &--today {
      color: ${({ theme }) => theme.color.white};
      background-color: ${({ theme }) => theme.color.secondary60};
    }

    &--selected,
    &--selecting-range-start,
    &--range-start,
    &--range-end {
      color: ${({ theme }) => theme.color.white} !important;
      background-color: ${({ theme }) => theme.color.main50} !important;
      :focus {
        outline: none !important;
      }
    }

    &--in-range:not(.react-datepicker__day--selected, .react-datepicker__day--range-end) {
      color: ${({ theme }) => theme.color.main50};
      background-color: ${({ theme }) => theme.color.main10};
    }

    &--in-selecting-range:not(.react-datepicker__day--selected, .react-datepicker__day--range-end) {
      color: ${({ theme }) => theme.color.grey90};
      background-color: transparent;
    }
  }

  .react-datepicker__triangle {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  cursor: pointer;
  height: 52px;
  width: 328px;
  padding: 16px 12px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.border1};
  border-radius: 3px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const DurationDescription = styled.p`
  margin-left: 12px;
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
`;

const ImageContainer = styled.div`
  cursor: pointer;
`;

const CalendarHeader = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  height: 32px;
  margin: 12px 0;
`;

const CalendarYearMonth = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.grey, 700)};
  font-family: "PretendardBold";
  width: 168px;
`;
