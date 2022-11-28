import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPlaceDetailAdditionalInfo } from "../../../../../apis/place/detail";
import { queryKeys } from "../../../../../react-query/constants";
import { IPlaceDetailAdditionalInfoType } from "../../../../../types/place/detail";
import ChildButton from "../../../../atoms/ui/Button/ChildButton";
import PetButton from "../../../../atoms/ui/Button/PetButton";

const PlaceDetailAdditionalProfile: React.FC<{
  placeId: number;
  animal?: boolean;
  child?: boolean;
  selectedLanguage: string;
}> = (props) => {
  const { placeId, animal, child, selectedLanguage } = props;

  const [timeTaken, setTimeTaken] = useState<string>("");
  const [operatingTime, setOperatingTime] = useState<string>("");
  const [admissionFee, setAdmissionFee] = useState<string>("");
  const [petButtonText, setPetButtonText] = useState<string>("");
  const [childButtonText, setChildButtonText] = useState<string>("");

  const { data: additionalInfo } = useQuery<IPlaceDetailAdditionalInfoType>(
    [queryKeys.placeDetailAdditionalInfo, +placeId, selectedLanguage],
    () => fetchPlaceDetailAdditionalInfo(+placeId, selectedLanguage)
  );

  useEffect(() => {
    if (selectedLanguage === "ko") {
      setTimeTaken("소요시간");
      setOperatingTime("운영시간");
      setAdmissionFee("입장료");
      setPetButtonText("반려동물 동반이 가능합니다.");
      setChildButtonText("아이들이 좋아합니다.");
    } else if (selectedLanguage === "en") {
      setTimeTaken("Time Taken");
      setOperatingTime("Operating Time");
      setAdmissionFee("Admission Fee");
      setPetButtonText("Pets are allowed.");
      setChildButtonText("Kids love it.");
    } else {
      setTimeTaken("用的时间");
      setOperatingTime("工作时间");
      setAdmissionFee("入场费.");
      setPetButtonText("入允许携带宠物.");
      setChildButtonText("孩子们喜欢它.");
    }
  }, [selectedLanguage]);

  if (
    !animal &&
    !child &&
    !additionalInfo?.estimatedTime &&
    !additionalInfo?.fee &&
    !additionalInfo?.operatingHours
  ) {
    return <></>;
  }

  return (
    <Container>
      {animal && (
        <Wrapper>
          <PetButton />
          <ButtonText>{petButtonText}</ButtonText>
        </Wrapper>
      )}
      {child && (
        <Wrapper>
          <ChildButton />
          <ButtonText>{childButtonText}</ButtonText>
        </Wrapper>
      )}
      {additionalInfo?.estimatedTime && (
        <Text>
          {timeTaken}: {additionalInfo.estimatedTime}
        </Text>
      )}
      {additionalInfo?.operatingHours && (
        <Text>
          {operatingTime}: {additionalInfo.operatingHours}
        </Text>
      )}
      {additionalInfo?.fee && (
        <Text>
          {admissionFee}: {additionalInfo.fee}
        </Text>
      )}
    </Container>
  );
};

export default PlaceDetailAdditionalProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.color.border2};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  border-radius: 8px;
  padding: 18px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      margin: "0 16px",
    })}
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey90)};
  line-height: 28px;
`;

const ButtonText = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.main50, 700)};
  margin-left: 4px;
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  min-height: 28px;
  align-items: center;
`;
