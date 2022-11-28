import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { changePlaceDetailCommentLikeState } from "../../../apis/place/detail";
import { queryKeys } from "../../../react-query/constants";
import { ICommonChangeLikeStateType } from "../../../types/course";

export const useChangePlaceDetailCommentLikeState = (
  placeId: number
): UseMutateFunction<void, unknown, ICommonChangeLikeStateType, unknown> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(changePlaceDetailCommentLikeState, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.placeDetailComment, placeId]);
    },
  });
  return mutate;
};
