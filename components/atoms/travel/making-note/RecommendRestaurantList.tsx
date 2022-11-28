import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchRestaurantList } from "../../../../apis/place";
import { iconUrl } from "../../../../axiosInstance/constants";
import { queryKeys } from "../../../../react-query/constants";
import { IRestaurantListType } from "../../../../types/place";
import RestaurantProfile from "./RestaurantProfile";

const RecommendRestaurantList: React.FC<{
  placeId: number;
  selectedType: number;
}> = (props) => {
  const { placeId, selectedType } = props;

  const { data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<IRestaurantListType>(
      [queryKeys.restaurantList, placeId, selectedType],
      ({ pageParam = 1 }) =>
        fetchRestaurantList(placeId, selectedType, pageParam, 10),
      {
        getNextPageParam: (lastPage) => lastPage.next || undefined,
        cacheTime: 10000, // 10초
        staleTime: 15000, // 15초
      }
    );

  return (
    <>
      {data?.pages[0].data.length === 0 && (
        <EmptyContainer>
          <Image
            src={iconUrl("empty")}
            width={117}
            height={117}
            alt={"음식점이 비어있음을 알려주는 빈 박스 아이콘"}
          />
          <Text>음식점이 존재하지 않습니다.</Text>
        </EmptyContainer>
      )}
      <Scrollable id={`scrollable${placeId}`}>
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          scrollableTarget={`scrollable${placeId}`}
          loader={<ClipLoader color={"#FA8125"} />}
          dataLength={
            data?.pages.reduce((acc, page) => acc + page.data.length, 0) || 0
          }
        >
          {data?.pages.map((pageData) => {
            return pageData.data.map((element) => {
              return (
                <RestaurantProfile
                  key={element.restaurantId}
                  imageUrl={element.imageUrl}
                  title={element.title}
                  tag={element.tag}
                  address={element.address}
                  routeInfo={element.routeInfo}
                />
              );
            });
          })}
        </InfiniteScroll>
      </Scrollable>
    </>
  );
};

export default RecommendRestaurantList;

const Scrollable = styled.div`
  position: relative;
  max-height: 384px;
  overflow: auto;
`;

const EmptyContainer = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  margin-top: 26px;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  margin-top: 26px;
`;
