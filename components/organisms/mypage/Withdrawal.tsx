import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useCheckOriginPassword } from "../../../hooks/mypage/useCheckOriginPassword";
import { withdrawalPasswordCheckedState } from "../../../stores/Auth";
import BorderButton from "../../atoms/ui/Button/BorderButton";
import SubmitButton from "../../atoms/ui/Button/SubmitButton";
import PasswordInput from "../../atoms/ui/Input/PasswordInput";
import MypageWithdrawalModal from "../../molecules/mypage/MypageWithdrawalModal";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";
import MypageWarning from "../../molecules/mypage/MypageWarning";

const Withdrawal: React.FC = () => {
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordTypeChanged, setPasswordTypeChanged] =
    useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [withdrawalPasswordChecked, setWithdrawalPasswordChecked] =
    useRecoilState<boolean>(withdrawalPasswordCheckedState);

  const checkOriginPasswordAction = useCheckOriginPassword(true);

  const handleCheckOriginPassword = () => {
    if (!passwordInput) {
      toast.error("비밀번호를 입력해주세요.");
      return;
    }
    checkOriginPasswordAction(passwordInput);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordInput("");
    setWithdrawalPasswordChecked(false);
    setModalOpen(true);
  };

  useEffect(() => {
    return () => {
      setWithdrawalPasswordChecked(false);
      toast.dismiss();
    };
  }, [setWithdrawalPasswordChecked]);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Title>여러다임 회원 탈퇴 시 주의사항</Title>
        <MypageWarning
          content={
            "1. 탈퇴 및 가입을 반복할 경우, 서비스 약용 방지를 위해 재가입이 제한됩니다."
          }
        />
        <MypageWarning
          content={
            "2. 탈퇴 후 개인 정보 등의 데이터가 삭제되며, 복구 할 수 없습니다."
          }
        />
        <MypageWarning
          content={"3. 작성한 게시물이나 댓글은 삭제되지 않습니다."}
        />
        <MypageWarning
          content={"4.자세한 내용은 개인정보처리방침을 확인해주세요."}
        />
        <Spacer size={16} />
        <Wrapper>
          <PasswordInput
            boxWidth={"100%"}
            mBoxWidth={"230px"}
            tabIndex={1}
            placeholder="비밀번호를 입력해주세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPasswordInput(e.target.value)
            }
            value={passwordInput}
            onClick={() => setPasswordTypeChanged((prev) => !prev)}
            typeChanged={passwordTypeChanged}
          />
          <Spacer size={8} axis={"horizontal"} />
          <BorderButton onClick={handleCheckOriginPassword} tabIndex={2}>
            확인
          </BorderButton>
        </Wrapper>
        <Spacer size={41} />
        <SubmitButton tabIndex={3} disabled={!withdrawalPasswordChecked} danger>
          탈퇴하기
        </SubmitButton>
      </form>
      {modalOpen && <MypageWithdrawalModal setModalOpen={setModalOpen} />}
    </Container>
  );
};

export default Withdrawal;

const Container = styled.span`
  ${({ theme }) =>
    theme.media.mobile({
      marginTop: "40px",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.grey, 700)};
  font-family: "PretendardBold";
  margin-bottom: 16px;
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
