import styled from "styled-components";

const MypageWarning: React.FC<{ content: string }> = (props) => {
  const { content } = props;

  return (
    <Container>
      <Content>{content}</Content>
    </Container>
  );
};

export default MypageWarning;

const Container = styled.div`
  height: 68px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border1};
  display: flex;
  align-items: center;

  ${({ theme }) =>
    theme.media.mobile({
      width: "328px",
    })}
`;

const Content = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};
`;
