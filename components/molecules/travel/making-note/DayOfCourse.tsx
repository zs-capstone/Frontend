import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { fetchCourseDistance } from "../../../../apis/course";
import { fetchCommentList } from "../../../../apis/note";
import { iconUrl } from "../../../../axiosInstance/constants";
import { useAddComment } from "../../../../hooks/travel/making-note/useAddComment";
import { queryKeys } from "../../../../react-query/constants";
import { IMakingNotePlaceListDataType } from "../../../../types/common";
import { ICourseDistanceType } from "../../../../types/course";
import { IMakingNoteCommentType } from "../../../../types/note";
import { MakingNoteComment } from "../../../atoms/travel/making-note/Comment";
import CoursePlace from "../../../atoms/travel/making-note/CoursePlace";
import { PlaceBetween } from "../../../atoms/travel/making-note/PlaceBetween";
import { CommonButton } from "../../../atoms/ui/Button/CommonButton";
import { Spacer } from "../../../atoms/ui/Spacer/Spacer";
import PlaceAddModal from "./PlaceAddModal";

const DayOfCourse: React.FC<{
  makingNoteId: number;
  day: number;
  places: IMakingNotePlaceListDataType[];
}> = (props) => {
  const { makingNoteId, day, places } = props;

  const [commentInput, setCommentInput] = useState<string>("");
  const [commentOpen, setCommentOpen] = useState<boolean>(false);

  const { data: comments } = useQuery<IMakingNoteCommentType[]>(
    [queryKeys.makingNoteComment, +makingNoteId, day],
    () => fetchCommentList(+makingNoteId, day)
  );

  const { data: courseDistance } = useQuery<ICourseDistanceType[]>(
    [queryKeys.makingNoteCourseDistance, +makingNoteId],
    () => fetchCourseDistance(+makingNoteId)
  );

  const addCommentAction = useAddComment(makingNoteId, day);

  const handleAddComment = () => {
    if (!commentInput) {
      toast.error("댓글을 입력해주세요.");
      return;
    }
    addCommentAction({
      travelNoteId: makingNoteId,
      day,
      text: commentInput,
    });
    setCommentInput("");
  };

  return (
    <Container>
      <Header>
        <Day>{day}일차</Day>
        <PlaceAddModal makingNoteId={makingNoteId} day={day} />
      </Header>
      <PlaceWrapper>
        {places.map((place, index) => (
          <Fragment key={place.placeId}>
            <Link href={`/travel/place/detail/${place.placeId}`}>
              <a>
                <CoursePlace
                  placeId={place.placeId}
                  image={place.imageUrl}
                  child={place.child}
                  animal={place.animal}
                  title={place.title}
                  address={place.address}
                />
              </a>
            </Link>
            {courseDistance && (
              <PlaceBetween
                placeId={place.placeId}
                hasNext={!place.hasNext}
                courseDistance={courseDistance[day - 1].routeInfos}
                index={index}
              />
            )}
          </Fragment>
        ))}
      </PlaceWrapper>
      <Spacer size={28} />
      {!commentOpen && comments && (
        <ButtonContainer>
          <CommonButton onClick={() => setCommentOpen(true)}>
            {`댓글보기(${comments.length})`}
          </CommonButton>
        </ButtonContainer>
      )}
      {commentOpen && (
        <>
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
          <Spacer size={28} />
          {comments?.map((comment) => (
            <MakingNoteComment
              makingNoteId={makingNoteId}
              key={comment.commentId}
              commentId={comment.commentId}
              text={comment.text}
              day={day}
              memberId={comment.memberId}
              profileImageUrl={comment.profileImageUrl}
              nickname={comment.nickname}
              isModified={comment.isModified}
              dateTime={comment.dateTime}
              mine={comment.mine}
            />
          ))}
        </>
      )}
    </Container>
  );
};

export default DayOfCourse;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 17px;
  padding-bottom: 17px;
  border-bottom: 6px solid ${({ theme }) => theme.color.background};
  margin-bottom: 38px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      paddingLeft: "0px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      padding: "0 16px 17px",
    })}
`;

const Day = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(15, theme.color.main50, 700)};
  font-family: "PretendardBold";
`;

const Header = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 26px;
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

const ButtonContainer = styled.div`
  width: fit-content;
  height: fit-content;

  :hover {
    transform: translateY(5px);
    transition: transform 0.3s ease;
  }
`;

const ImageContainer = styled.div`
  cursor: pointer;
`;

const PlaceWrapper = styled.div`
  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;
