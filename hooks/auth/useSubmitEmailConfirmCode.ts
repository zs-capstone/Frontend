import { useRouter } from "next/router";
import { UseMutateFunction, useMutation } from "react-query";
import { submitEmailConfirmCode } from "../../apis/member";

export const useSubmitEmailConfirmCode = (): UseMutateFunction<
  void,
  unknown,
  string,
  unknown
> => {
  const router = useRouter();
  const { mutate } = useMutation(submitEmailConfirmCode, {
    onSuccess: () => {
      router.push("/auth/welcome");
    },
  });
  return mutate;
};
