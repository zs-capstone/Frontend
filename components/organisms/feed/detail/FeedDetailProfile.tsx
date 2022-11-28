import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import { useAddFeedComment } from "../../../../hooks/board/detail/useAddFeedComment";
import { useChangeFeedLikeState } from "../../../../hooks/board/useChangeFeedLikeState";
import { IFeedCommentType } from "../../../../types/board/detail";
import FeedMenuModal from "../../../atoms/feed/detail/FeedMenuModal";
import { FeedDetailComment } from "../../../atoms/travel/making-note/Comment";

const FeedDetailProfile: React.FC<
  Partial<{
    mine: boolean;
    memberId: number;
    profileImage: string;
    nickname: string;
    dateTime: string;
    text: string;
    commentCount: number;
    hasLiked: boolean;
    likeCount: number;
    commentList: IFeedCommentType[];
    boardId: number;
  }>
> = (props) => {
  const {
    mine,
    memberId,
    profileImage,
    nickname,
    dateTime,
    text,
    commentCount,
    hasLiked,
    likeCount,
    commentList,
    boardId,
  } = props;

  const [textInput, setTextInput] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const addFeedCommenAction = useAddFeedComment();
  const { mutate: changeFeedLikeStateAction, isLoading } =
    useChangeFeedLikeState();

  const handleChangeFeedLikeState = () => {
    if (boardId) {
      changeFeedLikeStateAction({
        id: boardId,
        like: !hasLiked,
      });
    }
  };

  const handleAddComment = () => {
    if (boardId) {
      if (!textInput) {
        toast.error("댓글을 입력하세요.");
        return;
      }
      addFeedCommenAction({
        id: boardId,
        text: textInput,
      });
    }
    setTextInput("");
  };

  return (
    <Container>
      <Link href={`/member/${memberId}`}>
        <ProfileWrapper>
          {profileImage && (
            <ProfileImage
              src={profileImage}
              alt={"피드 작성자의 프로필 이미지"}
            />
          )}
          <TextWrapper>
            <Nickname>{nickname}</Nickname>
            <Date>{dateTime}</Date>
          </TextWrapper>
        </ProfileWrapper>
      </Link>
      {mine && (
        <MenuMoreWrapper>
          <Image
            onClick={() => setModalOpen((prev) => !prev)}
            src={iconUrl("menu_more")}
            width={24}
            height={24}
            alt={"피드 상세 페이지 메뉴 더보기 아이콘"}
          />
        </MenuMoreWrapper>
      )}
      <Text>{text}</Text>
      <FeedbackWrapper>
        {isLoading ? (
          <ClipLoader color={"#FA8125"} />
        ) : hasLiked ? (
          <ImageCursorWrapper>
            <Image
              onClick={handleChangeFeedLikeState}
              src={iconUrl("heart_filled")}
              width={20}
              height={20}
              alt={"피드 상세 페이지 좋아요 아이콘"}
            />
          </ImageCursorWrapper>
        ) : (
          <ImageCursorWrapper>
            <Image
              onClick={handleChangeFeedLikeState}
              src={iconUrl("heart_grey")}
              width={20}
              height={20}
              alt={"피드 상세 페이지 좋아요 아이콘"}
            />
          </ImageCursorWrapper>
        )}
        <FeedbackText>{likeCount}</FeedbackText>
        <Image
          src={iconUrl("comment_grey")}
          width={20}
          height={20}
          alt={"피드 상세 페이지 댓글 아이콘"}
        />
        <FeedbackText>{commentCount}</FeedbackText>
      </FeedbackWrapper>
      <Comment>댓글</Comment>
      <InputWrapper>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTextInput(e.target.value)
          }
          value={textInput}
          spellCheck={false}
          type={text}
          placeholder={"댓글을 작성해 주세요!"}
        />
        <ImageCursorWrapper>
          <Image
            onClick={handleAddComment}
            src={iconUrl("comment_submit")}
            width={20}
            height={20}
            alt={"피드 상세 페이지 댓글 작성하는 아이콘"}
          />
        </ImageCursorWrapper>
      </InputWrapper>
      {commentList?.map((comment) => (
        <FeedDetailComment
          key={comment.commentId}
          commentId={comment.commentId}
          memberId={comment.memberId}
          nickname={comment.nickname}
          mine={comment.mine}
          profileImageUrl={comment.profileImageUrl}
          text={comment.text}
          hasModified={comment.hasModified}
          dateTime={comment.dateTime}
          hasLiked={comment.hasLiked}
          likeCount={comment.likeCount}
        />
      ))}
      <FeedMenuModal
        boardId={boardId}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </Container>
  );
};

export default FeedDetailProfile;

const Container = styled.div`
  width: 472px;
  height: fit-content;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.color.border1};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  padding: 28px 24px;
  position: relative;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "360px",
      padding: "28px 16px",
    })};

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
      padding: 0,
      border: "none",
      borderRadius: "0",
      boxShadow: "none",
    })}
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 100%;
  object-fit: cover;
`;

const ProfileWrapper = styled.span`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  width: fit-content;
  margin-bottom: 24px;
`;

const TextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 7px;
`;

const Nickname = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};
  margin-bottom: 4px;
`;

const Date = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(12, theme.color.grey60, 700)};
`;

const Text = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(16, theme.color.grey70, 400)};
  max-width: 425px;

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "100%",
    })}
`;

const FeedbackWrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 24px 0;
`;

const FeedbackText = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
  margin: 0 12px 0 8px;
`;

const Comment = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.black, 700)};
  font-family: "PretendardBold";
  margin-bottom: 33px;
`;

const Input = styled.input`
  width: 394px;
  height: 40px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.color.backgroundLight};
  border: 1px solid ${({ theme }) => theme.color.border1};
  border-radius: 11px;
  font-size: 15px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "271px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "calc(100% - 40px)",
    })}
`;

const InputWrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const ImageCursorWrapper = styled.div`
  cursor: pointer;
  display: flex;
`;

const MenuMoreWrapper = styled.div`
  position: absolute;
  right: 24px;
  top: 34px;
  cursor: pointer;
  display: flex;

  ${({ theme }) =>
    theme.media.tabletUnder({
      right: "16px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      top: "6px",
      right: 0,
    })}
`;
