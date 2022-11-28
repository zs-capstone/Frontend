import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { changeTravelNoteDetailLikeState } from "../../../../apis/note";
import { queryKeys } from "../../../../react-query/constants";
import { ICommonChangeLikeStateType } from "../../../../types/course";

export const useChangeTravelNoteDetailLikeState = (
  travelNoteId: number
): {
  mutate: UseMutateFunction<void, unknown, ICommonChangeLikeStateType, unknown>;
  isLoading: boolean;
} => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(changeTravelNoteDetailLikeState, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.travelNoteDetailLike,
        +travelNoteId,
      ]);
    },
  });
  return { mutate, isLoading };
};
