import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const FeedDescription: React.FC<{
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}> = (props) => {
  const { text, setText } = props;

  return (
    <Container>
      <Title>설명</Title>
      <Description>여행을 설명해 주세요!</Description>
      <TextArea
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
        value={text}
        spellCheck={false}
        placeholder={"내용을 입력해 주세요. (최대 500자)"}
        maxLength={500}
      />
    </Container>
  );
};

export default FeedDescription;

const Container = styled.div`
  margin: 35px 140px;
  display: flex;
  flex-direction: column;

  ${({ theme }) =>
    theme.media.tabletUnder({
      margin: "35px 16px",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
  margin-bottom: 17px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 248px;
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 10px;
  padding: 16px;
  resize: none;
`;
