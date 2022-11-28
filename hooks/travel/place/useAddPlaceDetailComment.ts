import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addPlaceDetailComment } from "../../../apis/place/detail";
import { queryKeys } from "../../../react-query/constants";
import { IDetailCommentAddType } from "../../../types/common";

export const useAddPlaceDetailComment = (
  placeId: number
): UseMutateFunction<void, unknown, IDetailCommentAddType, unknown> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addPlaceDetailComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.placeDetailComment, placeId]);
      toast.success("댓글이 추가되었습니다.");
    },
  });
  return mutate;
};
