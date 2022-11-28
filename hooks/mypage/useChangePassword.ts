import { UseMutateFunction, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { changePassword } from "../../apis/member";
import { originPasswordCheckedState } from "../../stores/Auth";

export const useChangePassword = (): UseMutateFunction<
  void,
  unknown,
  string,
  unknown
> => {
  const { mutate } = useMutation(changePassword, {
    onSuccess: () => {
      toast.success("비밀번호가 변경되었습니다.");
    },
  });
  return mutate;
};
