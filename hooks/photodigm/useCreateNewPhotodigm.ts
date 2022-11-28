import { useRouter } from "next/router";
import { UseMutateFunction, useMutation } from "react-query";
import { createNewPhotodigm } from "../../apis/photodigm";

export const useCreateNewPhotodigm = (): {
  mutate: UseMutateFunction<{ photodigmId: number }, unknown, void, unknown>;
  isLoading: boolean;
} => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(createNewPhotodigm, {
    onSuccess: (data) => {
      router.push(`/photodigm/${data.photodigmId.toString()}`);
    },
  });
  return { mutate, isLoading };
};
