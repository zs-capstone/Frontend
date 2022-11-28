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

  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);

  const [region, setRegion] = useState<string>("");

  const [requiredTermsChecked, setRequiredTermsChecked] =
    useState<boolean>(false);
  const [optionalTermChecked, setOptionalTermsChecked] =
    useState<boolean>(false);

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
      year,
      month,
      day,
      region,
      optional: optionalTermChecked,
    });
  };

  useEffect(() => {
    if (
      isEmailChecked &&
      isNicknameChecked &&
      checkPasswordValidation(inputPassword) &&
      inputPassword === inputConfirmPassword &&
      requiredTermsChecked
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
    requiredTermsChecked,
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
          year={year}
          month={month}
          day={day}
          region={region}
          setInputEmail={setInputEmail}
          setInputNickname={setInputNickname}
          setInputPassword={setInputPassword}
          setSubmitButtonDisabled={setSubmitButtonDisabled}
          setYear={setYear}
          setMonth={setMonth}
          setDay={setDay}
          setRegion={setRegion}
          setInputConfirmPassword={setInputConfirmPassword}
          setIsEmailChecked={setIsEmailChecked}
          setIsNicknameChecked={setIsNicknameChecked}
        />
        <TermsOfService
          requiredTermsChecked={requiredTermsChecked}
          setSubmitButtonDisabled={setSubmitButtonDisabled}
          setRequiredTermsChecked={setRequiredTermsChecked}
          setOptionalTermsChecked={setOptionalTermsChecked}
        />
        <Spacer size={24} />
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
