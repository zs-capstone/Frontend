import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Spacer } from "../../components/atoms/ui/Spacer/Spacer";
import EmailRetrialButton from "../../components/molecules/auth/EmailRetrialButton";
import VerifyEmailInputForm from "../../components/organisms/auth/VerifyEmailInputForm";
import { useCallEmailConfirmCode } from "../../hooks/auth/useCallEmailConfirmCode";
import { verifyEmailState } from "../../stores/Auth";

const VerifyEmail: NextPage = () => {
  const [inputEmailConfirmCode, setInputEmailConfirmCode] =
    useState<string>("");
  const [verifyEmail, setVerifyEmail] =
    useRecoilState<string>(verifyEmailState);
  const [disabled, setDisabled] = useState<boolean>(true);

  const router = useRouter();

  const callEmailConfirmCodeAction = useCallEmailConfirmCode();

  useEffect(() => {
    if (!verifyEmail) {
      router.push("/");
    }
    callEmailConfirmCodeAction(verifyEmail);
  }, [router, verifyEmail, callEmailConfirmCodeAction]);

  useEffect(() => {
    return () => {
      setVerifyEmail("");
    };
  }, [setVerifyEmail]);

  useEffect(() => {
    if (inputEmailConfirmCode.length === 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputEmailConfirmCode]);

  return (
    <Container>
      <Spacer size={56} />
      <Title>이메일 인증</Title>
      <Spacer size={24} />
      <VerifyEmailInputForm
        verifyEmail={verifyEmail}
        inputEmailConfirmCode={inputEmailConfirmCode}
        setInputEmailConfirmCode={setInputEmailConfirmCode}
        disabled={disabled}
      />
      <Spacer size={230} />
      <EmailRetrialButton
        submitAction={callEmailConfirmCodeAction}
        submitEmail={verifyEmail}
      />
    </Container>
  );
};

export default VerifyEmail;

const Container = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(24, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;
