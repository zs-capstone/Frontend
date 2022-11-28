import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteComment } from "../../../apis/note";
import { queryKeys } from "../../../react-query/constants";

export const useDeleteComment = (
  makingNoteId: number,
  day: number
): UseMutateFunction<void, unknown, number, unknown> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.makingNoteComment,
        makingNoteId,
        day,
      ]);
      toast.success("댓글이 삭제되었습니다.");
    },
  });
  return mutate;
};
