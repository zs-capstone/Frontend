import styled from "styled-components";

const SurveyContentContainer: React.FC<{ children: React.ReactNode[] }> = (
  props
) => {
  const { children } = props;

  return (
    <Container>
      {children[0]}
      <Versus>VS</Versus>
      {children[1]}
    </Container>
  );
};

export default SurveyContentContainer;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 126px;

  ${({ theme }) =>
    theme.media.mobile({
      flexDirection: "column",
      marginBottom: "59px",
    })}
`;

const Versus = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(32, theme.color.grey90, 700)};
  font-family: "NexonBold";
  margin: 0 25px 0;

  ${({ theme }) =>
    theme.media.mobile({
      margin: "16px 0",
    })}
`;
