import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";
import { IFeedListDataType } from "../../../types/board";

const FeedProfile: React.FC<IFeedListDataType> = (props) => {
  const {
    memberId,
    profileImage,
    boardId,
    text,
    nickname,
    thumbnail,
    singleImage,
    dateTime,
    hasLiked,
    likeCount,
    commentCount,
  } = props;

  return (
    <Link href={`/feed/detail/${boardId}`}>
      <a>
        <Container>
          <ThumbnailWrapper>
            <Thumbnail src={thumbnail} alt={"피드 페이지 피드 썸네일"} />
            {!singleImage && (
              <ImageWrapper>
                <Image
                  src={iconUrl("multiple_page")}
                  width={20}
                  height={20}
                  alt={"피드 내 사진이 여러장일 경우 보여주는 아이콘"}
                />
              </ImageWrapper>
            )}
          </ThumbnailWrapper>
          <ProfileWrapper>
            <ProfileImage
              src={profileImage}
              alt={"피드 작성한 사용자의 프로필 이미지"}
            />
            <ProfileTextWrapper>
              <Nickname>{nickname}</Nickname>
              <DateTime>{dateTime}</DateTime>
            </ProfileTextWrapper>
          </ProfileWrapper>
          <Text>{text}</Text>
          <FeedbackWrapper>
            {hasLiked ? (
              <Image
                src={iconUrl("heart_filled")}
                alt={"내가 좋아요를 누르지 않은 피드 아이콘"}
                width={14}
                height={14}
              />
            ) : (
              <Image
                src={iconUrl("heart_grey")}
                alt={"내가 좋아요를 누르지 않은 피드 아이콘"}
                width={14}
                height={14}
              />
            )}
            <FeedbackText>{likeCount}</FeedbackText>
            <Image
              src={iconUrl("comment_grey")}
              alt={"내가 좋아요를 누르지 않은 피드 아이콘"}
              width={14}
              height={14}
            />
            <FeedbackText>{commentCount}</FeedbackText>
          </FeedbackWrapper>
        </Container>
      </a>
    </Link>
  );
};

export default FeedProfile;

const Container = styled.div`
  width: 226px;
  height: fit-content;

  ${({ theme }) =>
    theme.media.mobile({
      width: "155px",
    })}
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 226px;
  height: 226px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "155px",
      height: "155px",
    })}
`;

const Thumbnail = styled.img`
  width: 226px;
  height: 226px;
  border-radius: 7px;
  object-fit: cover;

  ${({ theme }) =>
    theme.media.mobile({
      width: "155px",
      height: "155px",
    })}
`;

const ImageWrapper = styled.span`
  position: absolute;
  top: 10px;
  right: 14px;

  ${({ theme }) =>
    theme.media.mobile({
      right: "10px",
    })}
`;

const ProfileWrapper = styled.span`
  display: flex;
  flex-direction: row;
  margin: 16px 0 24px;
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 100%;
  object-fit: cover;
`;

const ProfileTextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 7px;
`;

const Nickname = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};
  margin-bottom: 4px;
`;

const DateTime = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(12, theme.color.grey60)};
`;

const Text = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;

  font-size: ${({ theme }) =>
    theme.mixin.fontSize(13, theme.color.grey70, 400)};
`;

const FeedbackWrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

const FeedbackText = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
  margin: 0 12px 0px 8px;
`;
