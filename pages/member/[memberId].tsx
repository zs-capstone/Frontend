import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchMemberProfile } from "../../apis/member";
import TabBar from "../../components/molecules/ui/TabBar";
import MemberProfile from "../../components/organisms/member/MemberProfile";
import { queryKeys } from "../../react-query/constants";
import { IProfileType } from "../../types/member";

const MemberPublicTravelNote = dynamic(
  () => import("../../components/organisms/member/MemberPublicTravelNote"),
  { suspense: true }
);

const MemberTravelNoteLikedList = dynamic(
  () => import("../../components/organisms/member/MemberTravelNoteLikedList"),
  { suspense: true }
);

const MemberPlaceLikedList = dynamic(
  () => import("../../components/organisms/member/MemberPlaceLikedList"),
  { suspense: true }
);

const MemberDetailPage: NextPage<{ memberId: string }> = ({ memberId }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const { data: profileData } = useQuery<IProfileType>(
    [queryKeys.makingNoteProfile, +memberId],
    () => fetchMemberProfile(+memberId)
  );

  return (
    <Container>
      <MemberProfile
        memberId={+memberId}
        nickname={profileData?.nickname}
        profileImage={profileData?.profileImage}
        introduction={profileData?.introduction}
        defaultProfileImage={profileData?.defaultProfileImage}
      />
      <TabBar
        selected={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={[
          { title: "계획한 여행 노트", id: 0 },
          { title: "좋아요한 여행 노트", id: 1 },
          { title: "좋아요한 여행지", id: 2 },
        ]}
      />
      <ContentWrapper>
        {selectedTab === 0 && (
          <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
            <MemberPublicTravelNote memberId={+memberId} />
          </Suspense>
        )}
        {selectedTab === 1 && (
          <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
            <MemberTravelNoteLikedList memberId={+memberId} />
          </Suspense>
        )}
        {selectedTab === 2 && (
          <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
            <MemberPlaceLikedList memberId={+memberId} />
          </Suspense>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default MemberDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { memberId } = context.query;

  return {
    props: {
      memberId,
    },
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 964px;
  padding: 0 16px;
  margin: 0 auto 0;
`;

const ContentWrapper = styled.span`
  margin-top: 29px;
`;
