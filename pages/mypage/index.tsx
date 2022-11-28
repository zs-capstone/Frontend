import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import MypageMenubar from "../../components/molecules/mypage/MypageMenubar";
import MypageProfile from "../../components/molecules/mypage/MypageProfile";
import AccountManage from "../../components/organisms/mypage/AccountManage";
import Withdrawal from "../../components/organisms/mypage/Withdrawal";

const MyTravelNote = dynamic(
  () => import("../../components/organisms/mypage/MyTravelNote"),
  { suspense: true }
);

const PlaceLikeList = dynamic(
  () => import("../../components/organisms/mypage/PlaceLikeList"),
  { suspense: true }
);

const TravelNoteLikeList = dynamic(
  () => import("../../components/organisms/mypage/TravelNoteLikeList"),
  { suspense: true }
);

const MyPhotodigm = dynamic(
  () => import("../../components/organisms/mypage/MyPhotodigmList"),
  { suspense: true }
);

const MyFeed = dynamic(
  () => import("../../components/organisms/mypage/MyFeed"),
  { suspense: true }
);

const FollowList = dynamic(
  () => import("../../components/organisms/mypage/FollowList"),
  { suspense: true }
);

const MypageIndex: NextPage = () => {
  const [selectedMenu, setSelectedMenu] = useState<number>(1);

  return (
    <>
      <MypageProfile />
      <Container>
        <MypageMenubar
          isSelected={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        {selectedMenu === 1 && <AccountManage />}
        {selectedMenu === 2 && (
          <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
            <MyTravelNote />
          </Suspense>
        )}
        {selectedMenu === 3 && (
          <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
            <MyPhotodigm />
          </Suspense>
        )}
        {selectedMenu === 4 && (
          <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
            <MyFeed />
          </Suspense>
        )}
        {selectedMenu === 5 && (
          <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
            <TravelNoteLikeList />
          </Suspense>
        )}
        {selectedMenu === 6 && (
          <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
            <PlaceLikeList />
          </Suspense>
        )}
        {selectedMenu === 7 && (
          <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
            <FollowList />
          </Suspense>
        )}
        {selectedMenu === 8 && <Withdrawal />}
      </Container>
    </>
  );
};

export default MypageIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;

  if (!cookies.nickname) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 964px;
  margin: 30px auto 0px;
  gap: 20px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      gap: "60px",
      marginLeft: "20px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      gap: 0,
      margin: "0 0 40px",
      flexDirection: "column",
      alignItems: "center",
    })}
`;
