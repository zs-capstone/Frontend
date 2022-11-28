import { GetServerSideProps, NextPage } from "next";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchFeedLike } from "../../../apis/board";
import {
  fetchFeedComment,
  fetchFeedCommentCount,
  fetchFeedDetailProfile,
} from "../../../apis/board/detail";
import MakingNoteTagSelectedProfileLink from "../../../components/atoms/feed/detail/MakingNoteTagSelectedProfileLink";
import FeedCarousel from "../../../components/organisms/feed/detail/FeedCarousel";
import FeedDetailProfile from "../../../components/organisms/feed/detail/FeedDetailProfile";
import DetailPlaceTag from "../../../components/organisms/feed/DetailPlaceTag";
import { queryKeys } from "../../../react-query/constants";
import {
  IFeedCommentType,
  IFeedDetailProfileType,
} from "../../../types/board/detail";
import { IDetailLikeType } from "../../../types/common";

const FeedDetailPage: NextPage<{ boardId: string }> = ({ boardId }) => {
  const { data: feedDetailProfile } = useQuery<IFeedDetailProfileType>(
    [queryKeys.feedDetailProfile, +boardId],
    () => fetchFeedDetailProfile(+boardId),
    { cacheTime: 0, staleTime: 0 }
  );

  const { data: feedLikeState } = useQuery<IDetailLikeType>(
    [queryKeys.feedDetailLikeState, +boardId],
    () => fetchFeedLike(+boardId)
  );

  const { data: commentCount } = useQuery<number>(
    [queryKeys.feedDetailCommentCount, +boardId],
    () => fetchFeedCommentCount(+boardId)
  );

  const { data: commentList } = useQuery<IFeedCommentType[]>(
    [queryKeys.feedCommentList, +boardId],
    () => fetchFeedComment(+boardId)
  );

  return (
    <Container>
      <Section>
        <FeedCarousel imageList={feedDetailProfile?.imageList || []} />
        {feedDetailProfile?.travelNoteTag && (
          <MakingNoteTagWrapper>
            <TagDescription>여행노트 태그</TagDescription>
            <MakingNoteTagSelectedProfileLink
              selectedTravelNoteId={feedDetailProfile.travelNoteTag}
            />
          </MakingNoteTagWrapper>
        )}
        {feedDetailProfile && feedDetailProfile.placeTag?.length > 0 && (
          <PlaceTagWrapper>
            <TagDescription>여행지 태그</TagDescription>
            <DetailPlaceTag placeTag={feedDetailProfile.placeTag} />
          </PlaceTagWrapper>
        )}
      </Section>
      <FeedDetailProfile
        boardId={+boardId}
        mine={feedDetailProfile?.mine}
        memberId={feedDetailProfile?.memberId}
        profileImage={feedDetailProfile?.profileImage}
        nickname={feedDetailProfile?.nickname}
        dateTime={feedDetailProfile?.dateTime}
        text={feedDetailProfile?.text}
        commentCount={commentCount}
        hasLiked={feedLikeState?.hasLiked}
        likeCount={feedLikeState?.likeCount}
        commentList={commentList}
      />
    </Container>
  );
};

export default FeedDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { boardId } = context.query;

  return {
    props: {
      boardId,
    },
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 40px;
  justify-content: center;
  margin: 34px auto 124px;

  ${({ theme }) =>
    theme.media.mobile({
      flexDirection: "column-reverse",
      margin: "34px 0 124px",
      padding: "0 16px",
      columnGap: 0,
      rowGap: "40px",
    })}
`;

const Section = styled.span`
  display: flex;
  row-gap: 40px;
  flex-direction: column;
`;

const TagDescription = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin-bottom: 19px;
`;

const MakingNoteTagWrapper = styled.span`
  display: flex;
  flex-direction: column;
  width: fit-content;

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const PlaceTagWrapper = styled.span`
  display: flex;
  flex-direction: column;
  width: fit-content;

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;
