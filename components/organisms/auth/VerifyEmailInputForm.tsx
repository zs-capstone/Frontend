import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useSubmitEmailConfirmCode } from "../../../hooks/auth/useSubmitEmailConfirmCode";
import SubmitButton from "../../atoms/ui/Button/SubmitButton";
import TextInput from "../../atoms/ui/Input/TextInput";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";

const VerifyEmailInputForm: React.FC<{
  verifyEmail: string;
  inputEmailConfirmCode: string;
  setInputEmailConfirmCode: Dispatch<SetStateAction<string>>;
  disabled: boolean;
}> = (props) => {
  const {
    verifyEmail,
    inputEmailConfirmCode,
    setInputEmailConfirmCode,
    disabled,
  } = props;

  const submitEmailConfirmCodeAction = useSubmitEmailConfirmCode();

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    submitEmailConfirmCodeAction(inputEmailConfirmCode);
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      <VerifiedEmail>{verifyEmail}</VerifiedEmail>
      <Spacer size={18} />
      <EmailSubmittedAlert>
        이메일로 인증코드를 발송하였습니다.
        <br /> 인증코드 6자리를 입력해 주세요.
      </EmailSubmittedAlert>
      <Spacer size={18} />
      <TextInput
        tabIndex={1}
        width={"328px"}
        height={"50px"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputEmailConfirmCode(e.target.value)
        }
      />
      <Spacer size={34} />
      <SubmitButton tabIndex={2} disabled={disabled}>
        인증하기
      </SubmitButton>
    </Form>
  );
};

export default VerifyEmailInputForm;

const Form = styled.form`
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: column;
`;

const VerifiedEmail = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(15, theme.color.main50, 700)};
`;

const EmailSubmittedAlert = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(16, theme.color.grey70, 400)};
  text-align: center;
  line-height: 28px;
`;
