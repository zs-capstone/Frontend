import { useRouter } from "next/router";
import { UseMutateFunction, useMutation } from "react-query";
import { register } from "../../apis/auth";
import { IRegisterType } from "../../types/member";

export const useRegister = (): UseMutateFunction<
  void,
  unknown,
  IRegisterType,
  unknown
> => {
  const router = useRouter();

  const { mutate } = useMutation(register, {
    onSuccess: () => {
      router.push("/");
    },
  });
  return mutate;
};
