import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchPlaceLikedList } from "../../../../apis/place";
import { iconUrl } from "../../../../axiosInstance/constants";
import { queryKeys } from "../../../../react-query/constants";
import { IPlaceListDataType, IPlaceListType } from "../../../../types/common";
import { Spacer } from "../../../atoms/ui/Spacer/Spacer";
import PlaceProfile from "../../../molecules/travel/making-note/PlaceProfile";

const LikedList: React.FC<{
  addedList: IPlaceListDataType[];
  setAddedList: Dispatch<SetStateAction<IPlaceListDataType[]>>;
}> = (props) => {
  const { addedList, setAddedList } = props;

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<IPlaceListType>(
    queryKeys.placeLikedList,
    ({ pageParam = 1 }) => fetchPlaceLikedList(pageParam, 10),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
      staleTime: 0,
      cacheTime: 0,
    }
  );

  if (!data || data.pages[0].data.length === 0) {
    return (
      <Section>
        <Title>좋아하는 여행지</Title>
        <Spacer size={24} />
        <ImageContainer>
          <Image
            src={iconUrl("empty")}
            width={117}
            height={117}
            alt={"좋아하는 여행지가 비어있음을 알려주는 빈 박스 아이콘"}
          />
          <EmptyLikedList>
            좋아하는 여행지 리스트가
            <br />
            비어있습니다.
          </EmptyLikedList>
        </ImageContainer>
      </Section>
    );
  }

  return (
    <Section>
      <Title>좋아하는 여행지</Title>
      <Spacer size={24} />
      <Wrapper id="scrollableLiked">
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          scrollableTarget="scrollableLiked"
          loader={<ClipLoader color={"#FA8125"} />}
          dataLength={data.pages.reduce(
            (acc, page) => acc + page.data.length,
            0
          )}
        >
          {data.pages.map((pageData) => {
            return pageData.data.map((place) => {
              return (
                <PlaceProfile
                  key={place.placeId}
                  place={place}
                  addedList={addedList}
                  setAddedList={setAddedList}
                />
              );
            });
          })}
        </InfiniteScroll>
      </Wrapper>
    </Section>
  );
};

export default LikedList;

const Section = styled.section`
  width: 100%;

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
      padding: "0 16px",
      borderBottom: `4px solid ${theme.color.background}`,
      paddingBottom: "40px",
    })}
`;

const Wrapper = styled.div`
  width: 554px;
  max-height: 450px;
  position: relative;
  overflow: auto;

  ${({ theme }) => theme.mixin.scrollStyle(8)};

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "100%",
    })}
`;

const Title = styled.h1`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin-top: 24px;
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
