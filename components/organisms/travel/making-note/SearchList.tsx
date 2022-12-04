import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchPlaceSearchList } from "../../../../apis/search";
import { iconUrl } from "../../../../axiosInstance/constants";
import { queryKeys } from "../../../../react-query/constants";
import { IPlaceListDataType, IPlaceListType } from "../../../../types/common";
import PlaceSearchInput from "../../../atoms/travel/making-note/PlaceSearchInput";
import { Spacer } from "../../../atoms/ui/Spacer/Spacer";
import PlaceProfile from "../../../molecules/travel/making-note/PlaceProfile";

const SearchList: React.FC<{
  title: string;
  addedList: IPlaceListDataType[];
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  setAddedList: Dispatch<SetStateAction<IPlaceListDataType[]>>;
}> = (props) => {
  const { title, addedList, setAddedList, searchKeyword, setSearchKeyword } =
    props;

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<IPlaceListType>(
    [queryKeys.placeSearchList, searchKeyword],
    ({ pageParam = 1 }) =>
      fetchPlaceSearchList(pageParam, searchKeyword || "undefined"),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (!data || data.pages[0].data.content.length === 0) {
    return (
      <Container>
        <Title>{title}</Title>
        <PlaceSearchInput
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
        <Spacer size={24} />
        <ImageContainer>
          <Image
            src={iconUrl("empty")}
            width={117}
            height={117}
            alt={"검색한 여행지가 비어있음을 알려주는 빈 박스 아이콘"}
          />
          <EmptyLikedList>
            검색한 여행지 리스트가
            <br />
            비어있습니다.
          </EmptyLikedList>
        </ImageContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Title>{title}</Title>
      <PlaceSearchInput
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <Spacer size={24} />
      <Wrapper id="scrollableSearch">
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          scrollableTarget="scrollableSearch"
          loader={<ClipLoader color={"#FA8125"} />}
          dataLength={data.pages.reduce(
            (acc, page) => acc + page.data.content.length,
            0
          )}
        >
          {data.pages.map((pageData) => {
            return pageData.data.content.map((place) => {
              return (
                <PlaceProfile
                  addedList={addedList}
                  setAddedList={setAddedList}
                  key={place.placeId}
                  place={place}
                />
              );
            });
          })}
        </InfiniteScroll>
      </Wrapper>
    </Container>
  );
};

export default SearchList;

const Container = styled.div`
  width: 100%;

  ${({ theme }) =>
    theme.media.mobile({
      padding: "0 16px",
    })}
`;

const Wrapper = styled.div`
  max-height: 450px;
  position: relative;
  overflow: auto;

  ${({ theme }) => theme.mixin.scrollStyle(8)}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const Title = styled.h1`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin: 24px 0 20px;
`;

const ImageContainer = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()}
  flex-direction: column;
  width: 100%;
`;

const EmptyLikedList = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  text-align: center;
  margin-top: 46px;
  line-height: 20px;
`;
