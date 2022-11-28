import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { CommonButton } from "../../../atoms/ui/Button/CommonButton";
import { iconUrl } from "../../../../axiosInstance/constants";

const SurveyIndex: React.FC = () => {
  return (
    <Container>
      <ImageContainer>
        <Image
          width={230}
          height={267}
          src={iconUrl("traveler")}
          alt="여행지 성향 테스트 페이지의 트래블러 아이콘"
        />
      </ImageContainer>
      <SurveyTitle>내 여행지 성향은 어떨까?</SurveyTitle>
      <SurveyDescription>
        마음에 드는 여행지를 선택하고
        <br />
        여행지 성향 테스트 해보세요
      </SurveyDescription>
      <Link href="/travel/survey/question">
        <a>
          <SurveyStartButton
            width={"328px"}
            height={"50px"}
            radius={"10px"}
            size={15}
            color={"#FFFFFF"}
            backgroundColor={"#FA8125"}
          >
            시작하기
          </SurveyStartButton>
        </a>
      </Link>
      <SurveyRefer>*결과는 추후 맞춤 여행 추천에 활용됩니다.</SurveyRefer>
    </Container>
  );
};

export default SurveyIndex;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 800px;
  height: 771px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.border2};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  margin: 40px 0 53px;

  ${({ theme }) =>
    theme.media.tablet({
      width: "550px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "328px",
      height: "590px",
      margin: "14px 0 21px",
    })}
`;

const SurveyStartButton = styled(CommonButton)`
  ${({ theme }) =>
    theme.media.mobile({
      width: "296px",
    })}
`;

const ImageContainer = styled.div`
  margin: 100px 0 51px;
  width: 230px;
  height: 267px;

  ${({ theme }) =>
    theme.media.mobile({
      margin: "29px 0 33px",
      width: "200px",
      height: "233px",
    })}
`;

const SurveyTitle = styled.p`
  margin-bottom: 31px;
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(24, theme.color.grey90, 400)};
  font-family: "Nexon";

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: 20,
    })}
`;

const SurveyDescription = styled.p`
  width: 218px;
  line-height: 25px;
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(16, theme.color.grey90, 400)};
  font-family: "NexonLight";
  text-align: center;
  margin-bottom: 62px;

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: 15,
      marginBottom: "46px",
    })}
`;

const SurveyRefer = styled.p`
  margin-top: 72px;
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.grey90, 400)};
  font-family: "NexonLight";

  ${({ theme }) =>
    theme.media.mobile({
      marginTop: "33px",
    })}
`;
