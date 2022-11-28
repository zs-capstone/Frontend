import Image from "next/image";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchMyTravelNote } from "../../../apis/note";
import { iconUrl } from "../../../axiosInstance/constants";
import { queryKeys } from "../../../react-query/constants";
import { IMyTravelNoteType } from "../../../types/note";
import MypageTravelNoteProfile from "../../molecules/mypage/MypageTravelNoteProfile";

const MyTravelNote: React.FC = () => {
  const { data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<IMyTravelNoteType>(
      queryKeys.myTravelNote,
      ({ pageParam = 1 }) => fetchMyTravelNote(pageParam, 10),
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
          alt={"여행 노트가 비어있음을 알려주는 빈 박스 아이콘"}
        />
        <Text>여행 노트가 존재하지 않습니다.</Text>
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
        data?.pages.reduce((acc, page) => acc + page.data.length, 0) || 0
      }
    >
      <Container>
        {data?.pages.map((pageData) =>
          pageData.data.map((note) => {
            return (
              <MypageTravelNoteProfile
                key={note.travelNoteId}
                travelNoteId={note.travelNoteId}
                title={note.title}
                dayStart={note.dayStart}
                dayEnd={note.dayEnd}
                period={note.period}
                adult={note.adult}
                child={note.child}
                animal={note.animal}
                thumbnail={note.thumbnail}
              />
            );
          })
        )}
      </Container>
    </InfiniteScroll>
  );
};

export default React.memo(MyTravelNote);

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
