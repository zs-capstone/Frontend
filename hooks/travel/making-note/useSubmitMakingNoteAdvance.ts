import { useRouter } from "next/router";
import { UseMutateFunction, useMutation } from "react-query";
import { submitMakingNoteAdvance } from "../../../apis/note";
import { ISubmitMakingNoteAdvanceType } from "../../../types/note";

export const useSubmitMakingNoteAdvance = (): {
  mutate: UseMutateFunction<
    { travelNoteId: number },
    unknown,
    ISubmitMakingNoteAdvanceType,
    unknown
  >;
  isLoading: boolean;
} => {
  const router = useRouter();

  const { mutate, isLoading } = useMutation(submitMakingNoteAdvance, {
    onSuccess: (data) => {
      router.push(`/travel/making-note/${data.travelNoteId}`);
    },
  });
  return { mutate, isLoading };
};
