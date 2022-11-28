import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { modifyProfileBio } from "../../apis/member";
import { queryKeys } from "../../react-query/constants";

export const useModifyProfileBio = (): UseMutateFunction<
  void,
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(modifyProfileBio, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.profile);
      toast.success("자기소개가 수정되었습니다.");
    },
  });
  return mutate;
};
