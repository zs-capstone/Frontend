import { atom } from "recoil";
import { IPlaceListDataType } from "../../types/common";
import { atomKey } from "./constants";

export const addedListState = atom<IPlaceListDataType[]>({
  key: atomKey.addedList,
  default: [],
});

export const makingNoteAddedListState = atom<IPlaceListDataType[]>({
  key: atomKey.makingNoteAddedList,
  default: [],
});
