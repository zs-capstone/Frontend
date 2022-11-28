import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  fetchMyFolloweeCount,
  fetchMyFolloweeList,
  fetchMyFollowerCount,
  fetchMyFollowerList,
} from "../../../apis/member";
import { queryKeys } from "../../../react-query/constants";
import { ICommonMemberType } from "../../../types/common";
import FollowProfile from "../../atoms/mypage/FollowProfile";
import TabBar from "../../molecules/ui/TabBar";

const tabs = [
  { title: "팔로워", id: 1 },
  { title: "팔로잉", id: 2 },
];

const FollowList: React.FC = () => {
  const [selected, setSelectedTab] = useState<number>(1);

  const { data: myFollowList } = useQuery<ICommonMemberType[]>(
    [queryKeys.followList, selected],
    selected === 1 ? () => fetchMyFollowerList() : () => fetchMyFolloweeList()
  );

  const { data: myFollowCount } = useQuery<{ count: number }>(
    [queryKeys.followCount, selected],
    selected === 1 ? () => fetchMyFollowerCount() : () => fetchMyFolloweeCount()
  );

  return (
    <Container>
      <TabBar tabs={tabs} selected={selected} setSelectedTab={setSelectedTab} />
      {<Count>{`총 ${myFollowCount || 0}명`}</Count>}
      <ProfileContainer>
        {myFollowList?.map((follow) => (
          <FollowProfile
            key={follow.memberId}
            memberId={follow.memberId}
            nickname={follow.nickname}
            profileImage={follow.profileImage}
          />
        ))}
      </ProfileContainer>
    </Container>
  );
};

export default FollowList;

const Container = styled.div`
  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
      marginTop: "40px",
    })}
`;

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 10px;
  row-gap: 14px;
  margin-top: 14px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      gridTemplateColumns: "1fr 1fr",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      padding: "0 14px",
      placeItems: "center",
    })}
`;

const Count = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};
  margin-top: 21px;
  width: fit-content;

  ${({ theme }) =>
    theme.media.mobile({
      padding: "0 14px",
    })}
`;
