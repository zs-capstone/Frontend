import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { changeFeedLikeState } from "../../apis/board";
import { queryKeys } from "../../react-query/constants";
import { ICommonChangeLikeStateType } from "../../types/course";

export const useChangeFeedLikeState = (): {
  mutate: UseMutateFunction<void, unknown, ICommonChangeLikeStateType, unknown>;
  isLoading: boolean;
} => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(changeFeedLikeState, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.feedDetailLikeState);
    },
  });
  return { mutate, isLoading };
};
