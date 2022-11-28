import {
  Dispatch,
  forwardRef,
  ForwardRefRenderFunction,
  SetStateAction,
} from "react";
import styled from "styled-components";
import { useDeleteProfileImage } from "../../../hooks/mypage/useDeleteProfileImage";
import { useModifyProfileImage } from "../../../hooks/mypage/useModifyProfileImage";

const ImageMenuModal: ForwardRefRenderFunction<
  HTMLDivElement,
  {
    modalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    defaultProfileImage: boolean;
  }
> = (props, ref) => {
  const { modalOpen, setModalOpen, defaultProfileImage } = props;

  const modifyProfileImageAction = useModifyProfileImage();
  const deleteProfileImageAction = useDeleteProfileImage();

  const handleModifyImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let formData = new FormData();
    if (e.target.files) {
      formData.append("file", e.target.files[0]);
      modifyProfileImageAction(formData);
      e.target.value = "";
    }
  };

  const handleDeleteImage = () => {
    setModalOpen(false);
    deleteProfileImageAction();
  };

  return (
    <Container
      modalOpen={modalOpen}
      ref={ref}
      onBlur={() => setModalOpen(false)}
      tabIndex={0}
    >
      <ImageInput
        type="file"
        accept=".jpg, .svg, .png"
        id="input-file"
        onChange={handleModifyImage}
      />
      <label htmlFor="input-file">
        <Menu>
          <Content>이미지 변경</Content>
        </Menu>
      </label>
      {!defaultProfileImage && (
        <Menu onClick={handleDeleteImage} border>
          <WarningContent>이미지 삭제</WarningContent>
        </Menu>
      )}
    </Container>
  );
};

export default forwardRef(ImageMenuModal);

const Container = styled.div<{ modalOpen: boolean }>`
  position: absolute;
  bottom: fit-content;
  left: 50px;
  background-color: ${({ theme }) => theme.color.white};
  height: fit-content;
  width: 90px;
  transform: scaleY(0);
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.border2};

  ${(props) =>
    props.modalOpen && {
      transform: "scaleY(1)",
    }}
`;

const Menu = styled.div<{ border?: boolean }>`
  ${({ theme }) => theme.mixin.flexCenter()};
  height: 38px;
  width: 100%;
  padding: 10px, 16px, 10px, 16px;
  cursor: pointer;
  border-top: ${(props) =>
    props.border && `1px solid ${props.theme.color.border2}`};
`;

const Content = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.grey90, 700)};
`;

const WarningContent = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.danger, 700)};
`;

const ImageInput = styled.input`
  display: none;
`;
