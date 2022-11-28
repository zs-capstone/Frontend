import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { CommonButton } from "../../../atoms/ui/Button/CommonButton";
import { Spacer } from "../../../atoms/ui/Spacer/Spacer";
import { iconUrl } from "../../../../axiosInstance/constants";

const SurveyResult: React.FC = () => {
  return (
    <Wrapper>
      <Title>감사합니다!</Title>
      <ImageContainer>
        <Image
          width={299}
          height={217}
          src={iconUrl("traveler_companion")}
          alt={"여행지 성향 테스트 결과 페이지의 트래블러 아이콘"}
        />
      </ImageContainer>
      <SurveyMainDescription>
        이제부터 맞춤형 여행지를
        <br />
        추천해드리겠습니다.
      </SurveyMainDescription>
      <SurveySecondaryDescription>
        여행 계획하러 가시죠!
      </SurveySecondaryDescription>
      <Link href="/">
        <a>
          <ResponsiveCommonButton
            width={"328px"}
            height={"50px"}
            backgroundColor={"#FA8215"}
            radius={"10px"}
            size={15}
            color={"#FFFFFF"}
          >
            내 성향에 맞는 여행 계획하기
          </ResponsiveCommonButton>
        </a>
      </Link>
      <Spacer size={16} />
      <Link href="/">
        <a>
          <ResponsiveCommonButton
            width={"328px"}
            height={"50px"}
            backgroundColor={"#FFFFFF"}
            radius={"10px"}
            size={15}
            color={"#131415"}
            borderColor={"#DCE1E5"}
          >
            메인으로
          </ResponsiveCommonButton>
        </a>
      </Link>
    </Wrapper>
  );
};

export default SurveyResult;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 800px;
  height: 771px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.border2};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  margin: 48px 0 53px;

  ${({ theme }) =>
    theme.media.tablet({
      width: "550px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "328px",
      height: "590px",
      margin: "24px 0 21px",
    })}
`;

const Title = styled.h1`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(32, theme.color.grey90, 700)};
  font-family: "NexonBold";
  margin-top: 56px;

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: "20px",
      marginTop: "37px",
    })}
`;

const SurveyMainDescription = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(24, theme.color.grey90, 400)};
  text-align: center;
  font-family: "NexonLight";
  margin: 52px 0 27px;
  line-height: 40px;

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: "15px",
      lineHeight: "29px",
      margin: "33px 0 30px",
    })}
`;

const SurveySecondaryDescription = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(16, theme.color.grey90, 400)};
  font-family: "NexonLight";
  margin-bottom: 39px;

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: "14px",
    })}
`;

const ImageContainer = styled.div`
  width: 299px;
  height: 217px;
  margin-top: 36px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "200px",
      height: "133px",
    })}
`;

const ResponsiveCommonButton = styled(CommonButton)`
  ${({ theme }) =>
    theme.media.mobile({
      width: "296px",
    })}
`;
