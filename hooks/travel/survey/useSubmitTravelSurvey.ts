import { UseMutateAsyncFunction, useMutation } from "react-query";
import { submitTravelSurvey } from "../../../apis/survey";
import { ISubmitTravelSurveyType } from "../../../types/survey";

export const useSubmitTravelSurvey = (): UseMutateAsyncFunction<
  void,
  unknown,
  ISubmitTravelSurveyType,
  unknown
> => {
  const { mutateAsync } = useMutation(submitTravelSurvey, {
    onSuccess: () => {},
  });
  return mutateAsync;
};
