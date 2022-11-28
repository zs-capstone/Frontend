import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import { useChangeFeedCommentLikeState } from "../../../../hooks/board/detail/useChangeFeedCommentLikeState";
import { useDeleteFeedComment } from "../../../../hooks/board/detail/useDeleteFeedComment";
import { useChangeTravelNoteDetailCommentLikeState } from "../../../../hooks/travel/making-note/detail/useChangeTravelNoteDetailCommentLikeState";
import { useDeleteTravelNoteDetailComment } from "../../../../hooks/travel/making-note/detail/useDeleteTravelNoteDetailComment";
import { useDeleteComment } from "../../../../hooks/travel/making-note/useDeleteComment";
import { useChangePlaceDetailCommentLikeState } from "../../../../hooks/travel/place/useChangePlaceDetailCommentLikeState";
import { useDeletePlaceDetailComment } from "../../../../hooks/travel/place/useDeletePlaceDetailComment";
import { IFeedCommentType } from "../../../../types/board/detail";
import { IMakingNoteCommentType } from "../../../../types/note";
import { IDetailCommentsType } from "../../../../types/note/detail";

export const MakingNoteComment: React.FC<
  IMakingNoteCommentType & { makingNoteId: number; day: number }
> = (props) => {
  const {
    day,
    makingNoteId,
    commentId,
    text,
    memberId,
    profileImageUrl,
    nickname,
    mine,
    isModified,
    dateTime,
  } = props;

  const deleteCommentAction = useDeleteComment(makingNoteId, day);

  const handleDeleteComment = () => {
    deleteCommentAction(commentId);
  };

  return (
    <Container>
      <Link href={`/member/${memberId}`}>
        <a>
          <ProfileImage
            src={`${profileImageUrl}?${performance.now()}`}
            alt={"여행 메이킹 노트 댓글 남긴 사람의 프로필 사진"}
          />
        </a>
      </Link>
      <Wrapper>
        <TextWrapper>
          <Link href={`/member/${memberId}`}>
            <a>
              <Nickname>{nickname}</Nickname>
            </a>
          </Link>
          <Text>{text}</Text>
          <Date>{dateTime}</Date>
        </TextWrapper>
        {mine && (
          <ImageContainer>
            <Image
              onClick={handleDeleteComment}
              src={iconUrl("close")}
              width={20}
              height={20}
              alt={"여행 메이킹 노트 댓글 삭제 아이콘"}
            />
          </ImageContainer>
        )}
      </Wrapper>
    </Container>
  );
};

export const MakingNoteDetailComment: React.FC<
  IDetailCommentsType & { travelNoteId: number }
> = (props) => {
  const {
    travelNoteId,
    commentId,
    memberId,
    nickname,
    profileImageUrl,
    text,
    mine,
    hasModified,
    dateTime,
    hasLiked,
    likeCount,
  } = props;

  const changeTravelNoteDetailCommentLikeStateAction =
    useChangeTravelNoteDetailCommentLikeState(travelNoteId);
  const deleteTravelNoteDetailComment =
    useDeleteTravelNoteDetailComment(travelNoteId);

  const handleCommentLikeState = () => {
    changeTravelNoteDetailCommentLikeStateAction({
      id: commentId,
      like: !hasLiked,
    });
  };

  return (
    <DetailContainer>
      <Link href={`/member/${memberId}`}>
        <a>
          <ProfileImage
            src={`${profileImageUrl}?${performance.now()}`}
            alt={"여행 노트 상세 페이지 댓글 남긴 사람의 프로필 사진"}
          />
        </a>
      </Link>
      <Wrapper>
        <TextWrapper>
          <Link href={`/member/${memberId}`}>
            <a>
              <Nickname>{nickname}</Nickname>
            </a>
          </Link>
          <Text>{text}</Text>
          <BottomWrapper>
            <Date>{dateTime}</Date>
            <HeartImageContainer>
              <Image
                src={hasLiked ? iconUrl("heart_filled") : iconUrl("heart_grey")}
                onClick={handleCommentLikeState}
                width={11}
                height={11}
                alt={"여행 노트 상세 페이지 댓글 좋아요가 안눌린 댓글"}
              />
            </HeartImageContainer>
            <CommentLikes>{likeCount}</CommentLikes>
          </BottomWrapper>
        </TextWrapper>
        {mine && (
          <ImageContainer detail>
            <Image
              onClick={() => deleteTravelNoteDetailComment(commentId)}
              src={iconUrl("close")}
              width={20}
              height={20}
              alt={"여행 메이킹 노트 댓글 삭제 아이콘"}
            />
          </ImageContainer>
        )}
      </Wrapper>
    </DetailContainer>
  );
};

export const PlaceDetailCommentComponent: React.FC<
  IDetailCommentsType & { placeId: number }
