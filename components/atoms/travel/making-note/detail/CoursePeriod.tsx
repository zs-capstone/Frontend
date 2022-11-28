import styled from "styled-components";

const CoursePeriod: React.FC<{ content: string }> = (props) => {
  const { content } = props;

  return (
    <Container>
      <Content>{content}</Content>
    </Container>
  );
};

export default CoursePeriod;

const Container = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  width: 77px;
  height: 26px;
  background: rgba(19, 20, 21, 0.5);
  border-radius: 56px;
  padding: 4px 8px;
`;

const Content = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(12, theme.color.white, 700)};
  word-break: keep-all;
  text-align: center;
`;
