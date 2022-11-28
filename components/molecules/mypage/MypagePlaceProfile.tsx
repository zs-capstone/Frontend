import Link from "next/link";
import styled from "styled-components";
import { IPlaceListDataType } from "../../../types/common";
import Image from "next/image";
import Likes from "../../atoms/main/Likes";
import { iconUrl } from "../../../axiosInstance/constants";

const MypagePlaceProfile: React.FC<Partial<IPlaceListDataType>> = (props) => {
  const { placeId, title, imageUrl, address, hasLiked, likeCount } = props;

  return (
    <Link href={`/travel/place/detail/${placeId}`}>
      <a>
        <Container>
          <ImageContainer>
            <Thumbnail
              src={imageUrl}
              alt={"마이페이지 좋아요한 여행지 노트 메뉴 여행지 썸네일"}
            />
            <Title>{title}</Title>
            <LikesWrapper>
              <Likes hasLiked={hasLiked || false} likeCount={likeCount || 0} />
            </LikesWrapper>
          </ImageContainer>
          <AddressWrapper>
            <Image
              src={iconUrl("marker_grey")}
              width={14}
              height={14}
              alt={"마이페이지 좋아요한 여행지 노트 메뉴 마커 아이콘"}
            />
            <Address>{address}</Address>
          </AddressWrapper>
        </Container>
      </a>
    </Link>
  );
};

export default MypagePlaceProfile;

const Container = styled.div`
  width: 226px;
  height: 206px;
  border: 1px solid ${({ theme }) => theme.color.border1};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 4px;
  position: relative;
  z-index: -2;
  overflow: hidden;

  ${({ theme }) =>
    theme.media.mobile({
      width: "156px",
      height: "206px",
    })}
`;

const Thumbnail = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const ImageContainer = styled.div`
  width: 226px;
  height: 130px;
  position: relative;
  box-shadow: inset 0px -50px 100px ${({ theme }) => theme.color.grey80};

  ${({ theme }) =>
    theme.media.mobile({
      width: "156px",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.white, 700)};
  position: absolute;
  left: 12px;
  bottom: 16px;
  max-width: 202px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "132px",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    })}
`;

const AddressWrapper = styled.span`
  display: flex;
  flex-direction: row;
  margin: 12px 0 0 12px;
  align-items: baseline;
`;

const Address = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
  margin-left: 4px;
  max-width: 180px;
  line-height: 18px;

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "120px",
      overflow: "hidden",
    })}
`;

const LikesWrapper = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
`;
