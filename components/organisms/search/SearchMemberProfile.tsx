import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchIntegratedMemberSearchList } from "../../../apis/search";
import { iconUrl } from "../../../axiosInstance/constants";
import { queryKeys } from "../../../react-query/constants";
import { IIntegratedMemberSearchListType } from "../../../types/search";
import MemberSearchProfile from "../../molecules/search/MemberSearchProfile";

const SearchMemberProfile: React.FC<{ content: string }> = (props) => {
  const { content } = props;

  const { data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<IIntegratedMemberSearchListType>(
      [queryKeys.searchMember, content],
      ({ pageParam = 1 }) =>
        fetchIntegratedMemberSearchList(content, pageParam, 16),
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
          alt={"유저가 비어있음을 알려주는 빈 박스 아이콘"}
        />
        <Text>검색 결과가 존재하지 않습니다.</Text>
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
          pageData.data.map((member) => {
            return (
              <MemberSearchProfile
                key={member.memberId}
                memberId={member.memberId}
                profileImage={member.profileImage}
                nickname={member.nickname}
              />
            );
          })
        )}
      </Container>
    </InfiniteScroll>
  );
};

export default SearchMemberProfile;

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
      gridTemplateColumns: "repeat(auto-fill, minmax(144px, 1fr))",
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
