import { NextPage } from "next";
import styled from "styled-components";
import SurveyResult from "../../../components/organisms/travel/survey/SurveyResult";

const SurveyResultContainer: NextPage = () => {
  return (
    <Container>
      <SurveyResult />
    </Container>
  );
};

export default SurveyResultContainer;

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: column;
`;
