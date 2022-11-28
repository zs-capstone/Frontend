import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { usePasswordLogic } from "../../../hooks/logic/usePasswordLogic";
import { useChangePassword } from "../../../hooks/mypage/useChangePassword";
import { originPasswordCheckedState } from "../../../stores/Auth";
import { checkPasswordValidation } from "../../../utils/authUtils";
import Alert from "../../atoms/ui/Alert/Alert";
import SubmitButton from "../../atoms/ui/Button/SubmitButton";
import PasswordInput from "../../atoms/ui/Input/PasswordInput";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";
import Frame from "../../molecules/ui/Frame";

const MypagePassword: React.FC = () => {
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState<string>("");
  const [passwordTypeChanged, setPasswordTypeChanged] =
    useState<boolean>(false);
  const [confirmPasswordTypeChanged, setConfirmPasswordTypeChanged] =
    useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const [originPasswordChecked, setOriginPasswordChecked] = useRecoilState(
    originPasswordCheckedState
  );

  const changePasswordAction = useChangePassword();

  const {
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
  } = usePasswordLogic(
    setInputPassword,
    inputPassword,
    inputConfirmPassword,
    setInputConfirmPassword
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changePasswordAction(inputPassword);
    setInputPassword("");
    setInputConfirmPassword("");
    setPasswordAlert({ type: "", content: "" });
    setConfirmPasswordAlert({ type: "", content: "" });
    setOriginPasswordChecked(false);
  };

  useEffect(() => {
    return () => {
      setOriginPasswordChecked(false);
    };
  }, [setOriginPasswordChecked]);

  useEffect(() => {
    if (
      checkPasswordValidation(inputPassword) &&
      originPasswordChecked &&
      inputPassword === inputConfirmPassword
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [inputPassword, inputConfirmPassword, originPasswordChecked]);

  return (
    <form onSubmit={handleSubmit}>
      <Frame label={"새 비밀번호"}>
        <PasswordInput
          boxWidth={"620px"}
          rWidth={"328px"}
          tabIndex={6}
          placeholder="숫자, 영어, 특수문자 포함 8자 이상"
          inputRef={inputPasswordRef}
          value={inputPassword}
          onBlur={handleCheckInputPassword}
          onChange={handleInputPasswordChange}
          onClick={() => setPasswordTypeChanged((prev) => !prev)}
          typeChanged={passwordTypeChanged}
        />
      </Frame>
      {passwordAlert.content && (
        <Alert iconType={passwordAlert.type} content={passwordAlert.content} />
      )}
      <Spacer size={24} />
      <Frame label={"새 비밀번호 확인"}>
        <PasswordInput
          boxWidth={"620px"}
          rWidth={"328px"}
          tabIndex={7}
          placeholder="비밀번호를 한 번 더 입력해 주세요."
          onBlur={handleCheckInputConfirmPassword}
          inputRef={inputConfirmPasswordRef}
          value={inputConfirmPassword}
          onChange={handleInputConfirmPasswordChange}
          onClick={() => setConfirmPasswordTypeChanged((prev) => !prev)}
          typeChanged={confirmPasswordTypeChanged}
        />
      </Frame>
      {confirmPasswordAlert.content && (
        <Alert
          iconType={confirmPasswordAlert.type}
          content={confirmPasswordAlert.content}
        />
      )}
      <Spacer size={30} />
      <ButtonWrapper>
        <SubmitButton disabled={buttonDisabled} tabIndex={8}>
          비밀번호 변경하기
        </SubmitButton>
      </ButtonWrapper>
    </form>
  );
};

export default MypagePassword;

const ButtonWrapper = styled.span`
  display: flex;
  justify-content: center;
`;
