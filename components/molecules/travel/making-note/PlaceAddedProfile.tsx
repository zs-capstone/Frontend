import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import { IPlaceListDataType } from "../../../../types/common";

const PlaceAddedProfile: React.FC<{
  addedList: IPlaceListDataType[];
  place: IPlaceListDataType;
  setAddedList: Dispatch<SetStateAction<IPlaceListDataType[]>>;
}> = (props) => {
  const { addedList, place, setAddedList } = props;

  const handleDeletePlace = (place: IPlaceListDataType) => {
    const index = addedList.findIndex((element) => element === place);
    if (index !== -1) {
      setAddedList([
        ...addedList.slice(0, index),
        ...addedList.slice(index + 1),
      ]);
    }
  };

  return (
    <Container>
      <LeftMenuWrapper>
        <ImageContainer
          src={place.imageUrl}
          alt={`여행 계획 준비 페이지 ${place.title} 여행지 사진`}
        />
        <TextWrapper>
          <Title>{place.title}</Title>
          <Address>{place.address}</Address>
        </TextWrapper>
      </LeftMenuWrapper>
      <RightMenuWrapper>
        <CloseContainer>
          <Image
            onClick={() => handleDeletePlace(place)}
            src={iconUrl("close")}
            width={20}
            height={20}
            alt={"여행 계획 준비페이지 추가된 여행지 삭제 아이콘"}
          />
        </CloseContainer>
      </RightMenuWrapper>
    </Container>
  );
};

export default PlaceAddedProfile;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 3px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border1};
  padding: 12px 10px 0 12px;
  width: 100%;
  height: 90px;
`;

const LeftMenuWrapper = styled.span`
  display: flex;
`;

const RightMenuWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.span`
  margin-left: 12px;
`;

const ImageContainer = styled.img`
  border-radius: 4px;
  object-fit: cover;
  width: 64px;
  height: 64px;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  margin-bottom: 8px;
`;

const Address = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
  ${({ theme }) =>
    theme.media.tabletUnder({
      maxWidth: "200px",
    })}
`;

const CloseContainer = styled.div`
  cursor: pointer;
`;
