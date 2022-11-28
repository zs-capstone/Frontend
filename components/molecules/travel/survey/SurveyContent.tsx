import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { UseMutateAsyncFunction } from "react-query";
import styled from "styled-components";
import Image from "next/image";
import {
  IGetTravelSurveyType,
  ISubmitTravelSurveyType,
} from "../../../../types/survey";
import { useReissueToken } from "../../../../hooks/auth/useReissueToken";
import { getCookie } from "../../../../utils/cookieUtils";

const SurveyContent: React.FC<{
  questionIndex: number;
  place: IGetTravelSurveyType;
  setQuestionIndex: Dispatch<SetStateAction<number>>;
  onClickAction: UseMutateAsyncFunction<
    void,
    unknown,
    ISubmitTravelSurveyType,
    unknown
  >;
}> = (props) => {
  const router = useRouter();
  const reissueTokenAction = useReissueToken();
  const { questionIndex, place, onClickAction, setQuestionIndex } = props;

  const handleClickSurveyContent = async () => {
    await onClickAction({
      progress: questionIndex,
      contentId: place.contentId,
    });
    if (questionIndex < 10) {
      setQuestionIndex(questionIndex + 1);
    } else {
      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");
      const grantType = getCookie("grantType");

      await reissueTokenAction({ accessToken, refreshToken, grantType });
      router.push("/travel/survey/result");
    }
  };

  return (
    <Container onClick={handleClickSurveyContent}>
      <ImageContainer>
        <Image
          objectFit="cover"
          layout="responsive"
          height={380}
          width={280}
          src={place.imageUrl}
          alt={place.title}
        />
      </ImageContainer>
      <TextWrapper>
        <Title>{place.title}</Title>
        <TagWrapper>
          {place.tag.split(",").map((item, idx) => (
            <Tag key={idx}>#{item}</Tag>
          ))}
        </TagWrapper>
      </TextWrapper>
    </Container>
  );
};

export default SurveyContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 335px;
  height: 610px;
  border: 1px solid ${({ theme }) => theme.color.border2};
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  border-radius: 8px;

  ${({ theme }) =>
    theme.media.mobile({
      flexDirection: "row",
      width: "328px",
      height: "198px",
    })}
`;

const ImageContainer = styled.div`
  height: 380px;
  width: 280px;
  border-radius: 8px;
  margin: 16px 0 32px;
  overflow: hidden;

  ${({ theme }) =>
    theme.media.mobile({
      flexDirection: "row",
      width: "139px",
      height: "150px",
      margin: "0 4px 0 16px",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(24, theme.color.grey90, 400)};
  font-family: "Nexon";

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: "18px",
    })}
`;

const TagWrapper = styled.span`
  margin-top: 27px;
  max-width: 180px;
  line-height: 25px;
  text-align: center;

  ${({ theme }) =>
    theme.media.mobile({
      marginTop: "9px",
    })}
`;

const Tag = styled.p`
  display: inline-block;
  word-break: break-all;
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(16, theme.color.grey90, 400)};
  font-family: "NexonLight";
  margin: 0px 4px;
`;

const TextWrapper = styled.span`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
