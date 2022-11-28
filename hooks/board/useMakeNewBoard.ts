import { useRouter } from "next/router";
import { UseMutateFunction, useMutation } from "react-query";
import { makeNewBoard } from "../../apis/board";

export const useMakeNewBoard = (): {
  mutate: UseMutateFunction<{ boardId: number }, unknown, FormData, unknown>;
  isLoading: boolean;
} => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(makeNewBoard, {
    onSuccess: (data) => {
      router.push(`/feed/detail/${data.boardId}`);
    },
  });
  return { mutate, isLoading };
};
