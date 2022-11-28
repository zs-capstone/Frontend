import { uniqueId } from "lodash";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import { IRouteInfosType } from "../../../../types/common";

const RestaurantProfile: React.FC<{
  imageUrl: string;
  title: string;
  address: string;
  tag: string[];
  routeInfo: IRouteInfosType;
}> = (props) => {
  const { imageUrl, title, address, tag, routeInfo } = props;

  const handleLink = () => {
    window.event?.stopPropagation();
    window.open(routeInfo.searchUrl);
  };

  return (
    <Container
      onClick={() =>
        window.open(`https://www.mangoplate.com/search/${encodeURI(title)}`)
      }
    >
      <Thumbnail src={imageUrl} alt={"추천 음식점 이미지"} />
      <TextWrapper>
        <Title>{title}</Title>
        <AddressWrapper>
          <Image
            src={iconUrl("marker_grey")}
            height={14}
            width={14}
            alt={"추천 음식점 주소 아이콘"}
          />
          <Address>{address}</Address>
        </AddressWrapper>
        <RouteInfoWrapper onClick={handleLink}>
          <RouteInfoText>{routeInfo.distance}</RouteInfoText>
          <ImageContainer>
            <Image
              src={iconUrl("car")}
              width={14}
              height={14}
              alt={"추천 음식점 장소간 거리 아이콘"}
            />
          </ImageContainer>
          <RouteInfoText>{routeInfo.car}</RouteInfoText>
          <ImageContainer>
            <Image
              src={iconUrl("walk")}
              width={14}
              height={14}
              alt={"추천 음식점 장소간 거리 아이콘"}
            />
          </ImageContainer>
          <RouteInfoText>{routeInfo.walk}</RouteInfoText>
        </RouteInfoWrapper>
        <TagContainer>
          {tag.slice(0, 3).map((item, index) => (
            <TagWrapper key={uniqueId(index.toString())}>
              <Tag>{item}</Tag>
            </TagWrapper>
          ))}
        </TagContainer>
      </TextWrapper>
    </Container>
  );
};

export default RestaurantProfile;

const Container = styled.div`
  width: 440px;
  height: 124px;
  padding: 12px 0px;
  background: ${({ theme }) => theme.color.white};
  border-bottom: 1px solid ${({ theme }) => theme.color.border1};
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  cursor: pointer;

  ${({ theme }) =>
    theme.media.mobile({
      width: "328px",
    })}
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  object-fit: cover;
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

const AddressWrapper = styled.span`
  display: flex;
  flex-direction: row;
`;

const Address = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(12, theme.color.grey60)};
  margin-left: 4px;
  max-width: 318px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "190px",
    })}
`;

const TagWrapper = styled.div`
  width: fit-content;
  height: 20px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.border2};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  border-radius: 48px;
  padding: 3px 12px;
  ${({ theme }) => theme.mixin.flexCenter()};
`;

const Tag = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(11, theme.color.grey90)};

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "38px",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    })}
`;

const TagContainer = styled.span`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  column-gap: 4px;
`;

const RouteInfoWrapper = styled.span`
  position: relative;
  z-index: 9999;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  margin-top: 8px;
  height: 20px;
  border-radius: 56px;
  padding: 0px 10px;
  background-color: ${({ theme }) => theme.color.background};
  cursor: pointer;
`;

const RouteInfoText = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(11, theme.color.grey60)};
`;

const ImageContainer = styled.div`
  margin: 0 4px;
  display: flex;
`;
