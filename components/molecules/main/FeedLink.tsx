import Image from "next/image";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";
import BorderButton from "../../atoms/ui/Button/BorderButton";

const FeedLink: React.FC = () => {
  return (
    <Container>
      <Title>여행피드 구경하기</Title>
      <Description>다른사람과 여행을 공유해요</Description>
      <BorderButton
        width={"79px"}
        height={"32px"}
        padding={"6px 12px"}
        radius={"7px"}
        fontFamily={"PretendardBold"}
        link={"/feed"}
        shadow
      >
        구경하기
      </BorderButton>
      <NewImageWrapper>
        <Image
          src={iconUrl("new")}
          height={96}
          width={132}
          alt={"신 기능 여행 피드 구경하기를 알리는 new 아이콘"}
        />
      </NewImageWrapper>
      <LightImageWrapper>
        <Image
          src={iconUrl("light")}
          height={93}
          width={93}
          alt={"신 기능 여행 피드 구경하기를 알리는 빛 아이콘"}
        />
      </LightImageWrapper>
      <FirstFeedWrapper>
        <Image
          src={
            "https://yeoreodigm-s3.s3.ap-northeast-2.amazonaws.com/assets/icons/first_feed.webp"
          }
          height={124}
          width={98}
          alt={"여행 피드 첫번째 예시 아이콘"}
          priority
        />
      </FirstFeedWrapper>
      <SecondFeedWrapper>
        <Image
          src={
            "https://yeoreodigm-s3.s3.ap-northeast-2.amazonaws.com/assets/icons/second_feed.webp"
          }
          height={150}
          width={118}
          alt={"여행 피드 두번째 예시 아이콘"}
          priority
        />
      </SecondFeedWrapper>
    </Container>
  );
};

export default FeedLink;

const Container = styled.div`
  width: 964px;
  height: 160px;
  background-color: ${({ theme }) => theme.color.blue};
  border-radius: 10px;
  position: relative;
  padding: 22px 0px 0px 22px;
  overflow: hidden;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "674px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(24, theme.color.white, 700)};
  font-family: "PretendardBold";
  margin-bottom: 10px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      fontSize: "20px",
    })}
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.white, 400)};
  margin-bottom: 20px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      fontSize: "14px",
    })}
`;

const NewImageWrapper = styled.span`
  position: absolute;
  right: 197px;
  top: 5px;
  z-index: 3;

  ${({ theme }) =>
    theme.media.mobile({
      display: "none",
    })}
`;

const LightImageWrapper = styled.span`
  position: absolute;
  right: 189px;
  bottom: 12px;

  ${({ theme }) =>
    theme.media.mobile({
      right: "60px",
      bottom: "0",
    })}
`;

const FirstFeedWrapper = styled.span`
  position: absolute;
  right: 124px;
  top: 40px;
  z-index: 2;

  ${({ theme }) =>
    theme.media.mobile({
      right: "15px",
    })}
`;

const SecondFeedWrapper = styled.span`
  position: absolute;
  right: 34px;
  top: 12px;

  ${({ theme }) =>
    theme.media.mobile({
      right: "-74px",
    })}
`;
