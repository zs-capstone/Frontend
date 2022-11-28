import Image from "next/image";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";
import { useCreateNewPhotodigm } from "../../../hooks/photodigm/useCreateNewPhotodigm";
import BorderButton from "../../atoms/ui/Button/BorderButton";

const PhotodigmLink: React.FC = () => {
  const { mutate: createNewPhotodigmAction, isLoading } =
    useCreateNewPhotodigm();

  const handleButtonClick = () => {
    createNewPhotodigmAction();
  };

  return (
    <Container>
      <Title>포토다임 만들기</Title>
      <Description>
        여러분만의 여행 추억을 <br /> 네컷사진으로 남겨보세요
      </Description>
      {isLoading ? (
        <ClipLoader color={"#FFFFFF"} />
      ) : (
        <BorderButton
          onClick={handleButtonClick}
          width={"79px"}
          height={"32px"}
          padding={"6px 12px"}
          radius={"7px"}
          fontFamily={"PretendardBold"}
          shadow
        >
          만들기
        </BorderButton>
      )}
      <ImageContainer>
        <Image
          src={
            "https://yeoreodigm-s3.s3.ap-northeast-2.amazonaws.com/assets/icons/photodigm.webp"
          }
          width={165}
          height={176}
          alt={"메인 페이지 포토다임 예시 아이콘"}
        />
      </ImageContainer>
    </Container>
  );
};

export default PhotodigmLink;

const Container = styled.div`
  position: relative;
  width: 390px;
  height: 240px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.photo};
  padding: 22px 0 0 22px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "327px",
      height: "160px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(24, theme.color.white, 700)};
  margin-bottom: 12px;
  font-family: "PretendardBold";

  ${({ theme }) =>
    theme.media.tabletUnder({
      fontSize: "20px",
      marginBottom: "10px",
    })}
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.white, 400)};
  margin-bottom: 24px;
  line-height: 28px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      fontSize: "14px",
      lineHeight: "18px",
      marginBottom: "16px",
    })}
`;

const ImageContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 5px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "128px",
      height: "135px",
    })}
`;
