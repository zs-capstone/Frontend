import Image from "next/image";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchIntegratedPlaceSearchList } from "../../../apis/search";
import { iconUrl } from "../../../axiosInstance/constants";
import { queryKeys } from "../../../react-query/constants";
import { IIntegratedPlaceSearchListType } from "../../../types/search";
import Dropdown from "../../atoms/ui/Dropdown/Dropdown";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";
import MypagePlaceProfile from "../../molecules/mypage/MypagePlaceProfile";

const SearchPlaceProfile: React.FC<{ content: string }> = (props) => {
  const { content } = props;

  const [apiOption, setApiOption] = useState<number | null>(null);

  const { data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<IIntegratedPlaceSearchListType>(
      [queryKeys.searchPlace, content, apiOption],
      ({ pageParam = 1 }) =>
        fetchIntegratedPlaceSearchList(content, pageParam, 16, apiOption),
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
        <Text>검색 결과가 존재하지 않습니다.</Text>
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
      <Dropdown
        defaultValue="최신순"
        setApiOption={setApiOption}
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

export default SearchPlaceProfile;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  row-gap: 24px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      gridTemplateColumns: "1fr 1fr 1fr",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    })}
`;

const EmptyContainer = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: column;
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  margin-top: 26px;
`;
