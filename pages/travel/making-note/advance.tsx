import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loaderDestUrl } from "../../../axiosInstance/constants";
import MakingNoteButton from "../../../components/atoms/ui/Button/MakingNoteButton";
import { Spacer } from "../../../components/atoms/ui/Spacer/Spacer";
import AddedList from "../../../components/organisms/travel/making-note/AddedList";
import Duration from "../../../components/organisms/travel/making-note/Duration";
import MakingNoteName from "../../../components/organisms/travel/making-note/MakingNoteName";
import MaxPerDay from "../../../components/organisms/travel/making-note/MaxPerDay";
import Personnel from "../../../components/organisms/travel/making-note/Personnel";
import PublicShare from "../../../components/organisms/travel/making-note/PublicShare";
import SearchList from "../../../components/organisms/travel/making-note/SearchList";
import { useSubmitMakingNoteAdvance } from "../../../hooks/travel/making-note/useSubmitMakingNoteAdvance";
import { addedListState } from "../../../stores/Travel";
import { IPlaceListDataType } from "../../../types/common";
import { dateToString } from "../../../utils/dateUtils";

const MakingNoteAdvance: NextPage = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [adult, setAdult] = useState<number>(0);
  const [kid, setKid] = useState<number>(0);
  const [pet, setPet] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [placeCount, setPlaceCount] = useState<number>(1);
  const [makingNoteButtonDisabled, setMakingNoteButtonDisabled] =
    useState<boolean>(true);
  const [shareOther, setShareOther] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [addedList, setAddedList] =
    useRecoilState<IPlaceListDataType[]>(addedListState);

  const { mutate: submitMakingNoteAdvanceAction, isLoading } =
    useSubmitMakingNoteAdvance();

  const handleMakingNoteAdvanceAction = () => {
    if (!startDate || !endDate) {
      return;
    }

    submitMakingNoteAdvanceAction({
      title,
      dayStart: dateToString(startDate),
      dayEnd: dateToString(endDate),
      adult: adult.toString(),
      publicShare: shareOther ? "true" : "false",
      child: kid.toString(),
      animal: pet.toString(),
      maxPlacePerDay: placeCount.toString(),
      placeList: addedList.map((elem) => elem.placeId),
    });
  };

  useEffect(() => {
    if (
      (!adult && !kid && !pet) ||
      !startDate ||
      !endDate ||
      !placeCount ||
      !title
    ) {
      setMakingNoteButtonDisabled(true);
    } else {
      setMakingNoteButtonDisabled(false);
    }
  }, [startDate, endDate, adult, kid, pet, placeCount, title]);

  return (
    <Container>
      {isLoading ? (
        <>
          <BackgroundLayout />
          <MakingContainer>
            <Image
              src={loaderDestUrl}
              alt={"AI ?????? ??????????????? ????????? gif"}
              width={120}
              height={120}
            />
            <MakingText>AI??? ?????? ????????? ???????????? ?????????.</MakingText>
          </MakingContainer>
        </>
      ) : (
        <>
          <LeftMenuWrapper>
            <Duration
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <Spacer size={4} />
            <MakingNoteName title={title} setTitle={setTitle} />
            <Spacer size={4} />
            <Personnel
              adult={adult}
              kid={kid}
              pet={pet}
              setAdult={setAdult}
              setKid={setKid}
              setPet={setPet}
            />
            <Spacer size={4} />
            <PublicShare
              shareOther={shareOther}
              setShareOther={setShareOther}
            />
            <Spacer size={4} />
            <MaxPerDay placeCount={placeCount} setPlaceCount={setPlaceCount} />
            <Spacer size={4} />
          </LeftMenuWrapper>
          <RightMenuWrapper>
            <SearchList
              title={"??? ??????????????? ?????????"}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              addedList={addedList}
              setAddedList={setAddedList}
            />
            <Spacer size={40} />
            <AddedList addedList={addedList} setAddedList={setAddedList} />
            <MakingNoteButton
              disabled={makingNoteButtonDisabled}
              onClick={handleMakingNoteAdvanceAction}
              width={"554px"}
            >
              ????????? ??????
            </MakingNoteButton>
          </RightMenuWrapper>
        </>
      )}
    </Container>
  );
};

export default MakingNoteAdvance;

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
  justify-content: center;
  max-width: 964px;
  margin: 32px auto 0px;

  ${({ theme }) =>
    theme.media.mobile({
      flexDirection: "column",
      maxWidth: "100%",
      marginTop: 0,
    })}
`;

const LeftMenuWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 50px;
  margin-bottom: 36px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      marginRight: "32px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      margin: "0",
    })}
`;

const RightMenuWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 36px;
  width: 100%;
`;

const ResponsiveSpacer = styled(Spacer)`
  ${({ theme }) =>
    theme.media.mobile({
      display: "none",
    })}
`;

const MakingText = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.main50, 700)};
  font-family: "PretendardBold";
  margin-top: 20px;
`;

const MakingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 10000;
  top: 50%;
  left: 50%;
`;

const BackgroundLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.color.white};
  z-index: 9999;
`;
