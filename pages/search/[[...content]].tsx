import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import Dropdown from "../../components/atoms/ui/Dropdown/Dropdown";
import TabBar from "../../components/molecules/ui/TabBar";

const SearchPublicTravelNoteProfile = dynamic(
  () =>
    import("../../components/organisms/search/SearchPublicTravelNoteProfile"),
  { suspense: true }
);

const SearchPlaceProfile = dynamic(
  () => import("../../components/organisms/search/SearchPlaceProfile"),
  { suspense: true }
);

const SearchMemberProfile = dynamic(
  () => import("../../components/organisms/search/SearchMemberProfile"),
  { suspense: true }
);

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { content } = router.query;

  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <Container>
      <Wrapper>
        <Content>{`"${
          Array.isArray(content) ? content.join("/") : content || ""
        }"`}</Content>
        <Description>에 대한 검색결과입니다.</Description>
      </Wrapper>
      <TabBar
        selected={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={[
          { title: "여행지", id: 0 },
          { title: "여행노트", id: 1 },
          { title: "유저 이름", id: 2 },
        ]}
      />
      <ContentWrapper>
        {selectedTab === 0 && content && (
          <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
            <SearchPlaceProfile
              content={Array.isArray(content) ? content.join("/") : content}
            />
          </Suspense>
        )}
        {selectedTab === 1 && content && (
          <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
            <SearchPublicTravelNoteProfile
              content={Array.isArray(content) ? content.join("/") : content}
            />
          </Suspense>
        )}
        {selectedTab === 2 && content && (
          <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
            <SearchMemberProfile
              content={Array.isArray(content) ? content.join("/") : content}
            />
          </Suspense>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 964px;
  padding: 0 16px;
  margin: 38px auto 0;
`;

const ContentWrapper = styled.span`
  margin-top: 29px;
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  margin-bottom: 29px;
`;

const Content = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(15, theme.color.main70, 700)};
  font-family: "PretendardBold";
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 780px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      maxWidth: "600px",
    })}
  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "180px",
    })};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};
`;
