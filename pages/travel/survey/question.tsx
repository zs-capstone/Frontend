import { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import SurveyTitle from "../../../components/molecules/travel/survey/SurveyTitle";
import {
  IGetTravelSurveyType,
  ISubmitTravelSurveyType,
} from "../../../types/survey";
import { useQuery } from "react-query";
import { queryKeys } from "../../../react-query/constants";
import { getTravelSurvey } from "../../../apis/survey";
import SurveyContent from "../../../components/molecules/travel/survey/SurveyContent";
import { useState } from "react";
import { useEffect } from "react";
import ProgressBar from "../../../components/molecules/ui/ProgressBar";

const SurveyQuestion: NextPage = () => {
  const { data: contentList } = useQuery<IGetTravelSurveyType[]>(
    queryKeys.travelSurvey,
    getTravelSurvey
  );

  const [renderingContent, setRenderingContent] =
    useState<IGetTravelSurveyType>();
  const [surveyIndex, setSurveyIndex] = useState<number>(1);

  useEffect(() => {
    if (contentList) {
      setRenderingContent(contentList[surveyIndex - 1]);
    }
  }, [contentList, surveyIndex]);

  return (
    <Container>
      <SurveyTitle />
      <ProgressBar progress={surveyIndex} />
      {renderingContent && (
        <SurveyContent
          place={renderingContent}
          questionIndex={surveyIndex}
          setSurveyIndex={setSurveyIndex}
        />
      )}
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
