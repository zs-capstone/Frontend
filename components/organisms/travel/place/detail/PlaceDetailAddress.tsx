import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../../axiosInstance/constants";
import { DetailPlaceKakaoMap } from "../../../../atoms/travel/making-note/KakaoMap";

const PlaceDetailAddress: React.FC<
  Partial<{
    selectedLanguage: string;
    address: string;
    latitude: number;
    longitude: number;
  }>
> = (props) => {
  const { address, latitude, longitude, selectedLanguage } = props;

  const [travelLocation, setTravelLocation] = useState<string>("");

  useEffect(() => {
    if (selectedLanguage === "ko") {
      setTravelLocation("여행지 위치");
    } else if (selectedLanguage === "en") {
      setTravelLocation("Travel Location");
    } else {
      setTravelLocation("旅游地点");
    }
  }, [selectedLanguage]);

  return (
    <Container>
      <Title>{travelLocation}</Title>
      <AddressWrapper>
        <Image
          src={iconUrl("marker_grey")}
          width={20}
          height={20}
          alt={"여행지 상세 페이지 마커 아이콘"}
        />
        <Address>{address}</Address>
      </AddressWrapper>
      <KakaoMapWrapper>
        <DetailPlaceKakaoMap
          latitude={latitude}
          longitude={longitude}
          width={"964px"}
          height={"457px"}
          rWidth={"674px"}
          rHeight={"256px"}
        />
      </KakaoMapWrapper>
    </Container>
  );
};

export default PlaceDetailAddress;

const Container = styled.div`
  width: 964px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      maxWidth: "674px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "100%",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin-bottom: 16px;

  ${({ theme }) =>
    theme.media.mobile({
      paddingLeft: "16px",
    })}
`;

const AddressWrapper = styled.span`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;

  ${({ theme }) =>
    theme.media.mobile({
      paddingLeft: "16px",
    })}
`;

const Address = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey60)};
  margin-left: 4px;
`;

const KakaoMapWrapper = styled.div`
  ${({ theme }) =>
    theme.media.mobile({
      padding: "0 16px",
    })}
`;
