import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  year: number;
  month: number;
  day: number;
  region: string;
  setInputEmail: Dispatch<SetStateAction<string>>;
  setInputNickname: Dispatch<SetStateAction<string>>;
  setInputPassword: Dispatch<SetStateAction<string>>;
  setSubmitButtonDisabled: Dispatch<SetStateAction<boolean>>;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  setDay: Dispatch<SetStateAction<number>>;
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
    setInputEmail,
    setInputNickname,
    setInputPassword,
    setYear,
    setMonth,
    setDay,
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
        content: "이메일을 입력해주세요.",
      });
      return;
    }
    if (!checkEmailValidation(inputEmail)) {
      setEmailAlert({
        type: "error",
        content: "이메일을 올바르게 입력해주세요.",
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
      <Frame label={"이메일"} required>
        <TextInput
          width={"230px"}
          height={"50px"}
          tabIndex={1}
          placeholder={"이메일을 입력해 주세요."}
          onChange={handleInputEmailChange}
        />
        <BorderButton onClick={handleCheckInputEmail} tabIndex={2}>
          중복확인
        </BorderButton>
      </Frame>
      {emailAlert.content && (
        <Alert iconType={emailAlert.type} content={emailAlert.content} />
      )}
      <Spacer size={24} />
      <Frame label={"비밀번호"} required>
        <PasswordInput
          width={"328px"}
          tabIndex={3}
          placeholder="숫자, 영어, 특수문자 포함 8자 이상"
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
      <Frame label={"비밀번호 확인"} required>
        <PasswordInput
          width={"328px"}
          tabIndex={4}
          placeholder="비밀번호를 한 번 더 입력해 주세요."
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
      <Frame label={"닉네임"} required>
        <TextInput
          width={"230px"}
          height={"50px"}
          tabIndex={5}
          placeholder={"영어, 한글, 숫자 조합 최대 12자"}
          onChange={handleInputNicknameChange}
        />
        <BorderButton onClick={handleCheckInputNickname} tabIndex={6}>
          중복확인
        </BorderButton>
      </Frame>
      {nicknameAlert.content && (
        <Alert iconType={nicknameAlert.type} content={nicknameAlert.content} />
      )}
      <Spacer size={24} />
      <Frame label={"핸드폰 번호"} required>
        <TextInput
          tabIndex={7}
          width={"92px"}
          height={"50px"}
          placeholder={"xxx"}
          maxLength={3}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setYear(+e.target.value)
          }
        />
        <TextInput
          tabIndex={8}
          width={"92px"}
          height={"50px"}
          placeholder={"xxxx"}
          maxLength={4}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setYear(+e.target.value)
          }
        />
        <TextInput
          tabIndex={9}
          width={"92px"}
          height={"50px"}
          placeholder={"xxxx"}
          maxLength={4}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDay(+e.target.value);
          }}
        />
      </Frame>
      <Spacer size={24} />
      <Frame label={"이름"} required>
        <TextInput
          width={"328px"}
          height={"50px"}
          tabIndex={5}
          placeholder={"이름을 입력해주세요."}
          onChange={handleInputNicknameChange}
        />
      </Frame>
      <Spacer size={24} />
      <Frame label={"지역"} required>
        <SelectInput
          setState={setRegion as Dispatch<SetStateAction<ValueType>>}
          width={"328px"}
          height={"50px"}
          tabIndex={10}
          data={[
            "선택",
            "강원",
            "경기",
            "경남",
            "경북",
            "광주",
            "대구",
            "대전",
            "부산",
            "서울",
            "울산",
            "인천",
            "전남",
            "전북",
            "제주",
            "충남",
            "충북",
          ]}
        />
      </Frame>
      <Spacer size={32} />
    </>
  );
};

export default RegisterInputForm;
