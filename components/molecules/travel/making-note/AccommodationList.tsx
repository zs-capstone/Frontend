import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchAccommodationList } from "../../../../apis/course";
import { queryKeys } from "../../../../react-query/constants";
import { IAccommodationListType } from "../../../../types/course";
import AccommodationProfile from "../../../atoms/travel/making-note/AccommodationProfile";

const AccommodationList: React.FC<{
  travelNoteId: number;
  selectedDay: number;
  selectedType: number;
  dayStart: string;
}> = (props) => {
  const { travelNoteId, selectedDay, selectedType, dayStart } = props;

  const { data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<IAccommodationListType>(
      [queryKeys.accommodationList, selectedDay, selectedType],
      ({ pageParam = 1 }) =>
        fetchAccommodationList(
          travelNoteId,
          selectedDay,
          selectedType,
          pageParam,
          4
        ),
      {
        getNextPageParam: (lastPage) =>
          lastPage.accommodations.next || undefined,
        cacheTime: 10000, // 10초
        staleTime: 15000, // 15초
      }
    );

  return (
    <Scrollable id="scrollable">
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        scrollableTarget="scrollable"
        loader={<ClipLoader color={"#FA8125"} />}
        dataLength={
          data?.pages.reduce(
            (acc, page) => acc + page.accommodations.data.length,
            0
          ) || 0
        }
      >
        <Container>
          {data?.pages.map((pageData) => {
            return pageData.accommodations.data.map((accommodation) => {
              return (
                <AccommodationProfile
                  selectedDay={selectedDay}
                  dayStart={dayStart}
                  key={accommodation.accommodationId}
                  imageUrl={accommodation.imageUrl}
                  title={accommodation.title}
                  tag={accommodation.tag}
                />
              );
            });
          })}
        </Container>
      </InfiniteScroll>
    </Scrollable>
  );
};

export default AccommodationList;

const Scrollable = styled.div`
  max-height: 364px;
  position: relative;
  overflow: auto;
  margin-top: 24px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
`;
