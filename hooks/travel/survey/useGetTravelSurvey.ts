import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { queryKeys } from "../../../react-query/constants";
import { getTravelSurvey, surveyProgress } from "../../../apis/survey";
import { IGetTravelSurveyType } from "../../../types/survey";

export const useGetTravelSurvey = () => {
  const [updatedSurveyIndex, setUpdatedSurveyIndex] = useState<number>(1);
  const queryClient = useQueryClient();

  const { data: contentList } = useQuery<IGetTravelSurveyType[]>(
    [queryKeys.travelSurvey, updatedSurveyIndex],
    () => getTravelSurvey(updatedSurveyIndex)
  );

  const { data } = useQuery<{ progress: number }>(
    queryKeys.surveyProgress,
    surveyProgress,
    {
      staleTime: 0,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (data) setUpdatedSurveyIndex(data.progress);
  }, [data]);

  useEffect(() => {
    const nextQuestionIndex = updatedSurveyIndex + 1;
    if (nextQuestionIndex <= 10) {
      queryClient.prefetchQuery(
        [queryKeys.travelSurvey, nextQuestionIndex],
        () => getTravelSurvey(nextQuestionIndex)
      );
    }
  }, [queryClient, updatedSurveyIndex]);

  return { contentList, data, setUpdatedSurveyIndex, updatedSurveyIndex };
};
