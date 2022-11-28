import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { changeFeedCommentLikeState } from "../../../apis/board/detail";
import { queryKeys } from "../../../react-query/constants";
import { ICommonChangeLikeStateType } from "../../../types/course";

export const useChangeFeedCommentLikeState = (): UseMutateFunction<
  void,
  unknown,
  ICommonChangeLikeStateType,
  unknown
> => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(changeFeedCommentLikeState, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.feedCommentList);
    },
  });
  return mutate;
};