> = (props) => {
  const {
    placeId,
    commentId,
    memberId,
    nickname,
    profileImageUrl,
    text,
    mine,
    hasModified,
    dateTime,
    hasLiked,
    likeCount,
  } = props;

  const changePlaceDetailCommentLikeStateAction =
    useChangePlaceDetailCommentLikeState(placeId);
  const deletePlaceDetailCommentAction = useDeletePlaceDetailComment(placeId);

  const handleCommentLikeState = () => {
    changePlaceDetailCommentLikeStateAction({
      id: commentId,
      like: !hasLiked,
    });
  };

  return (
    <PlaceDetailContainer>
      <Link href={`/member/${memberId}`}>
        <a>
          <ProfileImage
            src={`${profileImageUrl}?${performance.now()}`}
            alt={"여행 노트 상세 페이지 댓글 남긴 사람의 프로필 사진"}
          />
        </a>
      </Link>
      <Wrapper>
        <TextWrapper>
          <Link href={`/member/${memberId}`}>
            <a>
              <Nickname>{nickname}</Nickname>
            </a>
          </Link>
          <Text>{text}</Text>
          <BottomWrapper>
            <Date>{dateTime}</Date>
            <HeartImageContainer>
              <Image
                src={hasLiked ? iconUrl("heart_filled") : iconUrl("heart_grey")}
                onClick={handleCommentLikeState}
                width={11}
                height={11}
                alt={"여행 노트 상세 페이지 댓글 좋아요가 안눌린 댓글"}
              />
            </HeartImageContainer>
            <CommentLikes>{likeCount}</CommentLikes>
          </BottomWrapper>
        </TextWrapper>
        {mine && (
          <ImageContainer detail>
            <Image
              onClick={() => deletePlaceDetailCommentAction(commentId)}
              src={iconUrl("close")}
              width={20}
              height={20}
              alt={"여행 메이킹 노트 댓글 삭제 아이콘"}
            />
          </ImageContainer>
        )}
      </Wrapper>
    </PlaceDetailContainer>
  );
};

export const FeedDetailComment: React.FC<IFeedCommentType> = (props) => {
  const {
    commentId,
    memberId,
    nickname,
    profileImageUrl,
    text,
    mine,
    hasModified,
    dateTime,
    hasLiked,
    likeCount,
  } = props;

  const changeFeedCommentLikeStateAction = useChangeFeedCommentLikeState();
  const deleteFeedCommentAction = useDeleteFeedComment();

  return (
    <FeedDetailContainer>
      <Link href={`/member/${memberId}`}>
        <a>
          <ProfileImage
            src={`${profileImageUrl}?${performance.now()}`}
            alt={"피드 상세 페이지 댓글 남긴 사람의 프로필 사진"}
          />
        </a>
      </Link>
      <Wrapper>
        <TextWrapper>
          <Link href={`/member/${memberId}`}>
            <a>
              <Nickname>{nickname}</Nickname>
            </a>
          </Link>
          <DetailText>{text}</DetailText>
          <BottomWrapper>
            <Date>{dateTime}</Date>
            <HeartImageContainer>
              <Image
                onClick={() =>
                  changeFeedCommentLikeStateAction({
                    id: commentId,
                    like: !hasLiked,
                  })
                }
                src={hasLiked ? iconUrl("heart_filled") : iconUrl("heart_grey")}
                width={11}
                height={11}
                alt={"여행 피드 상세 페이지 댓글 좋아요가 안눌린 댓글"}
              />
            </HeartImageContainer>
            <CommentLikes>{likeCount}</CommentLikes>
          </BottomWrapper>
        </TextWrapper>
        {mine && (
          <ImageContainer detail>
            <Image
              onClick={() => deleteFeedCommentAction(commentId)}
              src={iconUrl("close")}
              width={20}
              height={20}
              alt={"여행 피드 댓글 삭제 아이콘"}
            />
          </ImageContainer>
        )}
      </Wrapper>
    </FeedDetailContainer>
  );
};

const Container = styled.div`
  width: 537px;
  min-height: 66px;
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 24px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "100%",
    })}
`;

const FeedDetailContainer = styled.div`
  width: 421px;
  min-height: 70px;
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 24px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "328px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const DetailContainer = styled.div`
  width: 636px;
  min-height: 66px;
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 24px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "100%",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "100%",
      padding: "0px 16px",
    })}
`;

const PlaceDetailContainer = styled.div`
  width: 964px;
  min-height: 66px;
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 24px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      maxWidth: "674px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "100%",
      padding: "0px 16px",
    })}
`;

const Wrapper = styled.span`
  display: flex;
  margin-left: 13px;
  max-width: 480px;
  justify-content: space-between;
`;

const TextWrapper = styled.span`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div<{ detail?: boolean }>`
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;

  ${(props) =>
    props.theme.media.mobile({
      right: props.detail && "16px",
    })}
`;

const Nickname = styled.p`
  margin-bottom: 6px;
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;

const Text = styled.p`
  margin-bottom: 6px;
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.grey90, 500)};
`;

const DetailText = styled.p`
  margin-bottom: 6px;
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.grey90, 500)};
  max-width: 364px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      maxWidth: "271px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "calc(100% - 36px)",
    })}
`;

const Date = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.grey60, 500)};
`;

const BottomWrapper = styled.span`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const CommentLikes = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(12, theme.color.grey60, 700)};
  font-family: "PretendardBold";
  margin-left: 4px;
`;

const HeartImageContainer = styled.div`
  cursor: pointer;
  margin-left: 9px;
`;

const ProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  object-fit: cover;
`;
