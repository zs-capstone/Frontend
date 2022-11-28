import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { addFeedComment } from "../../../apis/board/detail";
import { queryKeys } from "../../../react-query/constants";
import { IDetailCommentAddType } from "../../../types/common";

export const useAddFeedComment = (): UseMutateFunction<
  void,
  unknown,
  IDetailCommentAddType,
  unknown
> => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addFeedComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.feedCommentList);
      queryClient.invalidateQueries(queryKeys.feedDetailCommentCount);
    },
  });
  return mutate;
};
