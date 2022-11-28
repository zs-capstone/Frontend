import { UseMutateFunction, useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { findPassword } from "../../apis/member";
import { resetPasswordSubmittedEmailState } from "../../stores/Auth";

export const useFindPassword = (
  email: string
): UseMutateFunction<void, unknown, string, unknown> => {
  const setResetPasswordSubmittedEmail = useSetRecoilState<string>(
    resetPasswordSubmittedEmailState
  );
  const { mutate } = useMutation(findPassword, {
    onSuccess: () => {
      setResetPasswordSubmittedEmail(email);
    },
  });
  return mutate;
};
