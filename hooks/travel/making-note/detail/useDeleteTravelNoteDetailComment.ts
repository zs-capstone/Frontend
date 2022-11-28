import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteTravelNoteDetailComment } from "../../../../apis/note/detail";
import { queryKeys } from "../../../../react-query/constants";

export const useDeleteTravelNoteDetailComment = (
  travelNoteId: number
): UseMutateFunction<void, unknown, number, unknown> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteTravelNoteDetailComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.travelNoteDetailComment,
        +travelNoteId,
      ]);
      toast.success("댓글이 삭제되었습니다.");
    },
  });
  return mutate;
};
