import { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import SurveyTitle from "../../../components/molecules/travel/survey/SurveyTitle";
import SurveyIndex from "../../../components/organisms/travel/survey/SurveyIndex";

const SurveyIndexContainer: NextPage = () => {
  return (
    <Container>
      <SurveyTitle />
      <SurveyIndex />
    </Container>
  );
};

export default SurveyIndexContainer;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;

  if (!cookies.nickname) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: column;
`;
