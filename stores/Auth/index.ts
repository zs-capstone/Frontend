import { atom } from "recoil";
import { atomKey } from "./constants";

export const emailCheckedState = atom<boolean>({
  key: atomKey.emailChecked,
  default: false,
});

export const nicknameCheckedState = atom<boolean>({
  key: atomKey.nicknameChecked,
  default: false,
});

export const originPasswordCheckedState = atom<boolean>({
  key: atomKey.originPasswordChecked,
  default: false,
});

export const withdrawalPasswordCheckedState = atom<boolean>({
  key: atomKey.withdrawalPasswordChecked,
  default: false,
});

export const emailAlertState = atom<{ type: string; content: string }>({
  key: atomKey.emailAlert,
  default: { type: "", content: "" },
});

export const nicknameAlertState = atom<{ type: string; content: string }>({
  key: atomKey.nicknameAlert,
  default: { type: "", content: "" },
});

export const passwordAlertState = atom<{ type: string; content: string }>({
  key: atomKey.passwordAlert,
  default: { type: "", content: "" },
});

export const confirmPasswordAlertState = atom<{
  type: string;
  content: string;
}>({
  key: atomKey.confirmPasswordAlert,
  default: { type: "", content: "" },
});

export const verifyEmailState = atom<string>({
  key: atomKey.verifyEmail,
  default: "",
});

export const resetPasswordSubmittedEmailState = atom<string>({
  key: atomKey.resetPasswordSubmittedEmail,
  default: "",
});
