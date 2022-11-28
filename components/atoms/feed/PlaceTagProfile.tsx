import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";

export const PlaceTagProfile: React.FC<{
  imageUrl: string;
  title: string;
  address: string;
  placeId: number;
  setAddedPlaceList: Dispatch<SetStateAction<number[]>>;
}> = (props) => {
  const { imageUrl, title, address, placeId, setAddedPlaceList } = props;

  const handleButtonClick = () => {
    setAddedPlaceList((prev) => prev.filter((item) => item !== placeId));
  };

  return (
    <Container>
      <Thumbnail src={imageUrl} alt={"여행지 태그 추가된 여행지 이미지"} />
      <TextWrapper>
        <Title>{title}</Title>
        <Address>{address}</Address>
      </TextWrapper>
      <ImageWrapper>
        <Image
          src={iconUrl("close")}
          width={20}
          height={20}
          onClick={handleButtonClick}
          alt={"여행지 태그 추가된 여행지 삭제 아이콘"}
        />
      </ImageWrapper>
    </Container>
  );
};

export const DetailPlaceTagProfile: React.FC<{
  imageUrl: string;
  title: string;
  address: string;
  placeId: number;
}> = (props) => {
  const { imageUrl, title, address, placeId } = props;

  return (
    <Link href={`/travel/place/detail/${placeId}`}>
      <a>
        <DetailContainer>
          <Thumbnail src={imageUrl} alt={"여행지 태그 추가된 여행지 이미지"} />
          <TextWrapper>
            <Title>{title}</Title>
            <DetailAddress>{address}</DetailAddress>
          </TextWrapper>
        </DetailContainer>
      </a>
    </Link>
  );
};

const DetailContainer = styled.div`
  display: flex;
  width: 472px;
  height: 90px;
  padding: 12px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border1};
  border-radius: 3px;
  position: relative;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "328px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const Container = styled.div`
  display: flex;
  width: 328px;
  height: 90px;
  padding: 12px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border1};
  border-radius: 3px;
  position: relative;

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const Thumbnail = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 4px;
`;

const TextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  margin-bottom: 8px;
`;

const Address = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
  max-width: 200px;

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "calc(100% - 20px)",
    })}
`;

const DetailAddress = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
`;

const ImageWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;
