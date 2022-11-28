import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addCompanion } from "../../../apis/note";
import { queryKeys } from "../../../react-query/constants";
import { ICommonContentType } from "../../../types/common";

export const useAddCompanion = (
  makingNoteId: number
): UseMutateFunction<void, unknown, ICommonContentType, unknown> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addCompanion, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.makingNoteCompanionList,
        makingNoteId,
      ]);
      toast.success("동행자가 추가되었습니다.");
    },
  });
  return mutate;
};
