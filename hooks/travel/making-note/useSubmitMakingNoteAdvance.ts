import { AxiosResponseHeaders } from "axios";
import { useRouter } from "next/router";
import { UseMutateFunction, useMutation } from "react-query";
import { submitMakingNoteAdvance } from "../../../apis/note";
import { ISubmitMakingNoteAdvanceType } from "../../../types/note";

export const useSubmitMakingNoteAdvance = (): {
  mutate: UseMutateFunction<
    AxiosResponseHeaders,
    unknown,
    ISubmitMakingNoteAdvanceType,
    unknown
  >;
  isLoading: boolean;
} => {
  const router = useRouter();

  const { mutate, isLoading } = useMutation(submitMakingNoteAdvance, {
    onSuccess: (data) => {
      const splittedUrls = data.location.split("/");
      router.push(
        `/travel/making-note/${splittedUrls[splittedUrls.length - 1]}`
      );
    },
  });
  return { mutate, isLoading };
};
