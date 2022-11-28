import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useCheckDupNickname } from "../../../hooks/auth/useCheckDupNickname";
import { useNicknameLogic } from "../../../hooks/logic/useNicknameLogic";
import { useChangeNickname } from "../../../hooks/mypage/useChangeNickname";
import { nicknameCheckedState } from "../../../stores/Auth";
import Alert from "../../atoms/ui/Alert/Alert";
import BorderButton from "../../atoms/ui/Button/BorderButton";
import SubmitButton from "../../atoms/ui/Button/SubmitButton";
import TextInput from "../../atoms/ui/Input/TextInput";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";
import Frame from "../../molecules/ui/Frame";

const MypageNickname: React.FC = () => {
  const [inputNickname, setInputNickname] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [isNicknameChecked, setIsNicknameChecked] =
    useRecoilState<boolean>(nicknameCheckedState);

  const changeNicknameAction = useChangeNickname(inputNickname);

  const {
    nicknameAlert,
    setNicknameAlert,
    handleInputNicknameChange,
    handleCheckInputNickname,
  } = useNicknameLogic(setIsNicknameChecked, setInputNickname, inputNickname);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    changeNicknameAction(inputNickname);
    setInputNickname("");
    setIsNicknameChecked(false);
    setNicknameAlert({ type: "", content: "" });
  };

  useEffect(() => {
    if (isNicknameChecked) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [isNicknameChecked]);

  return (
    <form onSubmit={handleSubmitForm}>
      <Frame label={"닉네임"} gap={"8px"}>
        <TextInput
          value={inputNickname}
          onChange={handleInputNicknameChange}
          rWidth={"230px"}
          width={"620px"}
          height={"50px"}
          tabIndex={1}
          placeholder={"영어, 한글, 숫자 조합 최대 12자"}
        />
        <BorderButton onClick={handleCheckInputNickname} tabIndex={2}>
          중복확인
        </BorderButton>
      </Frame>
      {nicknameAlert.content && (
        <Alert iconType={nicknameAlert.type} content={nicknameAlert.content} />
      )}
      <Spacer size={30} />
      <ButtonWrapper>
        <SubmitButton disabled={buttonDisabled} tabIndex={3}>
          닉네임 변경하기
        </SubmitButton>
      </ButtonWrapper>
    </form>
  );
};

export default MypageNickname;

const ButtonWrapper = styled.span`
  display: flex;
  justify-content: center;
`;
