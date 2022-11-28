import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";

const AccomodationType: React.FC<{
  selectedType: number;
  setSelectedType: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const { selectedType, setSelectedType } = props;

  return (
    <Container>
      <TypeWrapper>
        <ImageWrapper
          selected={selectedType === 1}
          onClick={() => setSelectedType(1)}
        >
          {selectedType === 1 ? (
            <Image
              src={iconUrl("pension_selected")}
              width={24}
              height={24}
              alt={"여행 메킹 추천 숙소 선택된 펜션 아이콘"}
            />
          ) : (
            <Image
              src={iconUrl("pension")}
              width={24}
              height={24}
              alt={"여행 메킹 추천 숙소 펜션 아이콘"}
            />
          )}
        </ImageWrapper>
        <Title selected={selectedType === 1}>펜션</Title>
      </TypeWrapper>
      <TypeWrapper>
        <ImageWrapper
          selected={selectedType === 2}
          onClick={() => setSelectedType(2)}
        >
          {selectedType === 2 ? (
            <Image
              src={iconUrl("inn_selected")}
              width={24}
              height={24}
              alt={"여행 메킹 추천 숙소 선택된 게하 아이콘"}
            />
          ) : (
            <Image
              src={iconUrl("inn")}
              width={24}
              height={24}
              alt={"여행 메킹 추천 숙소 게하 아이콘"}
            />
          )}
        </ImageWrapper>
        <Title selected={selectedType === 2}>게하</Title>
      </TypeWrapper>
      <TypeWrapper>
        <ImageWrapper
          selected={selectedType === 3}
          onClick={() => setSelectedType(3)}
        >
          {selectedType === 3 ? (
            <Image
              src={iconUrl("hotel_selected")}
              width={24}
              height={24}
              alt={"여행 메킹 추천 숙소 선택된 호텔 아이콘"}
            />
          ) : (
            <Image
              src={iconUrl("hotel")}
              width={24}
              height={24}
              alt={"여행 메킹 추천 숙소 호텔 아이콘"}
            />
          )}
        </ImageWrapper>
        <Title selected={selectedType === 3}>호텔/콘도</Title>
      </TypeWrapper>
      <TypeWrapper>
        <ImageWrapper
          selected={selectedType === 4}
          onClick={() => setSelectedType(4)}
        >
          {selectedType === 4 ? (
            <Image
              src={iconUrl("cottage_selected")}
              width={24}
              height={24}
              alt={"여행 메킹 추천 숙소 선택된 민박 아이콘"}
            />
          ) : (
            <Image
              src={iconUrl("cottage")}
              width={24}
              height={24}
              alt={"여행 메킹 추천 숙소 민박 아이콘"}
            />
          )}
        </ImageWrapper>
        <Title selected={selectedType === 4}>민박</Title>
      </TypeWrapper>
      <TypeWrapper>
        <ImageWrapper
          selected={selectedType === 5}
          onClick={() => setSelectedType(5)}
        >
          {selectedType === 5 ? (
            <Image
              src={iconUrl("motel_selected")}
              width={24}
              height={24}
              alt={"여행 메킹 추천 숙소 선택된 모텔 아이콘"}
            />
          ) : (
            <Image
              src={iconUrl("motel")}
              width={24}
              height={24}
              alt={"여행 메킹 추천 숙소 모텔 아이콘"}
            />
          )}
        </ImageWrapper>
        <Title selected={selectedType === 5}>모텔</Title>
      </TypeWrapper>
    </Container>
  );
};

export default AccomodationType;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TypeWrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

const Title = styled.p<{ selected: boolean }>`
  font-size: ${({ theme }) => theme.mixin.fontSize(12, theme.color.grey60)};
  margin-top: 10px;

  ${(props) =>
    props.selected && {
      color: props.theme.color.main70,
    }}
`;

const ImageWrapper = styled.div<{ selected: boolean }>`
  width: 50px;
  height: 50px;
  cursor: pointer;
  ${({ theme }) => theme.mixin.flexCenter()};
  background-color: ${({ theme }) => theme.color.grey10};
  border-radius: 100%;

  ${(props) =>
    props.selected && {
      backgroundColor: props.theme.color.main10,
    }}
`;
