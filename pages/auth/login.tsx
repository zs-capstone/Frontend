import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CommonButton } from "../../components/atoms/ui/Button/CommonButton";
import { Spacer } from "../../components/atoms/ui/Spacer/Spacer";
import LoginInputForm from "../../components/organisms/auth/LoginInputForm";
import { checkEmailValidation } from "../../utils/authUtils";

const Login: NextPage = () => {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState<boolean>(true);

  useEffect(() => {
    if (inputEmail && checkEmailValidation(inputEmail) && inputPassword) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }, [inputEmail, inputPassword]);

  return (
    <Container>
      <Spacer size={54} />
      <Title>로그인</Title>
      <Spacer size={24} />
      <LoginInputForm
        inputEmail={inputEmail}
        inputPassword={inputPassword}
        submitButtonDisabled={submitButtonDisabled}
        setInputEmail={setInputEmail}
        setInputPassword={setInputPassword}
      />
      <Spacer size={28} />
      <AuthButtonWrapper>
        <Link href="/auth/find-password">
          <a>
            <CommonButton size={14}>비밀번호 찾기</CommonButton>
          </a>
        </Link>
        <Link href="/auth/register">
          <a>
            <CommonButton size={14}>회원가입</CommonButton>
          </a>
        </Link>
      </AuthButtonWrapper>
      <Spacer size={176} />
      <Copyright>Copyright 2022 Yeoreodigm all rights reserved.</Copyright>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(24, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;

const AuthButtonWrapper = styled.span`
  width: 174px;
  display: flex;
  justify-content: space-between;
`;

const Copyright = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(12, theme.color.grey40, 700)};
`;
