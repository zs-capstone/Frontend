import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";

const PersonnelInput: React.FC<{
  type: "adult" | "kid" | "pet";
  number: number;
  isProfile?: boolean;
  setState: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const { type, isProfile, number, setState } = props;

  const handleSetState = () => {
    if (number > 0) setState((prev) => prev - 1);
  };

  return (
    <Container isProfile={isProfile}>
      {type === "adult" && (
        <TypeWrapper>
          <Image
            src={iconUrl("adult")}
            width={16}
            height={16}
            alt={"여행 일정 준비 페이지 인원 선택 성인 아이콘"}
          />
          <PersonnelType>성인</PersonnelType>
        </TypeWrapper>
      )}
      {type === "kid" && (
        <TypeWrapper>
          <Image
            src={iconUrl("kid")}
            width={16}
            height={16}
            alt={"여행 일정 준비 페이지 인원 선택 아동 아이콘"}
          />
          <PersonnelType>아동</PersonnelType>
        </TypeWrapper>
      )}
      {type === "pet" && (
        <TypeWrapper>
          <Image
            src={iconUrl("pet")}
            width={16}
            height={16}
            alt={"여행 일정 준비 페이지 인원 선택 반려동물 아이콘"}
          />
          <PersonnelType>반려동물</PersonnelType>
        </TypeWrapper>
      )}
      <CountWrapper>
        <ImageContainer>
          <Image
            onClick={handleSetState}
            src={iconUrl("minus")}
            width={28}
            height={28}
            alt={"여행 일정 준비 페이지 인원 선택 감소 아이콘"}
          />
        </ImageContainer>
        <Count>{number}</Count>
        <ImageContainer>
          <Image
            onClick={() => setState((prev) => prev + 1)}
            src={iconUrl("plus")}
            width={28}
            height={28}
            alt={"여행 일정 준비 페이지 인원 선택 감소 아이콘"}
          />
        </ImageContainer>
      </CountWrapper>
    </Container>
  );
};

export default PersonnelInput;

const Container = styled.div<{ isProfile?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 12px;
  width: ${(props) => (props.isProfile ? "280px" : "328px")};
  height: 52px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.border1};
  border-radius: 3px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const PersonnelType = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  margin-left: 14px;
`;

const Count = styled.p`
  width: 15px;
  text-align: center;
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
  margin: 0 12px;
`;

const TypeWrapper = styled.span`
  ${({ theme }) => theme.mixin.flexCenter()};
`;

const CountWrapper = styled.span`
  ${({ theme }) => theme.mixin.flexCenter()};
`;

const ImageContainer = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.mixin.flexCenter()};
`;
