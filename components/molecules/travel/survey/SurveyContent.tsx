import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import {
  IGetTravelSurveyType,
  ISubmitTravelSurveyType,
} from "../../../../types/survey";
import { Dispatch, SetStateAction, useRef } from "react";
import StarRatings from "react-star-ratings";
import { useSubmitTravelSurvey } from "../../../../hooks/travel/survey/useSubmitTravelSurvey";

const SurveyContent: React.FC<{
  place: IGetTravelSurveyType;
  questionIndex: number;
  setSurveyIndex: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const router = useRouter();
  const { place, questionIndex, setSurveyIndex } = props;

  const submitResult = useRef<ISubmitTravelSurveyType[]>([]);

  const submitTravelSurveyAction = useSubmitTravelSurvey();

  const changeRating = (newRating: number) => {
    submitResult.current.push({
      placeId: place.id,
      rate: newRating,
    });

    if (questionIndex === 20) {
      submitTravelSurveyAction(submitResult.current);
      router.push("/travel/survey/result");
    } else {
      setSurveyIndex((prev) => prev + 1);
    }
  };

  return (
    <Container>
      <ImageContainer>
        <Image
          priority
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
        <StarRatings numberOfStars={5} changeRating={changeRating} />
      </TextWrapper>
    </Container>
  );
};

export default SurveyContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 20px;

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
