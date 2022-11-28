import { Dispatch, SetStateAction, useEffect } from "react";
import { useRecoilState } from "recoil";
import { nicknameAlertState } from "../../stores/Auth";
import { checkNicknameValidation } from "../../utils/authUtils";
import { useCheckDupNickname } from "../auth/useCheckDupNickname";

export const useNicknameLogic = (
  setIsNicknameChecked: Dispatch<SetStateAction<boolean>>,
  setInputNickname: Dispatch<SetStateAction<string>>,
  inputNickname: string
) => {
  const [nicknameAlert, setNicknameAlert] = useRecoilState(nicknameAlertState);

  const checkDupNicknameAction = useCheckDupNickname();

  const handleInputNicknameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNicknameAlert({ type: "", content: "" });
    setInputNickname(e.target.value);
    setIsNicknameChecked(false);
  };

  const handleCheckInputNickname = () => {
    if (!inputNickname) {
      setNicknameAlert({
        type: "error",
        content: "닉네임을 입력해주세요.",
      });
      return;
    }
    if (!checkNicknameValidation(inputNickname)) {
      setNicknameAlert({
        type: "error",
        content: "닉네임을 올바르게 입력해주세요.",
      });
      return;
    }
    checkDupNicknameAction(inputNickname);
  };

  useEffect(() => {
    return () => {
      setIsNicknameChecked(false);
      setNicknameAlert({ type: "", content: "" });
    };
  }, [setIsNicknameChecked, setNicknameAlert]);

  return {
    nicknameAlert,
    setNicknameAlert,
    handleInputNicknameChange,
    handleCheckInputNickname,
  };
};
