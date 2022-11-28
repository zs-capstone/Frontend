import { UseMutateFunction, useMutation } from "react-query";
import { callEmailConfirmCode } from "../../apis/member";

export const useCallEmailConfirmCode = (): UseMutateFunction<
  void,
  unknown,
  string,
  unknown
> => {
  const { mutate } = useMutation(callEmailConfirmCode, {
    onSuccess: () => {},
  });
  return mutate;
};
