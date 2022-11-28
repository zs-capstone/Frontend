import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { changeNotePersonnel } from "../../../apis/note";
import { queryKeys } from "../../../react-query/constants";
import { IChangeNotePersonnelType } from "../../../types/note";

export const useChangeNotePersonnel = (
  makingNoteId: number
): UseMutateFunction<void, unknown, IChangeNotePersonnelType, unknown> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(changeNotePersonnel, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.makingNoteProfile,
        makingNoteId,
      ]);
    },
  });
  return mutate;
};
