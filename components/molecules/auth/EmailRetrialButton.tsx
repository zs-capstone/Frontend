import { UseMutateFunction } from "react-query";
import styled from "styled-components";
import BorderButton from "../../atoms/ui/Button/BorderButton";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";

const EmailRetrialButton: React.FC<{
  submitAction: UseMutateFunction<void, unknown, string, unknown>;
  submitEmail: string;
}> = (props) => {
  const { submitAction, submitEmail } = props;

  return (
    <>
      <EmailRetrialBlock>
        <EmailRetrialContent>
          10분내로 메일을 받지 못하셨다면
          <br /> 스팸 폴더 확인 혹은 메일을 다시 보내보세요.
        </EmailRetrialContent>
      </EmailRetrialBlock>
      <Spacer size={24} />
      <BorderButton
        width={"135px"}
        padding={"6px 12px"}
        height={"30px"}
        shadow={true}
        onClick={() => submitAction(submitEmail)}
      >
        이메일 다시 보내기
      </BorderButton>
    </>
  );
};

export default EmailRetrialButton;

const EmailRetrialBlock = styled.div`
  width: 248px;
  height: 52px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.background};
  padding: 8px;
`;

const EmailRetrialContent = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(13, theme.color.grey70, 400)};
  text-align: center;
  line-height: 18px;
`;
