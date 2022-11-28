import html2canvas from "html2canvas";
import { useRef } from "react";
import Image from "next/image";
import styled from "styled-components";
import { toast } from "react-toastify";
import { iconUrl } from "../../../axiosInstance/constants";

const PhotodigmMainPicture: React.FC<{ imageUrl: string }> = (props) => {
  const { imageUrl } = props;

  const imageRef = useRef<HTMLImageElement>(null);

  const handleCaptureCanvas = () => {
    if (imageRef.current) {
      html2canvas(imageRef.current, { useCORS: true }).then((canvas) =>
        handleSaveCanvas(canvas.toDataURL("image/png"), "photodigm.png")
      );
    }
  };

  const handleSaveCanvas = (uri: string, filename: string) => {
    toast.info("일부 브라우저에서는 다운로드가 제한될 수 있습니다.");
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <MainImage
        crossOrigin="anonymous"
        ref={imageRef}
        src={`${imageUrl}?${Date.now()}`}
        alt={"렌더링 된 포토다임 프레임"}
      />
      <ButtonWrapper onClick={handleCaptureCanvas} type="button">
        <Image
          src={iconUrl("download")}
          width={24}
          height={24}
          alt={"테스트"}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default PhotodigmMainPicture;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  ${({ theme }) =>
    theme.media.mobile({
      flexDirection: "column-reverse",
      alignItems: "center",
    })}
`;

const MainImage = styled.img`
  width: min(100%, 650px);
  height: fit-content;
`;

const ButtonWrapper = styled.button`
  ${({ theme }) => theme.mixin.flexCenter()};
  background-color: ${({ theme }) => theme.color.main50};
  border-radius: 10px;
  min-width: 50px;
  height: 50px;
  margin-left: 16px;
  cursor: pointer;

  ${({ theme }) =>
    theme.media.mobile({
      marginLeft: "0",
      minWidth: "0",
      width: "38px",
      height: "38px",
      marginBottom: "24px",
    })}
`;
