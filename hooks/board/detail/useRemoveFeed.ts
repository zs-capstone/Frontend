import { useRouter } from "next/router";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { removeFeed } from "../../../apis/board";
import { queryKeys } from "../../../react-query/constants";

export const useRemoveFeed = (): UseMutateFunction<
  void,
  unknown,
  number,
  unknown
> => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(removeFeed, {
    onSuccess: () => {
      queryClient.refetchQueries(queryKeys.feedList);
      router.push("/feed");
    },
  });
  return mutate;
};
