import { UseMutateFunction, useMutation } from "react-query";
import { toast } from "react-toastify";
import { checkOriginPassword } from "../../apis/member";
import { useSetRecoilState } from "recoil";
import {
  originPasswordCheckedState,
  withdrawalPasswordCheckedState,
} from "../../stores/Auth";

export const useCheckOriginPassword = (
  withdrawal: boolean
): UseMutateFunction<void, unknown, string, unknown> => {
  const setOriginPasswordChecked = useSetRecoilState(
    originPasswordCheckedState
  );
  const setWithdrawalPasswordChecked = useSetRecoilState(
    withdrawalPasswordCheckedState
  );
  const { mutate } = useMutation(checkOriginPassword, {
    onSuccess: () => {
      toast.success("비밀번호가 인증되었습니다.");
      if (withdrawal) {
        setWithdrawalPasswordChecked(true);
      } else {
        setOriginPasswordChecked(true);
      }
    },
  });
  return mutate;
};
