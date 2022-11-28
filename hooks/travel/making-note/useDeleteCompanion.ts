import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteCompanion } from "../../../apis/note";
import { queryKeys } from "../../../react-query/constants";
import { IDeleteCompanionType } from "../../../types/note";

export const useDeleteCompanion = (
  makingNoteId: number
): UseMutateFunction<void, unknown, IDeleteCompanionType, unknown> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteCompanion, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.makingNoteCompanionList,
        makingNoteId,
      ]);
      toast.success("동행자가 삭제되었습니다.");
    },
  });
  return mutate;
};
