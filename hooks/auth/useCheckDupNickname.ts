import { AxiosError } from "axios";
import { UseMutateFunction, useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { checkDupNickname } from "../../apis/member";
import { nicknameAlertState, nicknameCheckedState } from "../../stores/Auth";

export const useCheckDupNickname = (): UseMutateFunction<
  void,
  unknown,
  string,
  unknown
> => {
  const setIsNicknameChecked = useSetRecoilState<boolean>(nicknameCheckedState);
  const setNicknameAlert =
    useSetRecoilState<{ type: string; content: string }>(nicknameAlertState);

  const { mutate } = useMutation(checkDupNickname, {
    onSuccess: () => {
      setIsNicknameChecked(true);
      setNicknameAlert({
        type: "success",
        content: "사용할 수 있는 닉네임입니다.",
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        setNicknameAlert({
          type: "error",
          content: error.response?.data?.error || error.message,
        });
      } else {
        setNicknameAlert({
          type: "error",
          content: "error connectiong to server",
        });
      }
    },
  });
  return mutate;
};
