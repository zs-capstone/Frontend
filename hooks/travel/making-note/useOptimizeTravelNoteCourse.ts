import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { optimizeTravelNoteCourse } from "../../../apis/course";
import { queryKeys } from "../../../react-query/constants";

export const useOptimizeTravelNoteCourse = (
  makingNoteId: number
): {
  mutate: UseMutateFunction<void, unknown, number, unknown>;
  isLoading: boolean;
} => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(optimizeTravelNoteCourse, {
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
      toast.success("동선이 최적화되었습니다.");
    },
  });
  return { mutate, isLoading };
};
