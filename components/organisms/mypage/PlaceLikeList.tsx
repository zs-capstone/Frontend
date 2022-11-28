import Image from "next/image";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchPlaceLikedList } from "../../../apis/place";
import { iconUrl } from "../../../axiosInstance/constants";
import { queryKeys } from "../../../react-query/constants";
import { IPlaceListType } from "../../../types/common";
import Dropdown from "../../atoms/ui/Dropdown/Dropdown";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";
import MypagePlaceProfile from "../../molecules/mypage/MypagePlaceProfile";

const PlaceLikeList: React.FC = () => {
  const [apiOption, setApiOption] = useState<number | null>(null);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<IPlaceListType>(
    [queryKeys.placeLikedList, apiOption],
    ({ pageParam = 1 }) => fetchPlaceLikedList(pageParam, 10, apiOption),
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
        <Text>여행지가 존재하지 않습니다.</Text>
      </EmptyContainer>
    );
  }

  return (
    <InfiniteScroll
      next={fetchNextPage}
      hasMore={hasNextPage || false}
      scrollableTarget="scrollableLiked"
      loader={<ClipLoader color={"#FA8125"} />}
      dataLength={
        data?.pages.reduce((acc, page) => acc + page.data.length, 0) || 0
      }
    >
      <ResponsiveSpacer size={20} />
      <Dropdown
        setApiOption={setApiOption}
        defaultValue="최신순"
        itemList={[
          { id: 1, value: "최신순" },
          { id: 2, value: "인기순" },
        ]}
      />
      <Spacer size={20} />
      <Container>
        {data?.pages.map((pageData) => {
          return pageData.data.map((place) => {
            return (
              <MypagePlaceProfile
                key={place.placeId}
                placeId={place.placeId}
                address={place.address}
                imageUrl={place.imageUrl}
                title={place.title}
                hasLiked={place.hasLiked}
                likeCount={place.likeCount}
              />
            );
          });
        })}
      </Container>
    </InfiniteScroll>
  );
};

export default PlaceLikeList;

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

const ResponsiveSpacer = styled(Spacer)`
  display: none;
  ${({ theme }) =>
    theme.media.mobile({
      display: "flex",
    })};
`;
