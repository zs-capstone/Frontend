import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { saveProcessedCourseList } from "../../../apis/course";
import { queryKeys } from "../../../react-query/constants";
import { ISaveProcessedCourseListType } from "../../../types/course";

export const useSaveProcessedCourseList = (
  makingNoteId: number
): UseMutateFunction<void, unknown, ISaveProcessedCourseListType, unknown> => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(saveProcessedCourseList, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.makingNoteCourse, makingNoteId]);
      queryClient.invalidateQueries([
        queryKeys.makingNoteCourseDistance,
        makingNoteId,
      ]);
      queryClient.invalidateQueries([
        queryKeys.makingNoteCoordinate,
        +makingNoteId,
      ]);
      toast.success("일정이 변경되었습니다.");
    },
  });
  return mutate;
};
