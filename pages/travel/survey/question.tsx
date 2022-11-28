import { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import { useGetTravelSurvey } from "../../../hooks/travel/survey/useGetTravelSurvey";
import SurveyContent from "../../../components/molecules/travel/survey/SurveyContent";
import SurveyTitle from "../../../components/molecules/travel/survey/SurveyTitle";
import ProgressBar from "../../../components/molecules/ui/ProgressBar";
import SurveyContentWrapper from "../../../components/organisms/travel/survey/SurveyContentContainer";
import { useSubmitTravelSurvey } from "../../../hooks/travel/survey/useSubmitTravelSurvey";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "../../../utils/cookieUtils";

const SurveyQuestion: NextPage = () => {
  const { contentList, data, setUpdatedSurveyIndex, updatedSurveyIndex } =
    useGetTravelSurvey();
  const submitTravelSurveyAction = useSubmitTravelSurvey();
  const router = useRouter();

  useEffect(() => {
    if (getCookie("authority") !== "ROLE_SURVEY") {
      router.push("/");
    }
  });

  if (!data || !contentList) {
    return <></>;
  }

  const firstPlace = contentList[0];
  const secondPlace = contentList[1];

  return (
    <Container>
      <SurveyTitle />
      <ProgressBar progress={updatedSurveyIndex} />
      <SurveyContentWrapper>
        <SurveyContent
          setQuestionIndex={setUpdatedSurveyIndex}
          place={firstPlace}
          questionIndex={updatedSurveyIndex}
          onClickAction={submitTravelSurveyAction}
        />
        <SurveyContent
          setQuestionIndex={setUpdatedSurveyIndex}
          place={secondPlace}
          questionIndex={updatedSurveyIndex}
          onClickAction={submitTravelSurveyAction}
        />
      </SurveyContentWrapper>
    </Container>
  );
};

export default SurveyQuestion;

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
