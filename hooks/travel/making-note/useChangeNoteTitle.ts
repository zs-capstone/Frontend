import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { changeNoteTitle } from "../../../apis/note";
import { queryKeys } from "../../../react-query/constants";
import { queryErrorHandler } from "../../../react-query/queryClient";
import {
  IChangeNoteTitleType,
  IMakingNoteProfileType,
} from "../../../types/note";

export const useChangeNoteTitle = (
  makingNoteId: number,
  profileData: IMakingNoteProfileType,
  titleInput: string
): UseMutateFunction<void, unknown, IChangeNoteTitleType, unknown> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(changeNoteTitle, {
    onMutate: async () => {
      queryClient.cancelQueries([queryKeys.makingNoteProfile, makingNoteId]);

      const previousData = queryClient.getQueryData([
        queryKeys.makingNoteProfile,
        makingNoteId,
      ]);

      queryClient.setQueryData([queryKeys.makingNoteProfile, makingNoteId], {
        ...profileData,
        title: titleInput,
      });

      return { previousData };
    },
    onError: (error, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [queryKeys.makingNoteProfile, makingNoteId],
          context.previousData
        );
      }

      queryErrorHandler(error);
    },
    onSuccess: () => {
      toast.success("제목이 변경되었습니다.");
    },
    onSettled: () => {
      queryClient.invalidateQueries([
        queryKeys.makingNoteProfile,
        makingNoteId,
      ]);
    },
  });
  return mutate;
};
