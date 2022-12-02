import React, { useEffect, useState } from "react";
import TermsOfService from "../../components/organisms/auth/TermsOfService";
import { useRegister } from "../../hooks/auth/useRegister";
import { NextPage } from "next";
import SubmitButton from "../../components/atoms/ui/Button/SubmitButton";
import RegisterInputForm from "../../components/organisms/auth/RegisterInputForm";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { emailCheckedState, nicknameCheckedState } from "../../stores/Auth";
import { Spacer } from "../../components/atoms/ui/Spacer/Spacer";
import { checkPasswordValidation } from "../../utils/authUtils";

const Register: NextPage = () => {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputNickname, setInputNickname] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState<string>("");

  const [firstNumber, setFirstNumber] = useState<string>("000");
  const [secondNumber, setSecondNumber] = useState<string>("0000");
  const [thirdNumber, setThirdNumber] = useState<string>("0000");

  const [name, setName] = useState<string>("");

  const [region, setRegion] = useState<string>("");

  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState<boolean>(true);

  const [isEmailChecked, setIsEmailChecked] =
    useRecoilState<boolean>(emailCheckedState);
  const [isNicknameChecked, setIsNicknameChecked] =
    useRecoilState<boolean>(nicknameCheckedState);

  const registerAction = useRegister();

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    registerAction({
      email: inputEmail,
      nickname: inputNickname,
      password: inputPassword,
      phone: firstNumber + secondNumber + thirdNumber,
      name,
      region,
    });
  };

  useEffect(() => {
    if (
      isEmailChecked &&
      isNicknameChecked &&
      checkPasswordValidation(inputPassword) &&
      inputPassword === inputConfirmPassword &&
      firstNumber &&
      secondNumber &&
      thirdNumber &&
      name &&
      region
    ) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }, [
    isEmailChecked,
    isNicknameChecked,
    inputPassword,
    inputConfirmPassword,
    firstNumber,
    secondNumber,
    thirdNumber,
    name,
    region,
  ]);

  return (
    <Container>
      <Spacer size={56} />
      <Title>회원가입</Title>
      <Spacer size={24} />
      <form onSubmit={handleSubmitForm}>
        <RegisterInputForm
          inputEmail={inputEmail}
          inputNickname={inputNickname}
          inputPassword={inputPassword}
          inputConfirmPassword={inputConfirmPassword}
          firstNumber={firstNumber}
          secondNumber={secondNumber}
          thirdNumber={thirdNumber}
          region={region}
          name={name}
          setName={setName}
          setInputEmail={setInputEmail}
          setInputNickname={setInputNickname}
          setInputPassword={setInputPassword}
          setSubmitButtonDisabled={setSubmitButtonDisabled}
          setFirstNumber={setFirstNumber}
          setSecondNumber={setSecondNumber}
          setThirdNumber={setThirdNumber}
          setRegion={setRegion}
          setInputConfirmPassword={setInputConfirmPassword}
          setIsEmailChecked={setIsEmailChecked}
          setIsNicknameChecked={setIsNicknameChecked}
        />
        <SubmitButton disabled={submitButtonDisabled} tabIndex={17}>
          회원가입
        </SubmitButton>
      </form>
      <Spacer size={55} />
    </Container>
  );
};

export default Register;

const Container = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(24, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;
