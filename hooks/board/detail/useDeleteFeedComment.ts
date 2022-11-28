import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { deleteFeedComment } from "../../../apis/board/detail";
import { queryKeys } from "../../../react-query/constants";

export const useDeleteFeedComment = (): UseMutateFunction<
  void,
  unknown,
  number,
  unknown
> => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteFeedComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.feedCommentList);
      queryClient.invalidateQueries(queryKeys.feedDetailCommentCount);
    },
  });
  return mutate;
};
