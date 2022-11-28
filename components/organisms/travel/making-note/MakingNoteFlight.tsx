import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import FlightDropdown from "../../../atoms/travel/making-note/FilghtDropdown";
import { CommonButton } from "../../../atoms/ui/Button/CommonButton";

export type FlightDropdownItemList = {
  id: string;
  value: string;
};

const flightItems: FlightDropdownItemList[] = [
  { id: "GMP", value: "김포" },
  { id: "YNY", value: "양양" },
  { id: "PUS", value: "부산" },
];

const MakingNoteFlight: React.FC<{
  dayStart: string;
  dayEnd: string;
  adult: number;
  child: number;
}> = (props) => {
  const { dayStart, dayEnd, adult, child } = props;

  const [selectedAirportId, setSelectedAirportId] = useState<string>("GMP");

  const handleButtonClick = () => {
    window.open(
      `https://m-flight.naver.com/flights/domestic/${selectedAirportId}-CJU-${dayStart
        .split("-")
        .join("")}/CJU-${selectedAirportId}-${dayEnd
        .split("-")
        .join("")}?adult=${adult}&child=${child}&isDirect=true&fareType=YC`
    );
  };

  return (
    <Container>
      <FirstSection>
        <AirportWrapper>
          <AirportAbbreviation>{selectedAirportId}</AirportAbbreviation>
          <FlightDropdown
            flightItems={flightItems}
            setSelectedAirportId={setSelectedAirportId}
          />
        </AirportWrapper>
        <ImageWrapper>
          <Image
            src={iconUrl("airplane")}
            height={24}
            width={24}
            alt={"여행 메이킹 노트 출발지와 도착지 사이 비행기 아이콘"}
          />
        </ImageWrapper>
        <AirportWrapper>
          <AirportAbbreviation>CJU</AirportAbbreviation>
          <AirportLocation>제주</AirportLocation>
        </AirportWrapper>
      </FirstSection>
      <SecondSection>
        <DayWrapper>
          <DayBox>
            <Image
              src={iconUrl("calendar")}
              height={16}
              width={16}
              alt={"여행 메이킹 노트 여행 출발일을 나타내는 달력 아이콘"}
            />
            <Text>출발일 {dayStart.slice(5).split("-").join(".")}</Text>
          </DayBox>
          <DayBox>
            <Image
              src={iconUrl("calendar")}
              height={16}
              width={16}
              alt={"여행 메이킹 노트 여행 도착일을 나타내는 달력 아이콘"}
            />
            <Text>도착일 {dayEnd.slice(5).split("-").join(".")}</Text>
          </DayBox>
        </DayWrapper>
        <BoarderWrapper>
          <BoarderBox>
            <Image
              src={iconUrl("adult")}
              height={16}
              width={16}
              alt={"여행 메이킹 노트 어른 탑승인 아이콘"}
            />
            <Text>성인 {adult}명</Text>
          </BoarderBox>
          <BoarderBox>
            <Image
              src={iconUrl("kid")}
              height={16}
              width={16}
              alt={"여행 메이킹 노트 아동 탑승인 아이콘"}
            />
            <Text>아동 {child}명</Text>
          </BoarderBox>
        </BoarderWrapper>
        <CommonButton
          onClick={handleButtonClick}
          color={"#FFFFFF"}
          backgroundColor={"#FA8125"}
          radius={"5px"}
          width={"105px"}
          height={"60px"}
          tWidth={"74px"}
          size={14}
        >
          예매하기
        </CommonButton>
      </SecondSection>
    </Container>
  );
};

export default MakingNoteFlight;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 554px;
  height: 84px;
  padding: 12px 16px 12px 22px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.border2};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  border-radius: 6px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "328px",
      height: "160px",
      flexDirection: "column",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      borderTop: "none",
      borderBottom: `4px solid ${theme.color.background}`,
      padding: "16px",
      borderRadius: "0",
      borderLeft: "none",
      borderRight: "none",
      boxShadow: "none",
      width: "100%",
      height: "200px",
    })}
`;

const FirstSection = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SecondSection = styled.span`
  display: flex;
  flex-direction: row;

  ${({ theme }) =>
    theme.media.tabletUnder({
      marginTop: "16px",
    })}
`;

const AirportWrapper = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const AirportAbbreviation = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(20, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin-bottom: 5px;
  width: 44px;
  text-align: center;
`;

const AirportLocation = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(12, theme.color.grey60)};
`;

const ImageWrapper = styled.span`
  margin-right: 16px;
`;

const DayWrapper = styled.span`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const DayBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 12px;
  width: 115px;
  height: 28px;
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 3px;
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(12, theme.color.grey90)};
  margin-left: 4px;
`;

const BoarderWrapper = styled.span`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  margin: 0 16px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      margin: "0 8px",
    })}
`;

const BoarderBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 12px;
  width: 89px;
  height: 28px;
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 3px;
`;
