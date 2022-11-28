import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addTravelNoteDetailComment } from "../../../../apis/note/detail";
import { queryKeys } from "../../../../react-query/constants";
import { ICommonContentType } from "../../../../types/common";

export const useAddTravelNoteDetailComment = (
  travelNoteId: number
): UseMutateFunction<void, unknown, ICommonContentType, unknown> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addTravelNoteDetailComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.travelNoteDetailComment,
        +travelNoteId,
      ]);
      toast.success("댓글이 추가되었습니다.");
    },
  });
  return mutate;
};
