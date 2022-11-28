import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCheckOriginPassword } from "../../../hooks/mypage/useCheckOriginPassword";
import BorderButton from "../../atoms/ui/Button/BorderButton";
import PasswordInput from "../../atoms/ui/Input/PasswordInput";
import Frame from "../../molecules/ui/Frame";

const MypageOriginPassword: React.FC = () => {
  const [originInputPassword, setOriginInputPassword] = useState<string>("");
  const [passwordTypeChanged, setPasswordTypeChanged] =
    useState<boolean>(false);

  const checkOriginPasswordAction = useCheckOriginPassword(false);

  const handleCheckOriginPassword = () => {
    if (!originInputPassword) {
      toast.error("비밀번호를 입력해주세요.");
      return;
    }
    checkOriginPasswordAction(originInputPassword);
  };

  return (
    <>
      <Frame label={"기존 비밀번호"}>
        <PasswordInput
          boxWidth={"620px"}
          rBoxWidth={"230px"}
          tabIndex={4}
          placeholder="숫자, 영어, 특수문자 포함 8자 이상"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOriginInputPassword(e.target.value)
          }
          value={originInputPassword}
          onClick={() => setPasswordTypeChanged((prev) => !prev)}
          typeChanged={passwordTypeChanged}
        />
        <BorderButton onClick={handleCheckOriginPassword} tabIndex={5}>
          확인
        </BorderButton>
      </Frame>
    </>
  );
};

export default MypageOriginPassword;
