import { Dispatch, SetStateAction } from "react";
import { useFindPassword } from "../../../hooks/auth/useFindPassword";
import SubmitButton from "../../atoms/ui/Button/SubmitButton";
import TextInput from "../../atoms/ui/Input/TextInput";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";
import Frame from "../../molecules/ui/Frame";

const FindPasswordInputForm: React.FC<{
  inputEmail: string;
  submitButtonDisabled: boolean;
  setInputEmail: Dispatch<SetStateAction<string>>;
}> = (props) => {
  const { inputEmail, submitButtonDisabled, setInputEmail } = props;

  const findPasswordAction = useFindPassword(inputEmail);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    findPasswordAction(inputEmail);
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
      <Spacer size={32} />
      <SubmitButton tabIndex={2} disabled={submitButtonDisabled}>
        임시 비밀번호 전송
      </SubmitButton>
    </form>
  );
};

export default FindPasswordInputForm;
