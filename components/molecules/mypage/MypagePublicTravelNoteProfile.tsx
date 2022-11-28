import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";
import { ITravelNoteProfileListDataType } from "../../../types/common";
import Likes from "../../atoms/main/Likes";
import CommentBox from "../../atoms/mypage/CommentBox";

const MypagePublicTravelNoteProfile: React.FC<ITravelNoteProfileListDataType> =
  (props) => {
    const {
      travelNoteId,
      title,
      thumbnail,
      region,
      period,
      hasLiked,
      likeCount,
      placeCount,
      commentCount,
    } = props;

    return (
      <Link href={`/travel/making-note/detail/${travelNoteId}`}>
        <a>
          <Container>
            <ImageContainer>
              <Thumbnail
                src={thumbnail}
                alt={"마이페이지 좋아요한 여행 노트 메뉴 노트 이미지"}
              />
              <LikesWrapper>
                <Likes hasLiked={hasLiked} likeCount={likeCount} />
              </LikesWrapper>
              <Title>{title}</Title>
            </ImageContainer>
            <TextWrapper>
              <Image
                src={iconUrl("flag")}
                width={14}
                height={14}
                alt={
                  "마이페이지 좋아요한 여행 노트 여행지 갯수를 나타내는 아이콘"
                }
              />
              <Text>{placeCount}개의 여행지</Text>
            </TextWrapper>
            <TextWrapper>
              <Image
                src={iconUrl("marker_grey")}
                width={14}
                height={14}
                alt={
                  "마이페이지 좋아요한 여행 노트 여행지 지역을 나타내는 아이콘"
                }
              />
              <Text>{region.join(" / ")}</Text>
            </TextWrapper>
            <CommentBoxWrapper>
              <CommentBox commentCount={commentCount} />
            </CommentBoxWrapper>
          </Container>
        </a>
      </Link>
    );
  };

export default MypagePublicTravelNoteProfile;

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
    })}
`;

const LikesWrapper = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const TextWrapper = styled.span`
  display: flex;
  flex-direction: row;
  margin: 12px 0 0 12px;
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
  margin-left: 4px;
  max-width: 176px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "112px",
    })}
`;

const CommentBoxWrapper = styled.span`
  position: absolute;
  right: 12px;
  bottom: 40px;

  ${({ theme }) =>
    theme.media.mobile({
      display: "none",
    })}
`;
