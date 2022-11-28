import Image from "next/image";
import { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";
import { useDeletePhotodigmPicture } from "../../../hooks/photodigm/useDeletePhotodigmPicture";
import { useModifyPhotodigmPicture } from "../../../hooks/photodigm/useModifyPhotodigmPicture";
import PhotodigmImageMenuModal from "../../atoms/photodigm/PhotodigmImageMenuModal";

const PhotodigmPictureSelectBox: React.FC<{
  photodigmId: number;
  pictureId: number;
  picture: string | null;
}> = (props) => {
  const { photodigmId, pictureId, picture } = props;

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setModalOpen((prev) => !prev);
    if (modalRef.current) {
      modalRef.current.focus();
    }
  };

  const { mutate: deletePhotodigmPictureAction, isLoading: isDeleteLoading } =
    useDeletePhotodigmPicture();
  const { mutate: modifyPhotodigmPictureAction, isLoading: isModifyLoading } =
    useModifyPhotodigmPicture();

  return (
    <Container last={pictureId === 4}>
      {isModifyLoading || isDeleteLoading ? (
        <ClipLoader color={"#FA8125"} />
      ) : picture ? (
        <PictureImage
          onClick={handleButtonClick}
          src={picture}
          alt={"사용자가 포토다임 프레임에 삽입한 이미지"}
        />
      ) : (
        <>
          <InputBox onClick={handleButtonClick}>
            <Image
              src={iconUrl("image_gallery")}
              alt={"포토다임 프레임에 사진을 넣을 수 있는 아이콘"}
              width={24}
              height={24}
            />
          </InputBox>
        </>
      )}
      <PhotodigmImageMenuModal
        modifyPhotodigmPictureAction={modifyPhotodigmPictureAction}
        deletePhotodigmPictureAction={deletePhotodigmPictureAction}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        photodigmId={photodigmId}
        pictureId={pictureId}
        picture={picture}
        ref={modalRef}
      />
    </Container>
  );
};

export default PhotodigmPictureSelectBox;

const Container = styled.div<{ last: boolean }>`
  position: relative;
  width: 100%;
  height: 120px;
  ${({ theme }) => theme.mixin.flexCenter()};

  background: ${({ theme }) => theme.color.white};

  border-bottom: 1px solid ${({ theme }) => theme.color.grey20};

  ${(props) =>
    props.last && {
      borderBottom: "none",
      borderBottomLeftRadius: "11px",
      borderBottomRightRadius: "11px",
    }}

  ${({ theme }) =>
    theme.media.tabletUnder({
      borderBottom: "none",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
      height: "72px",
    })}
`;

const InputBox = styled.button`
  cursor: pointer;
  width: 88px;
  height: 88px;
  background-color: ${({ theme }) => theme.color.grey10};
  ${({ theme }) => theme.mixin.flexCenter()};

  border: 1px solid ${({ theme }) => theme.color.border1};
  border-radius: 4px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "56px",
      height: "56px",
    })}
`;

const PictureImage = styled.img`
  cursor: pointer;
  height: 88px;
  width: 88px;
  border-radius: 4px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "56px",
      height: "56px",
    })}
`;
