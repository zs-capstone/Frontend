import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addRecommendPlace } from "../../../apis/course";
import { queryKeys } from "../../../react-query/constants";
import { IAddRecommendPlaceType } from "../../../types/course";

export const useAddRecommendPlace = (
  makingNoteId: number
): UseMutateFunction<void, unknown, IAddRecommendPlaceType, unknown> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addRecommendPlace, {
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
      toast.success("여행지가 추가되었습니다.");
    },
  });
  return mutate;
};
