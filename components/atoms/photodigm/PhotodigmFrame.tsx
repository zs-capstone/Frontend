import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { useModifyPhotodigmFrame } from "../../../hooks/photodigm/useModifyPhotodigmFrame";

const PhotodigmFrame: React.FC<{
  imageUrl: string;
  selectedId: number;
  frameId: number;
  photodigmId: number;
}> = (props) => {
  const { imageUrl, selectedId, photodigmId, frameId } = props;

  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (selectedId === frameId) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedId, frameId]);

  const { mutate: modifyPhotodigmFrameAction, isLoading } =
    useModifyPhotodigmFrame();

  const handleImageClick = () => {
    modifyPhotodigmFrameAction({
      photodigmId,
      frameId,
    });
  };

  return (
    <>
      {isLoading ? (
        <LoaderWrapper>
          <ClipLoader color={"#FA8125"} />
        </LoaderWrapper>
      ) : (
        <ImageWrapper isSelected={isSelected}>
          <Image
            src={imageUrl}
            alt={"포토다임 프레임 이미지"}
            onClick={handleImageClick}
          />
        </ImageWrapper>
      )}
    </>
  );
};

export default PhotodigmFrame;

const ImageWrapper = styled.div<{ isSelected: boolean }>`
  ${({ theme }) => theme.mixin.flexCenter()};
  min-width: 88px;
  min-height: 88px;
  border-radius: 4px;

  ${(props) =>
    props.isSelected && {
      border: `4px solid ${props.theme.color.secondary60}`,
      boxSizing: "content-box",
    }}
`;

const Image = styled.img`
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 4px;
`;

const LoaderWrapper = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  min-width: 80px;
  min-height: 80px;
`;
