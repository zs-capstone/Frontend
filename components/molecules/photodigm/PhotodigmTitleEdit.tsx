import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useModifyPhotodigmTitle } from "../../../hooks/photodigm/useModifyPhotodigmTitle";
import { CommonButton } from "../../atoms/ui/Button/CommonButton";

const PhotodigmTitleEdit: React.FC<{
  photodigmId: number;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  defaultTitle: string;
}> = (props) => {
  const { photodigmId, setIsEdit, defaultTitle } = props;

  const modifyPhotodigmTitleAction = useModifyPhotodigmTitle();

  const [titleInput, setTitle] = useState<string>(defaultTitle);

  const handleClickButton = () => {
    if (!titleInput) {
      toast.error("제목을 입력해주세요.");
      return;
    }
    modifyPhotodigmTitleAction({ photodigmId, title: titleInput });
    setIsEdit(false);
  };

  return (
    <Container>
      <Input
        spellCheck="false"
        type="text"
        value={titleInput}
        maxLength={30}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <ButtonWrapper>
        <CommonButton
          onClick={handleClickButton}
          width={"96px"}
          height={"36px"}
          backgroundColor={"#FA8125"}
          color={"#FFFFFF"}
          radius={"12px"}
        >
          확인
        </CommonButton>
      </ButtonWrapper>
    </Container>
  );
};

export default PhotodigmTitleEdit;

const Input = styled.input`
  width: 260px;
  height: 100%;
  background: ${({ theme }) => theme.color.background};
  border-radius: 10px;
  padding: 16px;
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};

  ${({ theme }) =>
    theme.media.mobile({
      width: "calc(100% - 103px)",
    })}
`;

const Container = styled.div`
  position: relative;
  width: 363px;
  background: ${({ theme }) => theme.color.background};
  height: 50px;
  border-radius: 10px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 7px;
  bottom: 7px;
`;
