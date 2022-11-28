import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { modifyPhotodigmPicture } from "../../apis/photodigm";
import { queryKeys } from "../../react-query/constants";

export const useModifyPhotodigmPicture = (): {
  mutate: UseMutateFunction<void, unknown, FormData, unknown>;
  isLoading: boolean;
} => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(modifyPhotodigmPicture, {
    onSuccess: () => {
      toast.success("사진이 추가되었습니다.");
      queryClient.invalidateQueries(queryKeys.photodigmInfo);
      queryClient.invalidateQueries(queryKeys.photodigmPictureList);
    },
  });
  return { mutate, isLoading };
};
