import { useRouter } from "next/router";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { modifyBoard } from "../../apis/board";
import { queryKeys } from "../../react-query/constants";

export const useModifyBoard = (
  boardId: number
): {
  mutate: UseMutateFunction<void, unknown, FormData, unknown>;
  isLoading: boolean;
} => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(modifyBoard, {
    onSuccess: () => {
      queryClient.refetchQueries([queryKeys.feedDetailProfile, boardId]);
      router.push(`/feed/detail/${boardId}`);
    },
  });
  return { mutate, isLoading };
};
