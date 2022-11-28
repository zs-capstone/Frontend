import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { IPlaceListDataType } from "../../../../types/common";
import { Spacer } from "../../../atoms/ui/Spacer/Spacer";
import PlaceAddedProfile from "../../../molecules/travel/making-note/PlaceAddedProfile";

const AddedList: React.FC<{
  addedList: IPlaceListDataType[];
  setAddedList: Dispatch<SetStateAction<IPlaceListDataType[]>>;
}> = (props) => {
  const { addedList, setAddedList } = props;

  const [listMenuOpen, setListMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (addedList.length > 0) {
      setListMenuOpen(true);
    } else {
      setListMenuOpen(false);
    }
  }, [addedList.length]);

  useEffect(() => {
    return () => setAddedList([]);
  }, [setAddedList]);

  return (
    <Container listMenuOpen={listMenuOpen}>
      <TitleWrapper>
        <Title>추가된 여행지</Title>
        <Total>총 {addedList.length}개</Total>
      </TitleWrapper>
      <Spacer size={24} />
      <Wrapper>
        {addedList.map((place) => {
          return (
            <PlaceAddedProfile
              addedList={addedList}
              place={place}
              setAddedList={setAddedList}
              key={place.placeId}
            />
          );
        })}
      </Wrapper>
    </Container>
  );
};

export default AddedList;

const Container = styled.section<{ listMenuOpen: boolean }>`
  opacity: 0;
  height: 0;
  width: 0;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  border-top: 4px solid ${({ theme }) => theme.color.background};

  ${(props) =>
    props.listMenuOpen && {
      height: "fit-content",
      width: "100%",
      transform: "translateY(0%)",
      opacity: 1,
      marginBottom: "59px",
    }};

  ${({ theme }) =>
    theme.media.mobile({
      padding: "0 16px",
    })}
`;

const TitleWrapper = styled.span`
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Total = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.main50, 700)};
`;

const Wrapper = styled.div`
  width: 100%;
  max-height: 450px;
  overflow: auto;

  ${({ theme }) => theme.mixin.scrollStyle(8)};
`;

const Title = styled.h1`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;
