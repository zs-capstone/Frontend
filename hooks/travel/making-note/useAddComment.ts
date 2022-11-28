import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addComment } from "../../../apis/note";
import { queryKeys } from "../../../react-query/constants";
import { IAddCommentType } from "../../../types/note";

export const useAddComment = (
  makingNoteId: number,
  day: number
): UseMutateFunction<
  { commentId: number; createdTime: Date },
  unknown,
  IAddCommentType,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.makingNoteComment,
        makingNoteId,
        day,
      ]);
      toast.success("댓글이 추가되었습니다.");
    },
  });
  return mutate;
};
