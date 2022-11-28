import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { changeNickname } from "../../apis/member";
import { queryKeys } from "../../react-query/constants";
import { removeCookie, setCookie } from "../../utils/cookieUtils";

export const useChangeNickname = (
  nickname: string
): UseMutateFunction<void, unknown, string, unknown> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(changeNickname, {
    onSuccess: () => {
      removeCookie("nickname");
      setCookie("nickname", nickname);
      queryClient.invalidateQueries(queryKeys.profile);
      toast.success("닉네임이 변경되었습니다.");
    },
  });
  return mutate;
};
