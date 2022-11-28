import { AxiosError } from "axios";
import { UseMutateFunction, useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { checkDupEmail } from "../../apis/member";
import { emailAlertState, emailCheckedState } from "../../stores/Auth";

export const useCheckDupEmail = (): UseMutateFunction<
  void,
  unknown,
  string,
  unknown
> => {
  const setIsEmailChecked = useSetRecoilState<boolean>(emailCheckedState);
  const setEmailAlert =
    useSetRecoilState<{ type: string; content: string }>(emailAlertState);

  const { mutate } = useMutation((email: string) => checkDupEmail(email), {
    onSuccess: () => {
      setIsEmailChecked(true);
      setEmailAlert({
        type: "success",
        content: "사용할 수 있는 이메일입니다.",
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        setEmailAlert({
          type: "error",
          content: error.response?.data.error || error.message,
        });
      } else {
        setEmailAlert({
          type: "error",
          content: "error connecting to server",
        });
      }
    },
  });
  return mutate;
};
