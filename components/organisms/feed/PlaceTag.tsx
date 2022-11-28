import { Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPlaceProfile } from "../../../apis/place";
import { queryKeys } from "../../../react-query/constants";
import { IPlaceProfileType } from "../../../types/place";
import { PlaceTagProfile } from "../../atoms/feed/PlaceTagProfile";
import PlaceTagButton from "../../atoms/ui/Button/PlaceTagButton";
import PlaceTagModal from "../../molecules/feed/PlaceTagModal";

const PlaceTag: React.FC<{
  addedPlaceList: number[];
  setAddedPlaceList: Dispatch<SetStateAction<number[]>>;
}> = (props) => {
  const { addedPlaceList, setAddedPlaceList } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: firstPlaceProfile } = useQuery<IPlaceProfileType>(
    [queryKeys.placeProfile, addedPlaceList[0]],
    () => fetchPlaceProfile(addedPlaceList[0]),
    { enabled: !!addedPlaceList.length }
  );

  const { data: secondPlaceProfile } = useQuery<IPlaceProfileType>(
    [queryKeys.placeProfile, addedPlaceList[1]],
    () => fetchPlaceProfile(addedPlaceList[1]),
    { enabled: addedPlaceList.length > 1 }
  );

  const { data: thirdPlaceProfile } = useQuery<IPlaceProfileType>(
    [queryKeys.placeProfile, addedPlaceList[2]],
    () => fetchPlaceProfile(addedPlaceList[2]),
    { enabled: addedPlaceList.length > 2 }
  );

  const { data: fourthPlaceProfile } = useQuery<IPlaceProfileType>(
    [queryKeys.placeProfile, addedPlaceList[3]],
    () => fetchPlaceProfile(addedPlaceList[3]),
    { enabled: addedPlaceList.length > 3 }
  );

  return (
    <Container>
      <Title>여행지 태그 추가</Title>
      <Description>
        관련 여행지를 추가해 주세요. 최대 4개까지 선택할 수 있습니다.
      </Description>
      <Wrapper>
        <PlaceTagButton setIsOpen={setIsOpen} />
        <ProfileWrapper>
          {firstPlaceProfile && (
            <PlaceTagProfile
              imageUrl={firstPlaceProfile.imageUrl}
              title={firstPlaceProfile.title}
              address={firstPlaceProfile.address}
              placeId={addedPlaceList[0]}
              setAddedPlaceList={setAddedPlaceList}
            />
          )}
          {secondPlaceProfile && (
            <PlaceTagProfile
              imageUrl={secondPlaceProfile.imageUrl}
              title={secondPlaceProfile.title}
              address={secondPlaceProfile.address}
              placeId={addedPlaceList[1]}
              setAddedPlaceList={setAddedPlaceList}
            />
          )}
          {thirdPlaceProfile && (
            <PlaceTagProfile
              imageUrl={thirdPlaceProfile.imageUrl}
              title={thirdPlaceProfile.title}
              address={thirdPlaceProfile.address}
              placeId={addedPlaceList[2]}
              setAddedPlaceList={setAddedPlaceList}
            />
          )}
          {fourthPlaceProfile && (
            <PlaceTagProfile
              imageUrl={fourthPlaceProfile.imageUrl}
              title={fourthPlaceProfile.title}
              address={fourthPlaceProfile.address}
              placeId={addedPlaceList[3]}
              setAddedPlaceList={setAddedPlaceList}
            />
          )}
        </ProfileWrapper>
      </Wrapper>
      <PlaceTagModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setAddedPlaceList={setAddedPlaceList}
      />
    </Container>
  );
};

export default PlaceTag;

const Container = styled.div`
  margin: 24px 140px;
  display: flex;
  flex-direction: column;

  ${({ theme }) =>
    theme.media.tabletUnder({
      margin: "24px 16px",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
  margin-bottom: 17px;
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${({ theme }) =>
    theme.media.mobile({
      flexDirection: "column",
      columnGap: 0,
    })}
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) =>
    theme.media.mobile({
      marginTop: "24px",
    })}
`;
