import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import Block from "../../../molecules/travel/making-note/Block";

const MaxPerDay: React.FC<{
  placeCount: number;
  setPlaceCount: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const { placeCount, setPlaceCount } = props;

  const handleMinusPlaceCount = () => {
    if (placeCount === 1) {
      return;
    }
    setPlaceCount((prev) => prev - 1);
  };

  return (
    <Block height={"152px"}>
      <Wrapper>
        <Title>여행지 개수</Title>
        <SubTitle>하루에 여행할 최대 여행지 개수</SubTitle>
      </Wrapper>
      <PlaceCountWrapper>
        <ImageContainer>
          <Image
            onClick={handleMinusPlaceCount}
            src={iconUrl("minus")}
            width={28}
            height={28}
            alt={"여행 일정 준비 페이지 여행지 개수 선택 감소 아이콘"}
          />
        </ImageContainer>
        <Count>{placeCount}</Count>
        <ImageContainer>
          <Image
            onClick={() => setPlaceCount((prev) => prev + 1)}
            src={iconUrl("plus")}
            width={28}
            height={28}
            alt={"여행 일정 준비 페이지 여행지 개수 선택 감소 아이콘"}
          />
        </ImageContainer>
      </PlaceCountWrapper>
    </Block>
  );
};

export default MaxPerDay;

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

const Count = styled.p`
  width: 15px;
  text-align: center;
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
  margin: 0 12px;
`;

const SubTitle = styled.p`
  font-family: ${({ theme }) => theme.mixin.fontSize(12, theme.color.danger)};
`;

const ImageContainer = styled.div`
  cursor: pointer;
  display: flex;
`;

const PlaceCountWrapper = styled.span`
  margin-top: 40px;
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: row;
`;
