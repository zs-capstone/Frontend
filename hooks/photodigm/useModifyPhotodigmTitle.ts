import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { modifyPhotodigmTitle } from "../../apis/photodigm";
import { queryKeys } from "../../react-query/constants";
import { IPhotodigmModifyTitleType } from "../../types/photodigm";

export const useModifyPhotodigmTitle = (): UseMutateFunction<
  void,
  unknown,
  IPhotodigmModifyTitleType,
  unknown
> => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(modifyPhotodigmTitle, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.photodigmInfo);
      toast.success("제목이 변경되었습니다.");
    },
  });
  return mutate;
};
