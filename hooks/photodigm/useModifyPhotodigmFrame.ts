import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { modifyPhotodigmFrame } from "../../apis/photodigm";
import { queryKeys } from "../../react-query/constants";
import { IPhotodigmModifyFrameType } from "../../types/photodigm";

export const useModifyPhotodigmFrame = (): {
  mutate: UseMutateFunction<void, unknown, IPhotodigmModifyFrameType, unknown>;
  isLoading: boolean;
} => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(modifyPhotodigmFrame, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.photodigmInfo);
      toast.success("프레임이 변경되었습니다.");
    },
  });
  return { mutate, isLoading };
};
