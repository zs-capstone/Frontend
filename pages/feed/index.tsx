import { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchFeedList } from "../../apis/board";
import { CommonButton } from "../../components/atoms/ui/Button/CommonButton";
import FeedMenuBar from "../../components/molecules/feed/FeedMenuBar";
import { queryKeys } from "../../react-query/constants";
import { IFeedListType } from "../../types/board";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Spacer } from "../../components/atoms/ui/Spacer/Spacer";
import { iconUrl } from "../../axiosInstance/constants";

const FeedProfile = dynamic(
  () => import("../../components/molecules/feed/FeedProfile"),
  { suspense: true }
);

const FeedPage: NextPage = () => {
  const router = useRouter();

  const [option, setOption] = useState<number | null>(null);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<IFeedListType>(
    [queryKeys.feedList, option],
    ({ pageParam = 1 }) => fetchFeedList(pageParam, 12, option),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
      cacheTime: 10000, // 10초
      staleTime: 15000, // 15초
    }
  );

  if (data?.pages[0].data.length === 0) {
    return (
      <>
        <FeedMenuBar setOption={setOption} />
        <Spacer size={24} />
        <ImageContainer>
          <Image
            src={iconUrl("empty")}
            width={117}
            height={117}
            alt={"팔로우한 사람들의 피드가 비어있음을 알려주는 빈 박스 아이콘"}
          />
          <EmptyLikedList>피드 리스트가 비어있습니다.</EmptyLikedList>
        </ImageContainer>
        <ButtonWrapper>
          <CommonButton
            onClick={() => router.push("/feed/upload")}
            width={"219px"}
            height={"36px"}
            size={14}
            backgroundColor={"#000000"}
            radius={"12px"}
            color={"#FFFFFF"}
          >
            피드 작성하기
          </CommonButton>
        </ButtonWrapper>
      </>
    );
  }

  return (
    <>
      <FeedMenuBar setOption={setOption} />
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={<ClipLoader color={"#FA8125"} />}
        dataLength={
          data?.pages.reduce((acc, page) => acc + page.data.length, 0) || 0
        }
      >
        <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
          <Container>
            {data?.pages.map((pageData) => {
              return pageData.data.map((feed) => {
                return (
                  <FeedProfile
                    key={feed.boardId}
                    boardId={feed.boardId}
                    memberId={feed.memberId}
                    profileImage={feed.profileImage}
                    text={feed.text}
                    nickname={feed.nickname}
                    thumbnail={feed.thumbnail}
                    singleImage={feed.singleImage}
                    dateTime={feed.dateTime}
                    hasLiked={feed.hasLiked}
                    likeCount={feed.likeCount}
                    commentCount={feed.commentCount}
                  />
                );
              });
            })}
            <ButtonWrapper>
              <CommonButton
                onClick={() => router.push("/feed/upload")}
                width={"219px"}
                height={"36px"}
                size={14}
                backgroundColor={"#000000"}
                radius={"12px"}
                color={"#FFFFFF"}
              >
                피드 작성하기
              </CommonButton>
            </ButtonWrapper>
          </Container>
        </Suspense>
      </InfiniteScroll>
    </>
  );
};

export default FeedPage;

const Container = styled.div`
  position: relative;
  display: grid;
  margin: 40px 140px 37px;
  grid-template-columns: repeat(auto-fill, minmax(236px, 1fr));
  row-gap: 40px;
  place-items: flex-start center;

  ${({ theme }) =>
    theme.media.tabletUnder({
      margin: "40px 16px 0",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    })}
`;

const ButtonWrapper = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  bottom: 46px;
`;

const ImageContainer = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()}
  flex-direction: column;

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
      marginBottom: "32px",
    })}
`;

const EmptyLikedList = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  text-align: center;
  margin-top: 46px;
  line-height: 20px;
`;
