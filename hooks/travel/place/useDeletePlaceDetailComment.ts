import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deletePlaceDetailComment } from "../../../apis/place/detail";
import { queryKeys } from "../../../react-query/constants";

export const useDeletePlaceDetailComment = (
  placeId: number
): UseMutateFunction<void, unknown, number, unknown> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deletePlaceDetailComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.placeDetailComment, placeId]);
      toast.success("댓글이 삭제되었습니다.");
    },
  });
  return mutate;
};
