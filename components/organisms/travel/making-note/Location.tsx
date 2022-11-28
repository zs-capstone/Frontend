import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Spacer } from "../../../atoms/ui/Spacer/Spacer";
import Block from "../../../molecules/travel/making-note/Block";
import LocationInput from "../../../molecules/travel/making-note/LocationInput";

const Location: React.FC<{
  locationList: string[];
  setLocationList: Dispatch<SetStateAction<string[]>>;
}> = (props) => {
  const { locationList, setLocationList } = props;

  return (
    <Block height={"414px"}>
      <TitleWrapper>
        <Title>여행 위치</Title>
        <Required>*필수 입력 항목입니다.</Required>
      </TitleWrapper>
      <Spacer size={22} />
      <Wrapper>
        <LocationInput
          locationList={locationList}
          setLocationList={setLocationList}
          location="제주 동부"
          content={"제주 동부"}
        />
        <LocationInput
          locationList={locationList}
          setLocationList={setLocationList}
          location="제주 서부"
          content={"제주 서부"}
        />
        <LocationInput
          locationList={locationList}
          setLocationList={setLocationList}
          location="제주 남부"
          content={"제주 남부"}
        />
        <LocationInput
          locationList={locationList}
          setLocationList={setLocationList}
          location="제주 북부"
          content={"제주 북부"}
        />
      </Wrapper>
    </Block>
  );
};

export default Location;

const TitleWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

const Required = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(12, theme.color.danger)};
`;

const Title = styled.h1`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;

const Wrapper = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 28px;
  place-items: center;
`;
