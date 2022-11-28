import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { changeFollowState } from "../../apis/member";
import { queryKeys } from "../../react-query/constants";
import { IFollowType } from "../../types/member";

export const useChangeFollowState = (
  memberId: number
): UseMutateFunction<void, unknown, IFollowType, unknown> => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(changeFollowState, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.followState, memberId]);
    },
  });
  return mutate;
};
