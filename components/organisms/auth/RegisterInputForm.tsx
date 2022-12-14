import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { useCheckDupEmail } from "../../../hooks/auth/useCheckDupEmail";
import { useNicknameLogic } from "../../../hooks/logic/useNicknameLogic";
import { usePasswordLogic } from "../../../hooks/logic/usePasswordLogic";
import { emailAlertState } from "../../../stores/Auth";
import { checkEmailValidation } from "../../../utils/authUtils";
import Alert from "../../atoms/ui/Alert/Alert";
import BorderButton from "../../atoms/ui/Button/BorderButton";
import PasswordInput from "../../atoms/ui/Input/PasswordInput";
import SelectInput, { ValueType } from "../../atoms/ui/Input/SelectInput";
import TextInput from "../../atoms/ui/Input/TextInput";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";
import Frame from "../../molecules/ui/Frame";

const RegisterInputForm: React.FC<{
  inputEmail: string;
  inputNickname: string;
  inputPassword: string;
  inputConfirmPassword: string;
  firstNumber: string;
  secondNumber: string;
  thirdNumber: string;
  region: string;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  setInputEmail: Dispatch<SetStateAction<string>>;
  setInputNickname: Dispatch<SetStateAction<string>>;
  setInputPassword: Dispatch<SetStateAction<string>>;
  setSubmitButtonDisabled: Dispatch<SetStateAction<boolean>>;
  setFirstNumber: Dispatch<SetStateAction<string>>;
  setSecondNumber: Dispatch<SetStateAction<string>>;
  setThirdNumber: Dispatch<SetStateAction<string>>;
  setRegion: Dispatch<SetStateAction<string>>;
  setInputConfirmPassword: Dispatch<SetStateAction<string>>;
  setIsEmailChecked: SetterOrUpdater<boolean>;
  setIsNicknameChecked: SetterOrUpdater<boolean>;
}> = (props) => {
  const {
    inputEmail,
    inputNickname,
    inputPassword,
    inputConfirmPassword,
    name,
    setName,
    setInputEmail,
    setInputNickname,
    setInputPassword,
    setFirstNumber,
    setSecondNumber,
    setThirdNumber,
    setRegion,
    setIsEmailChecked,
    setIsNicknameChecked,
    setInputConfirmPassword,
  } = props;

  const [passwordTypeChanged, setPasswordTypeChanged] =
    useState<boolean>(false);
  const [confirmPasswordTypeChanged, setConfirmPasswordTypeChanged] =
    useState<boolean>(false);

  const [emailAlert, setEmailAlert] = useRecoilState(emailAlertState);

  const checkDupEmailAction = useCheckDupEmail();

  const { nicknameAlert, handleInputNicknameChange, handleCheckInputNickname } =
    useNicknameLogic(setIsNicknameChecked, setInputNickname, inputNickname);

  const {
    passwordAlert,
    confirmPasswordAlert,
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

  const handleInputEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailAlert({ type: "", content: "" });
    setInputEmail(e.target.value);
    setIsEmailChecked(false);
  };

  const handleCheckInputEmail = () => {
    if (!inputEmail) {
      setEmailAlert({
        type: "error",
        content: "???????????? ??????????????????.",
      });
      return;
    }
    if (!checkEmailValidation(inputEmail)) {
      setEmailAlert({
        type: "error",
        content: "???????????? ???????????? ??????????????????.",
      });
      return;
    }
    checkDupEmailAction(inputEmail);
  };

  useEffect(() => {
    return () => {
      setIsEmailChecked(false);
      setEmailAlert({ type: "", content: "" });
    };
  }, [setIsEmailChecked, setEmailAlert]);

  return (
    <>
      <Frame label={"?????????"} required>
        <TextInput
          width={"230px"}
          height={"50px"}
          tabIndex={1}
          placeholder={"???????????? ????????? ?????????."}
          onChange={handleInputEmailChange}
        />
        <BorderButton onClick={handleCheckInputEmail} tabIndex={2}>
          ????????????
        </BorderButton>
      </Frame>
      {emailAlert.content && (
        <Alert iconType={emailAlert.type} content={emailAlert.content} />
      )}
      <Spacer size={24} />
      <Frame label={"????????????"} required>
        <PasswordInput
          width={"328px"}
          tabIndex={3}
          placeholder="??????, ??????, ???????????? ?????? 8??? ??????"
          inputRef={inputPasswordRef}
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
      <Frame label={"???????????? ??????"} required>
        <PasswordInput
          width={"328px"}
          tabIndex={4}
          placeholder="??????????????? ??? ??? ??? ????????? ?????????."
          onBlur={handleCheckInputConfirmPassword}
          inputRef={inputConfirmPasswordRef}
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
      <Spacer size={24} />
      <Frame label={"?????????"} required>
        <TextInput
          width={"230px"}
          height={"50px"}
          tabIndex={5}
          placeholder={"??????, ??????, ?????? ?????? ?????? 12???"}
          onChange={handleInputNicknameChange}
        />
        <BorderButton onClick={handleCheckInputNickname} tabIndex={6}>
          ????????????
        </BorderButton>
      </Frame>
      {nicknameAlert.content && (
        <Alert iconType={nicknameAlert.type} content={nicknameAlert.content} />
      )}
      <Spacer size={24} />
      <Frame label={"????????? ??????"} required>
        <TextInput
          tabIndex={6}
          width={"92px"}
          height={"50px"}
          placeholder={"xxx"}
          maxLength={3}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFirstNumber(e.target.value)
          }
        />
        <TextInput
          tabIndex={7}
          width={"92px"}
          height={"50px"}
          placeholder={"xxxx"}
          maxLength={4}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSecondNumber(e.target.value)
          }
        />
        <TextInput
          tabIndex={8}
          width={"92px"}
          height={"50px"}
          placeholder={"xxxx"}
          maxLength={4}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setThirdNumber(e.target.value);
          }}
        />
      </Frame>
      <Spacer size={24} />
      <Frame label={"??????"} required>
        <TextInput
          width={"328px"}
          height={"50px"}
          tabIndex={9}
          placeholder={"????????? ??????????????????."}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
      </Frame>
      <Spacer size={24} />
      <Frame label={"??????"} required>
        <SelectInput
          setState={setRegion as Dispatch<SetStateAction<ValueType>>}
          width={"328px"}
          height={"50px"}
          tabIndex={10}
          data={[
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
            "??????",
          ]}
        />
      </Frame>
      <Spacer size={32} />
    </>
  );
};

export default RegisterInputForm;
