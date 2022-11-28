import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { modifyProfileImage } from "../../apis/member";
import { queryKeys } from "../../react-query/constants";

export const useModifyProfileImage = (): UseMutateFunction<
  void,
  unknown,
  FormData,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(modifyProfileImage, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.profile);
      toast.success("프로필 이미지가 수정되었습니다.");
    },
  });
  return mutate;
};
