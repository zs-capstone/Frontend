import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import BorderButton from "../../../atoms/ui/Button/BorderButton";
import { Spacer } from "../../../atoms/ui/Spacer/Spacer";
import CalendarInput from "../../../molecules/travel/making-note/CalendarInput";
import PersonnelModal from "../../../molecules/travel/making-note/PersonnelModal";
import "react-toggle/style.css";
import { getCookie } from "../../../../utils/cookieUtils";
import RecommendedPlace from "../../../molecules/travel/making-note/RecommendedPlace";
import { toast } from "react-toastify";
import { useChangeNoteTitle } from "../../../../hooks/travel/making-note/useChangeNoteTitle";
import { useChangeNotePublicShare } from "../../../../hooks/travel/making-note/useChangeNotePublicShare";
import CompanionModal from "../../../molecules/travel/making-note/CompanionModal";
import { useOptimizeTravelNoteCourse } from "../../../../hooks/travel/making-note/useOptimizeTravelNoteCourse";
import { ITravelNoteRecommendPlaceType } from "../../../../types/recommend";
import { IMakingNoteProfileType } from "../../../../types/note";
import { ClipLoader } from "react-spinners";
import RefreshButton from "../../../atoms/ui/Button/RefreshButton";
import { iconUrl } from "../../../../axiosInstance/constants";

const TravelProfile: React.FC<
  {
    makingNoteId: number;
  } & IMakingNoteProfileType
> = (props) => {
  const { makingNoteId, title, dayStart, dayEnd, adult, child, animal } = props;

  const [startDate, setStartDate] = useState<Date | null>(new Date(dayStart));
  const [endDate, setEndDate] = useState<Date | null>(new Date(dayEnd));
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>(title);

  const cookie = getCookie("nickname");

  const changeNoteTitleAction = useChangeNoteTitle(
    makingNoteId,
    { ...props },
    titleInput
  );
  const changeNotePublicShareAction = useChangeNotePublicShare(makingNoteId);
  const { mutate: optimizeTravelNoteCourseAction, isLoading } =
    useOptimizeTravelNoteCourse(makingNoteId);

  const handleCopyURL = () => {
    let currentUrl = window.document.location.href;
    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);

    toast.success("링크가 복사되었습니다.");
  };

  const handleTitleInput = () => {
    if (!titleInput) {
      toast.error("제목을 입력해주세요.");
      return;
    }
    if (editTitle) {
      changeNoteTitleAction({
        travelNoteId: makingNoteId,
        newTitle: titleInput,
      });
      setEditTitle(false);
    } else {
      setEditTitle(true);
    }
  };

  useEffect(() => {
    cookie ? setIsLogin(true) : setIsLogin(false);
  }, [cookie]);

  return (
    <Container>
      <TitleWrapper>
        {editTitle ? (
          <TitleInput
            value={titleInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitleInput(e.target.value)
            }
            type={"text"}
            spellCheck={false}
          />
        ) : (
          <Title>{title}</Title>
        )}
        <ImageContainer>
          <Image
            onClick={handleTitleInput}
            width={20}
            height={20}
            alt={"여행 메이킹 노트 이름 편집 아이콘"}
            src={iconUrl("edit")}
          />
        </ImageContainer>
      </TitleWrapper>
      <Spacer size={24} />
      <CalendarInput
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <Spacer size={24} />
      <PersonnelModal
        makingNoteId={makingNoteId}
        adult={adult}
        child={child}
        animal={animal}
      />
      <Spacer size={24} />
      <ButtonWrapper>
        <BorderButton onClick={handleCopyURL} width={"100%"}>
          링크공유
        </BorderButton>
        <Spacer size={16} axis={"horizontal"} />
        {isLoading ? (
          <LoaderContainer>
            <ClipLoader color={"#FA8125"} />
          </LoaderContainer>
        ) : (
          <BorderButton
            width={"100%"}
            onClick={() => optimizeTravelNoteCourseAction(makingNoteId)}
          >
            동선 최적화
          </BorderButton>
        )}
      </ButtonWrapper>
      <Spacer size={16} />
      {/* <CompanionModal makingNoteId={makingNoteId} /> */}
      <>
        <Spacer size={25} />
        <RecommendWrapper>
          <span>
            <RecommendTitle>추천 여행지</RecommendTitle>
            <Spacer size={11} />
            <RecommendDescription>
              {isLogin &&
                `${cookie}님과 비슷한 성향의 여행자가 만족한 여행지를 추가로 추천드려요!`}
            </RecommendDescription>
          </span>
          <RefreshButton />
        </RecommendWrapper>
        <Spacer size={16} />
      </>
    </Container>
  );
};

export default TravelProfile;

const Container = styled.div`
  position: relative;
  width: 360px;
  height: fit-content;
  border: 1px solid ${({ theme }) => theme.color.border2};
  border-radius: 8px;
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  padding: 28px 16px;

  ${({ theme }) =>
    theme.media.mobile({
      border: "none",
      boxShadow: "none",
      borderRadius: 0,
      width: "100%",
    })}
`;

const ImageContainer = styled.div`
  cursor: pointer;
  margin-left: 8px;
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(20, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  max-width: 290px;
`;

const TitleWrapper = styled.span`
  display: flex;
`;

const ButtonWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToggleWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const Share = styled.p`
  ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};
  margin-right: 15px;
`;

const RecommendTitle = styled.p`
  ${({ theme }) => theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;

const RecommendDescription = styled.p`
  ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey50)};
  line-height: 18px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlaceWrapper = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 24px;
  place-items: center;
  margin-bottom: 24px;
`;

const TitleInput = styled.input`
  border-bottom: 1px dashed ${({ theme }) => theme.color.border2};
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};
`;

const LoaderContainer = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  width: 100%;
`;

const RecommendWrapper = styled.span`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const MobileWrapper = styled.div`
  display: none;

  ${({ theme }) =>
    theme.media.mobile({
      display: "flex",
    })}
`;
