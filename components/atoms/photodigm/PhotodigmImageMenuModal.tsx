import {
  Dispatch,
  forwardRef,
  ForwardRefRenderFunction,
  SetStateAction,
} from "react";
import { UseMutateFunction } from "react-query";
import styled from "styled-components";
import { IDeletePhotodigmPictureType } from "../../../types/photodigm";

const PhotodigmImageMenuModal: ForwardRefRenderFunction<
  HTMLDivElement,
  {
    deletePhotodigmPictureAction: UseMutateFunction<
      void,
      unknown,
      IDeletePhotodigmPictureType,
      unknown
    >;
    modifyPhotodigmPictureAction: UseMutateFunction<
      void,
      unknown,
      FormData,
      unknown
    >;
    modalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    photodigmId: number;
    picture: string | null;
    pictureId: number;
  }
> = (props, ref) => {
  const {
    deletePhotodigmPictureAction,
    modifyPhotodigmPictureAction,
    modalOpen,
    setModalOpen,
    photodigmId,
    picture,
    pictureId,
  } = props;

  const handleModifyImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let formData = new FormData();
    if (e.target.files) {
      formData.append(
        "photodigmId",
        new Blob([JSON.stringify(photodigmId)], { type: "application/json" })
      );
      if (pictureId === 1) {
        formData.append("picture1", e.target.files[0]);
      } else if (pictureId === 2) {
        formData.append("picture2", e.target.files[0]);
      } else if (pictureId === 3) {
        formData.append("picture3", e.target.files[0]);
      } else if (pictureId === 4) {
        formData.append("picture4", e.target.files[0]);
      }
      modifyPhotodigmPictureAction(formData);
      e.target.value = "";
      setModalOpen(false);
    }
  };

  const handleDeleteImage = () => {
    setModalOpen(false);
    deletePhotodigmPictureAction({
      photodigmId,
      target: pictureId,
    });
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
        id={`input-file${pictureId}`}
        onChange={handleModifyImage}
      />
      <label htmlFor={`input-file${pictureId}`}>
        <Menu>
          <Content>이미지 변경</Content>
        </Menu>
      </label>
      {picture && (
        <Menu onClick={handleDeleteImage} border>
          <WarningContent>이미지 삭제</WarningContent>
        </Menu>
      )}
    </Container>
  );
};

export default forwardRef(PhotodigmImageMenuModal);

const Container = styled.div<{ modalOpen: boolean }>`
  position: absolute;
  right: -40px;
  bottom: 0px;
  z-index: 9999;
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

  ${({ theme }) =>
    theme.media.tabletUnder({
      right: "40px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "80px",
      right: 0,
      top: "40px",
    })}
`;

const ImageInput = styled.input`
  display: none;
`;

const Menu = styled.div<{ border?: boolean }>`
  ${({ theme }) => theme.mixin.flexCenter()};
  height: 38px;
  width: 100%;
  padding: 10px, 16px, 10px, 16px;
  cursor: pointer;
  border-top: ${(props) =>
    props.border && `1px solid ${props.theme.color.border2}`};

  ${({ theme }) =>
    theme.media.mobile({
      height: "32px",
    })}
`;

const Content = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.grey90, 700)};

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: "12px",
    })}
`;

const WarningContent = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.danger, 700)};

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: "12px",
    })}
`;
