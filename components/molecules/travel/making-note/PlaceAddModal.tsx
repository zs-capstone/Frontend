import Image from "next/image";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import { useAddRecommendPlace } from "../../../../hooks/travel/making-note/useAddRecommendPlace";
import { makingNoteAddedListState } from "../../../../stores/Travel";
import { IPlaceListDataType } from "../../../../types/common";
import BorderButton from "../../../atoms/ui/Button/BorderButton";
import MakingNoteButton from "../../../atoms/ui/Button/MakingNoteButton";
import { Spacer } from "../../../atoms/ui/Spacer/Spacer";
import AddedList from "../../../organisms/travel/making-note/AddedList";
import SearchList from "../../../organisms/travel/making-note/SearchList";

const PlaceAddModal: React.FC<{ makingNoteId: number; day: number }> = (
  props
) => {
  const { makingNoteId, day } = props;

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [addedList, setAddedList] = useRecoilState<IPlaceListDataType[]>(
    makingNoteAddedListState
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const addRecommendPlaceAction = useAddRecommendPlace(makingNoteId);

  const handleCloseModal = (): void => {
    setModalOpen(false);
    setSearchKeyword("");
    setAddedList([]);
  };

  const handleButtonClick = () => {
    addRecommendPlaceAction({
      travelNoteId: makingNoteId,
      day,
      placeIdList: addedList.map((elem) => elem.placeId),
    });
    setModalOpen(false);
    setSearchKeyword("");
    setAddedList([]);
  };

  return (
    <>
      <BorderButton
        onClick={() => setModalOpen(true)}
        width={"123px"}
        height={"32px"}
        padding={"6px 16px 6px 12px"}
        radius={"48px"}
        shadow
      >
        <PlaceAddWrapper>
          <Image
            src={iconUrl("plus_transparent")}
            height={10}
            width={10}
            alt={"여행 메이킹 노트 여행지 추가 아이콘"}
          />
          <PlaceAdd>여행지 추가</PlaceAdd>
        </PlaceAddWrapper>
      </BorderButton>
      {modalOpen && <BackgroundLayout onClick={handleCloseModal} />}
      <Modal modalOpen={modalOpen}>
        <SearchList
          title={"추가할 여행지"}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          addedList={addedList}
          setAddedList={setAddedList}
        />
        <Spacer size={40} />
        <AddedList addedList={addedList} setAddedList={setAddedList} />
        <MakingNoteButton
          onClick={handleButtonClick}
          disabled={addedList.length === 0}
          width={"554px"}
        >
          추가 후 돌아가기
        </MakingNoteButton>
      </Modal>
    </>
  );
};

export default PlaceAddModal;

const PlaceAddWrapper = styled.span`
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: row;
`;

const PlaceAdd = styled.p`
  margin-left: 8px;
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(15, theme.color.grey90, 700)};
`;

const BackgroundLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

const Modal = styled.div<{ modalOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10000;

  opacity: 0;
  transform: translateX(100vw);
  transition: 0.3s ease;

  ${(props) =>
    props.modalOpen && {
      transform: "translate(-50%,-50%)",
      opacity: 1,
    }}

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  width: 600px;
  height: 720px;
  padding: 20px 16px;
  border: 1px solid ${({ theme }) => theme.color.border2};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);

  :focus {
    outline: none;
  }

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "400px",
      height: "500px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "min(400px,100vw)",
    })}
`;
