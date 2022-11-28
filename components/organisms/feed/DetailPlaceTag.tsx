import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPlaceProfile } from "../../../apis/place";
import { queryKeys } from "../../../react-query/constants";
import { IPlaceProfileType } from "../../../types/place";
import { DetailPlaceTagProfile } from "../../atoms/feed/PlaceTagProfile";

const DetailPlaceTag: React.FC<{ placeTag: number[] }> = (props) => {
  const { placeTag } = props;

  const { data: firstPlaceProfile } = useQuery<IPlaceProfileType>(
    [queryKeys.placeProfile, placeTag[0]],
    () => fetchPlaceProfile(placeTag[0]),
    { enabled: !!placeTag.length }
  );

  const { data: secondPlaceProfile } = useQuery<IPlaceProfileType>(
    [queryKeys.placeProfile, placeTag[1]],
    () => fetchPlaceProfile(placeTag[1]),
    { enabled: placeTag.length > 1 }
  );

  const { data: thirdPlaceProfile } = useQuery<IPlaceProfileType>(
    [queryKeys.placeProfile, placeTag[2]],
    () => fetchPlaceProfile(placeTag[2]),
    { enabled: placeTag.length > 2 }
  );

  const { data: fourthPlaceProfile } = useQuery<IPlaceProfileType>(
    [queryKeys.placeProfile, placeTag[3]],
    () => fetchPlaceProfile(placeTag[3]),
    { enabled: placeTag.length > 3 }
  );

  return (
    <Container>
      {firstPlaceProfile && (
        <DetailPlaceTagProfile
          imageUrl={firstPlaceProfile.imageUrl}
          title={firstPlaceProfile.title}
          address={firstPlaceProfile.address}
          placeId={firstPlaceProfile.placeId}
        />
      )}
      {secondPlaceProfile && (
        <DetailPlaceTagProfile
          imageUrl={secondPlaceProfile.imageUrl}
          title={secondPlaceProfile.title}
          address={secondPlaceProfile.address}
          placeId={secondPlaceProfile.placeId}
        />
      )}
      {thirdPlaceProfile && (
        <DetailPlaceTagProfile
          imageUrl={thirdPlaceProfile.imageUrl}
          title={thirdPlaceProfile.title}
          address={thirdPlaceProfile.address}
          placeId={thirdPlaceProfile.placeId}
        />
      )}
      {fourthPlaceProfile && (
        <DetailPlaceTagProfile
          imageUrl={fourthPlaceProfile.imageUrl}
          title={fourthPlaceProfile.title}
          address={fourthPlaceProfile.address}
          placeId={fourthPlaceProfile.placeId}
        />
      )}
    </Container>
  );
};

export default DetailPlaceTag;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
