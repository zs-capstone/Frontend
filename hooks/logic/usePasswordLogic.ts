import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import {
  confirmPasswordAlertState,
  passwordAlertState,
} from "../../stores/Auth";
import { checkPasswordValidation } from "../../utils/authUtils";

export const usePasswordLogic = (
  setInputPassword: Dispatch<SetStateAction<string>>,
  inputPassword: string,
  inputConfirmPassword: string,
  setInputConfirmPassword: Dispatch<SetStateAction<string>>
) => {
  const [passwordAlert, setPasswordAlert] = useRecoilState(passwordAlertState);
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useRecoilState(
    confirmPasswordAlertState
  );

  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputConfirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleInputPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordAlert({ type: "", content: "" });
    setInputPassword(e.target.value);
    setConfirmPasswordAlert({ type: "", content: "" });
  };

  const handleCheckInputPassword = () => {
    if (inputPassword) {
      if (!checkPasswordValidation(inputPassword)) {
        setPasswordAlert({
          type: "error",
          content:
            "숫자, 영어, 특수문자를 포함한 8자 이상 비밀번호를 사용하세요.",
        });
        return;
      }
    }
  };

  const handleCheckInputConfirmPassword = () => {
    if (inputPassword && inputConfirmPassword) {
      if (inputPassword !== inputConfirmPassword) {
        setConfirmPasswordAlert({
          type: "error",
          content: "비밀번호가 일치하지 않습니다.",
        });
        return;
      } else {
        setConfirmPasswordAlert({
          type: "success",
          content: "비밀번호가 일치합니다.",
        });
        return;
      }
    }
  };

  const handleInputConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputConfirmPassword(e.target.value);
    setConfirmPasswordAlert({ type: "", content: "" });
  };

  useEffect(() => {
    return () => {
      setPasswordAlert({ type: "", content: "" });
      setConfirmPasswordAlert({ type: "", content: "" });
    };
  }, [setPasswordAlert, setConfirmPasswordAlert]);

  return {
    passwordAlert,
    setPasswordAlert,
    confirmPasswordAlert,
    setConfirmPasswordAlert,
    inputPasswordRef,
    inputConfirmPasswordRef,
    handleInputPasswordChange,
    handleCheckInputPassword,
    handleInputConfirmPasswordChange,
    handleCheckInputConfirmPassword,
  };
};
