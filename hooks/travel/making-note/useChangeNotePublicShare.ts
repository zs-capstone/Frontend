import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { changeNotePublicShare } from "../../../apis/note";
import { queryKeys } from "../../../react-query/constants";
import { IChangeNotePublicShareType } from "../../../types/note";

export const useChangeNotePublicShare = (
  makingNoteId: number
): UseMutateFunction<void, unknown, IChangeNotePublicShareType, unknown> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(changeNotePublicShare, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.makingNoteProfile,
        makingNoteId,
      ]);
    },
  });
  return mutate;
};
