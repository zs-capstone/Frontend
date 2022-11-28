import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { fetchPlaceDetailCommentList } from "../../../../../apis/place/detail";
import { iconUrl } from "../../../../../axiosInstance/constants";
import { useAddPlaceDetailComment } from "../../../../../hooks/travel/place/useAddPlaceDetailComment";
import { queryKeys } from "../../../../../react-query/constants";
import { IDetailCommentsType } from "../../../../../types/note/detail";
import { PlaceDetailCommentComponent } from "../../../../atoms/travel/making-note/Comment";

const PlaceDetailComment: React.FC<{
  selectedLanguage: string;
  placeId: number;
}> = (props) => {
  const { placeId, selectedLanguage } = props;
  const [commentInput, setCommentInput] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");
  const [commentPlaceholder, setCommentPlaceholder] = useState<string>("");

  const { data: detailCommentList = [] } = useQuery<IDetailCommentsType[]>(
    [queryKeys.placeDetailComment, +placeId],
    () => fetchPlaceDetailCommentList(+placeId)
  );

  const addPlaceDetailCommentAction = useAddPlaceDetailComment(placeId);

  const handleAddComment = () => {
    if (!commentInput) {
      toast.error("댓글을 입력해주세요.");
      return;
    }
    addPlaceDetailCommentAction({
      id: placeId,
      text: commentInput,
    });
    setCommentInput("");
  };

  useEffect(() => {
    if (selectedLanguage === "ko") {
      setCommentText("댓글");
      setCommentPlaceholder("댓글을 입력해 주세요.");
    } else if (selectedLanguage === "en") {
      setCommentText("Comment");
      setCommentPlaceholder("Please enter a comment.");
    } else {
      setCommentText("评论");
      setCommentPlaceholder("请输入评论.");
    }
  }, [selectedLanguage]);

  return (
    <Container>
      <Title>{commentText}</Title>
      {detailCommentList.map((comment) => (
        <PlaceDetailCommentComponent
          placeId={placeId}
          key={comment.commentId}
          mine={comment.mine}
          commentId={comment.commentId}
          memberId={comment.memberId}
          nickname={comment.nickname}
          profileImageUrl={comment.profileImageUrl}
          text={comment.text}
          hasModified={comment.hasModified}
          dateTime={comment.dateTime}
          hasLiked={comment.hasLiked}
          likeCount={comment.likeCount}
        />
      ))}
      <CommentWrapper>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCommentInput(e.target.value)
          }
          value={commentInput}
          placeholder={commentPlaceholder}
          type="text"
          spellCheck="false"
        />
        <ImageContainer>
          <Image
            onClick={handleAddComment}
            src={iconUrl("comment_submit")}
            width={20}
            height={20}
            alt={"여행 메이킹 노트 댓글 달기 버튼"}
          />
        </ImageContainer>
      </CommentWrapper>
    </Container>
  );
};

export default PlaceDetailComment;

const Container = styled.div`
  width: 964px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      maxWidth: "674px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "100%",
      borderTop: `4px solid ${theme.color.background}`,
      paddingTop: "32px",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(16, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin-bottom: 26px;

  ${({ theme }) =>
    theme.media.mobile({
      paddingLeft: "16px",
    })}
`;

const Input = styled.input`
  width: calc(100% - 32px);
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 11px;
  height: 40px;
  padding: 8px 16px;
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};

  ::placeholder {
    font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
  }
`;

const CommentWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  border: 1px solid ${({ theme }) => theme.color.border1};
  height: 80px;
  padding: 20px 24px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      padding: "10px 16px",
    })}
`;

const ImageContainer = styled.div`
  cursor: pointer;
`;
