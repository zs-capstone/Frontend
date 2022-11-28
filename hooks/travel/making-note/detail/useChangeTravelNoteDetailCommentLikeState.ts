import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { changeTravelNoteDetailCommentLikeState } from "../../../../apis/note/detail";
import { queryKeys } from "../../../../react-query/constants";
import { ICommonChangeLikeStateType } from "../../../../types/course";

export const useChangeTravelNoteDetailCommentLikeState = (
  travelNoteId: number
): UseMutateFunction<void, unknown, ICommonChangeLikeStateType, unknown> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(changeTravelNoteDetailCommentLikeState, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.travelNoteDetailComment,
        +travelNoteId,
      ]);
    },
  });
  return mutate;
};
