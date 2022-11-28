import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deletePhotodigmPicture } from "../../apis/photodigm";
import { queryKeys } from "../../react-query/constants";
import { IDeletePhotodigmPictureType } from "../../types/photodigm";

export const useDeletePhotodigmPicture = (): {
  isLoading: boolean;
  mutate: UseMutateFunction<
    void,
    unknown,
    IDeletePhotodigmPictureType,
    unknown
  >;
} => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deletePhotodigmPicture, {
    onSuccess: () => {
      toast.success("사진이 삭제되었습니다.");
      queryClient.invalidateQueries(queryKeys.photodigmInfo);
      queryClient.invalidateQueries(queryKeys.photodigmPictureList);
    },
  });
  return { mutate, isLoading };
};
