import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Spacer } from "../../../atoms/ui/Spacer/Spacer";
import Block from "../../../molecules/travel/making-note/Block";
import PersonnelInput from "../../../molecules/travel/making-note/PersonnelInput";

const Personnel: React.FC<{
  adult: number;
  kid: number;
  pet: number;
  setAdult: Dispatch<SetStateAction<number>>;
  setKid: Dispatch<SetStateAction<number>>;
  setPet: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const { adult, kid, pet, setAdult, setKid, setPet } = props;
  return (
    <Block height={"294px"}>
      <Wrapper>
        <Title>μ¬ν μΈμ</Title>
      </Wrapper>
      <Spacer size={22} />
      <PersonnelInput type="adult" number={adult} setState={setAdult} />
      <Spacer size={16} />
      <PersonnelInput type="kid" number={kid} setState={setKid} />
      <Spacer size={16} />
      <PersonnelInput type="pet" number={pet} setState={setPet} />
    </Block>
  );
};

export default Personnel;

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
