import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchMyPhotodigmList } from "../../../apis/photodigm";
import { iconUrl } from "../../../axiosInstance/constants";
import { queryKeys } from "../../../react-query/constants";
import { IMyPhotodigmListType } from "../../../types/photodigm";
import MyPhotodigm from "../../molecules/mypage/MyPhotodigm";

const MyPhotodigmList: React.FC = () => {
  const { data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<IMyPhotodigmListType>(
      queryKeys.myPhotodigmList,
      ({ pageParam = 1 }) => fetchMyPhotodigmList(pageParam, 10),
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
          alt={"포토다임이 비어있음을 알려주는 빈 박스 아이콘"}
        />
        <Text>포토다임이 존재하지 않습니다.</Text>
      </EmptyContainer>
    );
  }

  return (
    <InfiniteScroll
      next={fetchNextPage}
      hasMore={hasNextPage || false}
      scrollableTarget="scrollableSearch"
      loader={<ClipLoader color={"#FA8125"} />}
      dataLength={
        data?.pages.reduce((acc, page) => acc + page.data?.length, 0) || 0
      }
    >
      <Container>
        {data?.pages.map((pageData) =>
          pageData.data.map((photodigm) => {
            return (
              <MyPhotodigm
                key={photodigm.photodigmId}
                photodigmId={photodigm.photodigmId}
                imageUrl={photodigm.imageUrl}
                title={photodigm.title}
                dateTime={photodigm.dateTime}
              />
            );
          })
        )}
      </Container>
    </InfiniteScroll>
  );
};

export default MyPhotodigmList;

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
