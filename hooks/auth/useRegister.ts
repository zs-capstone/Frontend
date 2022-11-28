import { useRouter } from "next/router";
import { UseMutateFunction, useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { register } from "../../apis/auth";
import { verifyEmailState } from "../../stores/Auth";
import { IRegisterType } from "../../types/member";

export const useRegister = (): UseMutateFunction<
  void,
  unknown,
  IRegisterType,
  unknown
> => {
  const router = useRouter();
  const setVerifyEmailState = useSetRecoilState<string>(verifyEmailState);

  const { mutate } = useMutation(register, {
    onSuccess: (_, data) => {
      setVerifyEmailState(data.email);
      router.push("/auth/verify-email");
    },
  });
  return mutate;
};
