import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Block from "../../../molecules/travel/making-note/Block";

const MakingNoteName: React.FC<{
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}> = (props) => {
  const { title, setTitle } = props;

  return (
    <Block height={"152px"}>
      <Wrapper>
        <Title>여행 제목</Title>
      </Wrapper>
      <Input
        spellCheck={false}
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        placeholder="여행 제목을 입력해주세요."
      />
    </Block>
  );
};

export default MakingNoteName;

const Wrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px 0;
`;

const Title = styled.h1`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;

const Input = styled.input`
  width: 328px;
  height: 50px;
  background-color: ${({ theme }) => theme.color.grey10};
  border: 1px solid ${({ theme }) => theme.color.grey20};
  padding: 16px;
  border-radius: 56px;
`;
