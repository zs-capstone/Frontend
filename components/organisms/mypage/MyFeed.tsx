import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchMyFeedList } from "../../../apis/board";
import { iconUrl } from "../../../axiosInstance/constants";
import { queryKeys } from "../../../react-query/constants";
import { IMyFeedListType } from "../../../types/board";
import MypageFeedProfile from "../../molecules/mypage/MypageFeedProfile";

const MyFeed: React.FC = () => {
  const { data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<IMyFeedListType>(
      queryKeys.myFeedList,
      ({ pageParam = 1 }) => fetchMyFeedList(pageParam, 10),
      {
        getNextPageParam: (lastPage) => lastPage.next || undefined,
        cacheTime: 10000, // 10초
        staleTime: 15000, // 15초
      }
    );

  if (data?.pages[0].data?.length === 0) {
    return (
      <EmptyContainer>
        <Image
          src={iconUrl("empty")}
          width={117}
          height={117}
          alt={"여행지가 비어있음을 알려주는 빈 박스 아이콘"}
        />
        <Text>피드가 존재하지 않습니다.</Text>
      </EmptyContainer>
    );
  }

  return (
    <InfiniteScroll
      next={fetchNextPage}
      hasMore={hasNextPage || false}
      loader={<ClipLoader color={"#FA8125"} />}
      dataLength={
        data?.pages.reduce((acc, page) => acc + page.data?.length, 0) || 0
      }
    >
      <Container>
        {data?.pages.map((pageData) =>
          pageData.data.map((feed) => {
            return (
              <MypageFeedProfile
                key={feed.boardId}
                boardId={feed.boardId}
                thumbnail={feed.thumbnail}
                text={feed.text}
                singleImage={feed.singleImage}
                dateTime={feed.dateTime}
                commentCount={feed.commentCount}
              />
            );
          })
        )}
      </Container>
    </InfiniteScroll>
  );
};

export default MyFeed;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 24px;
  margin-bottom: 24px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      gridTemplateColumns: "1fr 1fr",
      columnGap: "10px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      marginTop: "40px",
      columnGap: "20px",
    })}
`;

const EmptyContainer = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  width: 100%;
  flex-direction: column;

  ${({ theme }) =>
    theme.media.mobile({
      margin: "40px 0",
    })}
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  margin-top: 26px;
`;
