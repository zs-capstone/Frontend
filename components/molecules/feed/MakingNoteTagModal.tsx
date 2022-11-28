import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery, useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import {
  fetchMyFeedTravelNote,
  fetchMyTravelNoteCount,
} from "../../../apis/note";
import { iconUrl } from "../../../axiosInstance/constants";
import { queryKeys } from "../../../react-query/constants";
import { IMyFeedTravelNoteType } from "../../../types/note";
import MakingNoteTagProfile from "../../atoms/feed/MakingNoteTagProfile";

const MakingNoteTagModal: React.FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTravelNoteId: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const { isOpen, setIsOpen, setSelectedTravelNoteId } = props;

  const { data: count } = useQuery<{ count: number }>(
    queryKeys.myTravelNoteCount,
    () => fetchMyTravelNoteCount()
  );

  const { data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<IMyFeedTravelNoteType>(
      queryKeys.myFeedTravelNote,
      ({ pageParam = 1 }) => fetchMyFeedTravelNote(pageParam, 10),
      {
        getNextPageParam: (lastPage) => lastPage.next || undefined,
        cacheTime: 10000, // 10초
        staleTime: 15000, // 15초
      }
    );

  return (
    <>
      {isOpen && <BackgroundLayout onClick={() => setIsOpen(false)} />}
      <Container isOpen={isOpen}>
        <Wrapper>
          <Title>여행노트 추가</Title>
          <ImageWrapper>
            <Image
              onClick={() => setIsOpen(false)}
              src={iconUrl("cross")}
              width={24}
              height={24}
              alt={"여행노트 추가 모달 닫는 버튼"}
            />
          </ImageWrapper>
        </Wrapper>
        <Count>{`총 ${count}개`}</Count>
        {data?.pages[0].data.length === 0 && (
          <EmptyContainer>
            <Image
              src={iconUrl("empty")}
              width={117}
              height={117}
              alt={"음식점이 비어있음을 알려주는 빈 박스 아이콘"}
            />
            <Text>여행노트가 존재하지 않습니다.</Text>
          </EmptyContainer>
        )}
        <Scrollable id="scrollable">
          <InfiniteScroll
            next={fetchNextPage}
            hasMore={hasNextPage || false}
            scrollableTarget="scrollable"
            loader={<ClipLoader color={"#FA8125"} />}
            dataLength={
              data?.pages.reduce((acc, page) => acc + page.data.length, 0) || 0
            }
          >
            {data?.pages.map((pageData) => {
              return pageData.data.map((element) => {
                return (
                  <MakingNoteTagProfile
                    key={element.travelNoteId}
                    travelNoteId={element.travelNoteId}
                    title={element.title}
                    dayStart={element.dayStart}
                    dayEnd={element.dayEnd}
                    thumbnail={element.thumbnail}
                    publicShare={element.publicShare}
                    placeCount={element.placeCount}
                    setIsOpen={setIsOpen}
                    setSelectedTravelNoteId={setSelectedTravelNoteId}
                  />
                );
              });
            })}
          </InfiniteScroll>
        </Scrollable>
      </Container>
    </>
  );
};

export default MakingNoteTagModal;

const Container = styled.div<{ isOpen: boolean }>`
  width: 390px;
  height: 500px;
  padding: 20px 16px;
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white};
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10000;
  transform: translateX(100vw);

  opacity: 0;
  transition: 0.3s ease;

  ${(props) =>
    props.isOpen && {
      transform: "translate(-50%,-50%)",
      opacity: 1,
    }}

  ${({ theme }) =>
    theme.media.mobile({
      width: "360px",
    })}
`;

const BackgroundLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.grey, 700)};
  font-family: "PretendardBold";
  width: fit-content;
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  cursor: pointer;
`;

const Count = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.main50, 700)};
  font-family: "PretendardBold";
  margin: 20px 0 16px;
  width: fit-content;
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

const Scrollable = styled.div`
  position: relative;
  max-height: 384px;
  overflow: auto;
`;
