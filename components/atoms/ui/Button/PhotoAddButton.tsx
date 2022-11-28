import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";

const PhotoAddButton: React.FC<{
  setUploadImages: Dispatch<SetStateAction<string[]>>;
  uploadImages: string[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}> = (props) => {
  const { setUploadImages, uploadImages, setFiles } = props;

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (uploadImages.length >= 10) {
      toast.error("사진은 최대 10개까지 등록 가능합니다.");
      return;
    }

    e.preventDefault();
    if (e.target.files) {
      const uploadImagesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadImages((prevImages) => prevImages.concat(uploadImagesArray));
      const filesArray = Array.from(e.target.files);
      setFiles((prevFiles) => prevFiles.concat(filesArray));
      e.target.value = "";
    }
  };

  return (
    <>
      <ImageInput
        type="file"
        accept=".jpg, .svg, .png"
        id="input-file"
        onChange={handleAddImage}
      />
      <Label htmlFor="input-file">
        <ImageWrapper>
          <Image
            src={iconUrl("camera")}
            width={24}
            height={24}
            alt={"피드 사진 업로드하는 버튼"}
          />
          <Title>사진 추가</Title>
        </ImageWrapper>
      </Label>
    </>
  );
};

export default PhotoAddButton;

const Label = styled.label`
  width: 88px;
  height: 88px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 100%;
  border-radius: 6px;
  height: 100%;
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.color.grey30};
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
  margin-top: 8px;
`;

const ImageInput = styled.input`
  display: none;
`;
