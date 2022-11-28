import styled from "styled-components";

const SpeechBubble: React.FC<{ content: string }> = (props) => {
  const { content } = props;

  return (
    <Container>
      <Content>{content}</Content>
    </Container>
  );
};

export default SpeechBubble;

const Container = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  width: 234px;
  height: 34px;
  background-color: ${({ theme }) => theme.color.black};
  border-radius: 8px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -16px;
    left: 10px;
    border: 10px solid transparent;
    border-bottom: 10px solid ${({ theme }) => theme.color.black};
  }

  ${({ theme }) =>
    theme.media.tabletUnder({
      display: "none",
    })}
`;

const Content = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.backgroundLight)};
`;
