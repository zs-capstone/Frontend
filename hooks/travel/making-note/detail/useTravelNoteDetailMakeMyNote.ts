import { useRouter } from "next/router";
import { UseMutateFunction, useMutation } from "react-query";
import { travelNoteDetailMakeMyNote } from "../../../../apis/note/detail";

export const useTravelNoteDetailMakeMyNote = (): UseMutateFunction<
  number,
  unknown,
  number,
  unknown
> => {
  const router = useRouter();

  const { mutate } = useMutation(travelNoteDetailMakeMyNote, {
    onSuccess: (data) => {
      window.open(`/travel/making-note/${data}`);
    },
  });
  return mutate;
};
