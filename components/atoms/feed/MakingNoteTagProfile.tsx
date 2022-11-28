import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";
import { CommonButton } from "../ui/Button/CommonButton";

const MakingNoteTagProfile: React.FC<{
  travelNoteId: number;
  title: string;
  dayStart: string;
  dayEnd: string;
  thumbnail: string;
  publicShare: boolean;
  placeCount: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTravelNoteId: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const {
    travelNoteId,
    title,
    dayStart,
    dayEnd,
    thumbnail,
    publicShare,
    placeCount,
    setIsOpen,
    setSelectedTravelNoteId,
  } = props;

  const handleButtonClick = () => {
    setSelectedTravelNoteId(travelNoteId);
    setIsOpen(false);
  };

  return (
    <Container>
      <Thumbnail
        src={thumbnail}
        alt={"피드 여행노트 추가 모달 여행노트 썸네일 이미지"}
      />
      <Body>
        <TextWrapper>
          <PublicShare share={publicShare}>
            {publicShare ? "공개" : "비공개"}
          </PublicShare>
          <Title>{title}</Title>
        </TextWrapper>
        <Day>
          {dayStart} ~ {dayEnd}
        </Day>
        <PlaceWrapper>
          <Image
            src={iconUrl("flag")}
            width={14}
            height={14}
            alt={"피드 여행노트 추가 모달 여행지 개수"}
          />
          <Place>{placeCount}개의 여행지</Place>
        </PlaceWrapper>
      </Body>
      <CommonButton
        onClick={handleButtonClick}
        width={"72px"}
        height={"36px"}
        color={"#FA8125"}
        borderColor={"#FA8125"}
        radius={"12px"}
        size={14}
      >
        선택
      </CommonButton>
    </Container>
  );
};

export default MakingNoteTagProfile;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 358px;
  height: 96px;
  border-radius: 3px;
  padding: 12px 0;
  background: ${({ theme }) => theme.color.white};
  border-bottom: 1px solid ${({ theme }) => theme.color.border1};
  border-radius: 3px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "328px",
    })}
`;

const Thumbnail = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 4px;
  object-fit: cover;
`;

const Body = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  min-width: 200px;

  ${({ theme }) =>
    theme.media.mobile({
      minWidth: "160px",
      marginRight: "8px",
    })}
`;

const TextWrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const PublicShare = styled.p<{ share: boolean }>`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.grey60, 700)};
  width: 38px;
  margin-right: 8px;

  ${(props) =>
    props.share && {
      color: props.theme.color.main50,
    }};
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  max-width: 152px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "112px",
    })}
`;

const Day = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
  margin-bottom: 8px;

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: "13px",
    })}
`;

const PlaceWrapper = styled.span`
  display: flex;
  flex-direction: row;
`;

const Place = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
  margin-left: 4px;
`;
