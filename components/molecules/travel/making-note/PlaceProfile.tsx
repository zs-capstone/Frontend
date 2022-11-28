import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { IPlaceListDataType } from "../../../../types/common";
import CheckboxInput from "../../../atoms/ui/Input/CheckboxInput";

const PlaceProfile: React.FC<{
  place: IPlaceListDataType;
  addedList: IPlaceListDataType[];
  setAddedList: Dispatch<SetStateAction<IPlaceListDataType[]>>;
}> = (props) => {
  const { place, addedList, setAddedList } = props;

  const handleAddedList = (place: IPlaceListDataType) => {
    const index = addedList.findIndex(
      (element) => element.placeId === place.placeId
    );
    if (index !== -1) {
      setAddedList([
        ...addedList.slice(0, index),
        ...addedList.slice(index + 1),
      ]);
    } else {
      setAddedList([...addedList, place]);
    }
  };

  return (
    <Container>
      <LeftMenuWrapper>
        <ImageContainer imageUrl={place.imageUrl} />
        <TextWrapper>
          <Title>{place.title}</Title>
          <Address>{place.address}</Address>
        </TextWrapper>
      </LeftMenuWrapper>
      <RightMenuWrapper>
        <CheckboxInput
          checked={
            !!addedList.find((element) => element.placeId === place.placeId)
          }
          tabIndex={1}
          onChange={() => handleAddedList(place)}
        />
      </RightMenuWrapper>
    </Container>
  );
};

export default PlaceProfile;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 3px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border1};
  padding: 12px 10px 0px 12px;
  height: 90px;
  width: 100%;
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

const ImageContainer = styled.div<{ imageUrl: string }>`
  border-radius: 4px;
  background: url(${(props) => props.imageUrl});
  background-size: cover;
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
