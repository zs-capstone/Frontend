import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import SubmitButton from "../../components/atoms/ui/Button/SubmitButton";
import { Spacer } from "../../components/atoms/ui/Spacer/Spacer";
import EmailRetrialButton from "../../components/molecules/auth/EmailRetrialButton";
import FindPasswordInputForm from "../../components/organisms/auth/FindPasswordInputForm";
import { useFindPassword } from "../../hooks/auth/useFindPassword";
import { resetPasswordSubmittedEmailState } from "../../stores/Auth";
import { checkEmailValidation } from "../../utils/authUtils";

const FindPassword: NextPage = () => {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState<boolean>(true);

  const [submittedEmail, setSubmittedEmail] = useRecoilState<string>(
    resetPasswordSubmittedEmailState
  );

  const findPasswordAction = useFindPassword(inputEmail);

  useEffect(() => {
    return () => setSubmittedEmail("");
  }, [setSubmittedEmail]);

  useEffect(() => {
    if (inputEmail && checkEmailValidation(inputEmail)) {
      setSubmitButtonDisabled(false);
    }
  }, [inputEmail]);

  if (submittedEmail) {
    return (
      <Container>
        <Spacer size={56} />
        <Title>비밀번호 찾기</Title>
        <Spacer size={24} />
        <SubContent>
          임시 비밀번호 발송을 완료했습니다.
          <br />
          이메일 주소를 확인해주세요!
        </SubContent>
        <Spacer size={32} />
        <SubmittedEmailBlock>
          <SubmittedEmail>{submittedEmail}</SubmittedEmail>
        </SubmittedEmailBlock>
        <Spacer size={32} />
        <Link href="/auth/login">
          <a>
            <SubmitButton tabIndex={1} disabled={false}>
              로그인 하러가기
            </SubmitButton>
          </a>
        </Link>
        <Spacer size={260} />
        <EmailRetrialButton
          submitAction={findPasswordAction}
          submitEmail={submittedEmail}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Spacer size={56} />
      <Title>비밀번호 찾기</Title>
      <Spacer size={24} />
      <SubContent>
        가입시 사용한 이메일 주소로
        <br />
        임시 비밀번호를 알려드립니다.
      </SubContent>
      <Spacer size={32} />
      <FindPasswordInputForm
        inputEmail={inputEmail}
        setInputEmail={setInputEmail}
        submitButtonDisabled={submitButtonDisabled}
      />
    </Container>
  );
};

export default FindPassword;

const Container = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(24, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;

const SubContent = styled.p`
  max-width: 240px;
  text-align: center;
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(16, theme.color.grey70, 400)};
  line-height: 28px;
`;

const SubmittedEmailBlock = styled.div`
  width: 328px;
  height: 50px;
  padding: 16px;
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 10px;
`;

const SubmittedEmail = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
`;
