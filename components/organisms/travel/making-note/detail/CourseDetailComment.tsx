import Image from "next/image";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { fetchTravelNoteCommentList } from "../../../../../apis/note/detail";
import { iconUrl } from "../../../../../axiosInstance/constants";
import { useAddTravelNoteDetailComment } from "../../../../../hooks/travel/making-note/detail/useAddTravelNoteDetailcomment";
import { queryKeys } from "../../../../../react-query/constants";
import { IDetailCommentsType } from "../../../../../types/note/detail";
import { MakingNoteDetailComment } from "../../../../atoms/travel/making-note/Comment";

const CourseDetailComment: React.FC<{
  travelNoteId: number;
}> = (props) => {
  const { travelNoteId } = props;
  const [commentInput, setCommentInput] = useState<string>("");

  const { data: detailCommentList = [] } = useQuery<IDetailCommentsType[]>(
    [queryKeys.travelNoteDetailComment, +travelNoteId],
    () => fetchTravelNoteCommentList(+travelNoteId)
  );

  const addTravelNoteDetailCommentAction =
    useAddTravelNoteDetailComment(travelNoteId);

  const handleAddComment = () => {
    if (!commentInput) {
      toast.error("댓글을 입력해주세요.");
      return;
    }
    addTravelNoteDetailCommentAction({
      id: travelNoteId,
      content: commentInput,
    });
    setCommentInput("");
  };

  return (
    <Container>
      <Title>댓글</Title>
      {detailCommentList.map((comment) => (
        <MakingNoteDetailComment
          travelNoteId={travelNoteId}
          key={comment.commentId}
          commentId={comment.commentId}
          memberId={comment.memberId}
          nickname={comment.nickname}
          profileImageUrl={comment.profileImageUrl}
          text={comment.text}
          hasModified={comment.hasModified}
          dateTime={comment.dateTime}
          hasLiked={comment.hasLiked}
          likeCount={comment.likeCount}
          mine={comment.mine}
        />
      ))}
      <CommentWrapper>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCommentInput(e.target.value)
          }
          value={commentInput}
          placeholder="댓글을 입력해 주세요."
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

export default React.memo(CourseDetailComment);

const Container = styled.div`
  width: 636px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      maxWidth: "328px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "100%",
      width: "100%",
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
      padding: "0 16px",
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
