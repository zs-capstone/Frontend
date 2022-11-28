import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { changePlaceDetailLikeState } from "../../../apis/place";
import { queryKeys } from "../../../react-query/constants";
import { ICommonChangeLikeStateType } from "../../../types/course";

export const useChangePlaceDetailLikeState = (
  placeId: number
): {
  mutate: UseMutateFunction<void, unknown, ICommonChangeLikeStateType, unknown>;
  isLoading: boolean;
} => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(changePlaceDetailLikeState, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.placeDetailLike, placeId]);
    },
  });
  return { mutate, isLoading };
};
