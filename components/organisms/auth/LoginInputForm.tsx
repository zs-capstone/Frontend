import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { useLogin } from "../../../hooks/auth/useLogin";
import SubmitButton from "../../atoms/ui/Button/SubmitButton";
import CheckboxInput from "../../atoms/ui/Input/CheckboxInput";
import PasswordInput from "../../atoms/ui/Input/PasswordInput";
import TextInput from "../../atoms/ui/Input/TextInput";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";
import Frame from "../../molecules/ui/Frame";

const LoginInputForm: React.FC<{
  inputEmail: string;
  inputPassword: string;
  submitButtonDisabled: boolean;
  setInputEmail: Dispatch<SetStateAction<string>>;
  setInputPassword: Dispatch<SetStateAction<string>>;
}> = (props) => {
  const {
    inputEmail,
    inputPassword,
    setInputEmail,
    setInputPassword,
    submitButtonDisabled,
  } = props;

  const [isAutoLogin, setIsAutoLogin] = useState<boolean>(false);
  const [passwordTypeChanged, setPasswordTypeChanged] =
    useState<boolean>(false);

  const loginAction = useLogin(isAutoLogin);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    loginAction({ email: inputEmail, password: inputPassword });
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <Frame label={"이메일"}>
        <TextInput
          width={"328px"}
          height={"50px"}
          tabIndex={1}
          placeholder={"이메일을 입력해 주세요."}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputEmail(e.target.value)
          }
        />
      </Frame>
      <Spacer size={16} />
      <Frame label={"비밀번호"}>
        <PasswordInput
          tabIndex={2}
          boxWidth={"328px"}
          placeholder="비밀번호를 입력해 주세요."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputPassword(e.target.value)
          }
          onClick={() => setPasswordTypeChanged((prev) => !prev)}
          typeChanged={passwordTypeChanged}
        />
      </Frame>
      <Spacer size={24} />
      <Wrapper>
        <CheckboxInput
          tabIndex={3}
          checked={isAutoLogin}
          onChange={() => {
            setIsAutoLogin((prev) => !prev);
          }}
        />
        <AutoLoginLabel>자동 로그인</AutoLoginLabel>
      </Wrapper>
      <Spacer size={24} />
      <SubmitButton tabIndex={4} disabled={submitButtonDisabled}>
        로그인
      </SubmitButton>
    </form>
  );
};

export default LoginInputForm;

const Wrapper = styled.span`
  display: flex;
  align-items: center;
`;

const AutoLoginLabel = styled.p`
  margin-left: 4px;
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
`;
