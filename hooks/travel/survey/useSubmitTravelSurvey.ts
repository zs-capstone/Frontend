import { UseMutateFunction, useMutation } from "react-query";
import { submitTravelSurvey } from "../../../apis/survey";
import { ISubmitTravelSurveyType } from "../../../types/survey";

export const useSubmitTravelSurvey = (): UseMutateFunction<
  void,
  unknown,
  ISubmitTravelSurveyType[],
  unknown
> => {
  const { mutate } = useMutation(submitTravelSurvey, {
    onSuccess: () => {},
  });
  return mutate;
};
