import { Dispatch, SetStateAction, useState } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import styled from "styled-components";
import Block from "../../../molecules/travel/making-note/Block";

const PublicShare: React.FC<{
  shareOther: boolean;
  setShareOther: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  const { shareOther, setShareOther } = props;

  return (
    <Block height={"152px"}>
      <Wrapper>
        <Title>외부 공유</Title>
        <SubTitle>타인과 여행계획을 공유합니다.</SubTitle>
      </Wrapper>
      <ToggleWrapper>
        <Toggle
          onChange={() => setShareOther((prev) => !prev)}
          icons={false}
          checked={shareOther}
        />
      </ToggleWrapper>
    </Block>
  );
};

export default PublicShare;

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

const ToggleWrapper = styled.span`
  display: flex;
  margin-top: 40px;
  justify-content: center;
  position: relative;
`;

const SubTitle = styled.p`
  font-family: ${({ theme }) => theme.mixin.fontSize(12, theme.color.danger)};
`;
