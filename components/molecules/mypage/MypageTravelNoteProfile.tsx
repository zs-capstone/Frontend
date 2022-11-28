import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";
import { IMyTravelNoteDataType } from "../../../types/note";
import CoursePeriod from "../../atoms/travel/making-note/detail/CoursePeriod";

const MypageTravelNoteProfile: React.FC<IMyTravelNoteDataType> = (props) => {
  const {
    travelNoteId,
    title,
    dayStart,
    dayEnd,
    period,
    adult,
    child,
    animal,
    thumbnail,
  } = props;

  return (
    <Link href={`/travel/making-note/${travelNoteId}`}>
      <a>
        <Container>
          <ImageContainer>
            <Thumbnail
              src={thumbnail}
              alt={"마이페이지 내 여행 노트 메뉴 노트 썸네일"}
            />
            <CoursePeriodWrapper>
              <CoursePeriod content={period} />
            </CoursePeriodWrapper>
            <Title>{title}</Title>
          </ImageContainer>
          <TextWrapper>
            <DayText>{`${dayStart} ~ ${dayEnd}`}</DayText>
          </TextWrapper>
          <TextWrapper>
            <Wrapper>
              <Image
                src={iconUrl("adult")}
                width={14}
                height={14}
                alt={"마이페이지 내 여행 노트 메뉴 동반인 어른 수"}
              />
              <Text>{`${adult}명`}</Text>
            </Wrapper>
            <Wrapper>
              <Image
                src={iconUrl("kid")}
                width={14}
                height={14}
                alt={"마이페이지 내 여행 노트 메뉴 동반인 아이 수"}
              />
              <Text>{`${child}명`}</Text>
            </Wrapper>
            <Wrapper>
              <Image
                src={iconUrl("pet")}
                width={14}
                height={14}
                alt={"마이페이지 내 여행 노트 메뉴 동반 반려 동물 수"}
              />
              <Text>{`${animal}마리`}</Text>
            </Wrapper>
          </TextWrapper>
        </Container>
      </a>
    </Link>
  );
};

export default MypageTravelNoteProfile;

const Container = styled.div`
  width: 226px;
  height: 206px;
  border: 1px solid ${({ theme }) => theme.color.border1};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 4px;
  position: relative;
  z-index: -2;
  overflow: hidden;

  ${({ theme }) =>
    theme.media.mobile({
      width: "156px",
      height: "206px",
    })}
`;

const Thumbnail = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const DayText = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "132px",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    })}
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
  margin-left: 2px;
`;

const ImageContainer = styled.div`
  width: 226px;
  height: 130px;
  position: relative;
  box-shadow: inset 0px -50px 100px ${({ theme }) => theme.color.grey80};

  ${({ theme }) =>
    theme.media.mobile({
      width: "156px",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.white, 700)};
  position: absolute;
  left: 12px;
  bottom: 16px;
  max-width: 202px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "132px",
    })}
`;

const TextWrapper = styled.span`
  display: flex;
  flex-direction: row;
  margin: 12px 0 0 12px;
`;

const CoursePeriodWrapper = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  margin-right: 10px;

  ${({ theme }) =>
    theme.media.mobile({
      marginRight: "5px",
    })}
`;
