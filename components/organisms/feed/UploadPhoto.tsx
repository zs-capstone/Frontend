import { uniqueId } from "lodash";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import styled from "styled-components";
import PhotoAddButton from "../../atoms/ui/Button/PhotoAddButton";
import { iconUrl } from "../../../axiosInstance/constants";

const UploadPhoto: React.FC<{
  setFiles: Dispatch<SetStateAction<File[]>>;
  uploadImages: string[];
  setUploadImages: Dispatch<SetStateAction<string[]>>;
  setApiImages?: Dispatch<SetStateAction<string[]>>;
}> = (props) => {
  const { setFiles, uploadImages, setUploadImages, setApiImages } = props;

  const handleRemoveImage = (targetImage: string, idx: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file !== prevFiles[idx])
    );
    setUploadImages((prevImages) =>
      prevImages.filter((image) => image != targetImage)
    );
    if (setApiImages) {
      setApiImages((prevImages) =>
        prevImages.filter((image) => image != targetImage)
      );
      setFiles((prevFiles) =>
        prevFiles.filter(
          (file) => file !== prevFiles[idx - uploadImages.length + 1]
        )
      );
    }
  };

  return (
    <Container>
      <Title>사진</Title>
      <Description>사진은 10개까지 등록 가능합니다.</Description>
      <ImagesWrapper>
        <PhotoAddButton
          setUploadImages={setUploadImages}
          setFiles={setFiles}
          uploadImages={uploadImages}
        />
        {uploadImages.map((image, idx) => (
          <ImageContainer key={uniqueId(idx.toString())}>
            <FeedImage src={image} alt={"사용자가 피드에 추가할 이미지"} />
            <CloseImageWrapper>
              <Image
                onClick={() => handleRemoveImage(image, idx)}
                src={iconUrl("close_red")}
                alt={"사용자가 피드에 추가한 이미지 삭제하는 아이콘"}
                width={24}
                height={24}
              />
            </CloseImageWrapper>
          </ImageContainer>
        ))}
      </ImagesWrapper>
    </Container>
  );
};

export default UploadPhoto;

const Container = styled.div`
  margin: 26px 140px;
  display: flex;
  flex-direction: column;

  ${({ theme }) =>
    theme.media.tabletUnder({
      margin: "26px 16px",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
  margin-bottom: 17px;
`;

const FeedImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
`;

const ImagesWrapper = styled.span`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  row-gap: 15px;
  column-gap: 10px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 88px;
  height: 88px;
`;

const CloseImageWrapper = styled.button`
  cursor: pointer;
  background-color: transparent;
  position: absolute;
  right: 0px;
  top: 0px;
  transform: translate(50%, -50%);
  width: 24px;
  height: 24px;
`;
