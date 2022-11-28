import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteProfileImage } from "../../apis/member";
import { queryKeys } from "../../react-query/constants";

export const useDeleteProfileImage = (): UseMutateFunction<
  void,
  unknown,
  void,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteProfileImage, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.profile);
      toast.success("프로필 이미지가 삭제되었습니다.");
    },
  });
  return mutate;
};
