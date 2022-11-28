import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useMembershipWithdrawal } from "../../../hooks/mypage/useMembershipWithdrawal";
import { CommonButton } from "../../atoms/ui/Button/CommonButton";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";

const MypageWithdrawalModal: React.FC<{
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  const { setModalOpen } = props;

  const [textInput, setTextInput] = useState<string>("");

  const membershipWithdrawalAction = useMembershipWithdrawal();

  const handleWithdrawal = () => {
    setTextInput("");
    if (textInput !== "회원탈퇴") {
      toast.error("회원탈퇴 문구를 다시 입력해주세요.");
      return;
    }
    membershipWithdrawalAction();
  };

  return (
    <>
      <BackgroundLayout onClick={() => setModalOpen(false)} />
      <Container>
        <Title>정말로 탈퇴하시겠습니까?</Title>
        <Description>탈퇴하시려면 회원탈퇴라고 입력해주세요.</Description>
        <Spacer size={40} />
        <Input
          placeholder={"회원탈퇴"}
          tabIndex={4}
          spellCheck={false}
          value={textInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTextInput(e.target.value)
          }
        />
        <Spacer size={40} />
        <ButtonWrapper>
          <CommonButton
            width={"90px"}
            height={"40px"}
            tabIndex={5}
            size={15}
            radius={"10px"}
            backgroundColor={"#EA3737"}
            color={"#FFFFFF"}
            onClick={handleWithdrawal}
          >
            네
          </CommonButton>
          <CommonButton
            width={"90px"}
            height={"40px"}
            tabIndex={6}
            size={15}
            radius={"10px"}
            onClick={() => setModalOpen(false)}
            backgroundColor={"#FA8125"}
            color={"#FFFFFF"}
          >
            아니요
          </CommonButton>
        </ButtonWrapper>
      </Container>
    </>
  );
};

export default MypageWithdrawalModal;

const BackgroundLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.grey, 700)};
  font-family: "PretendardBold";
  margin-bottom: 16px;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10000;
  transform: translate(-50%, -50%);
  width: 328px;
  height: fit-content;
  padding: 20px 16px;
  border: 1px solid ${({ theme }) => theme.color.border2};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
`;

const ButtonWrapper = styled.span`
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: row;
  gap: 20px;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 8px;
  padding: 10px 16px;
`;
