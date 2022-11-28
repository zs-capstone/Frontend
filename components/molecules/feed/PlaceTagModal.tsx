import { Dispatch, SetStateAction, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { makingNoteAddedListState } from "../../../stores/Travel";
import { IPlaceListDataType } from "../../../types/common";
import MakingNoteButton from "../../atoms/ui/Button/MakingNoteButton";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";
import AddedList from "../../organisms/travel/making-note/AddedList";
import SearchList from "../../organisms/travel/making-note/SearchList";

const PlaceTagModal: React.FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setAddedPlaceList: Dispatch<SetStateAction<number[]>>;
}> = (props) => {
  const { isOpen, setIsOpen, setAddedPlaceList } = props;

  const [addedList, setAddedList] = useRecoilState<IPlaceListDataType[]>(
    makingNoteAddedListState
  );

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleCloseModal = (): void => {
    setIsOpen(false);
    setSearchKeyword("");
    setAddedList([]);
  };

  const handleButtonClick = () => {
    setAddedPlaceList(addedList.map((item) => item.placeId));
    setIsOpen(false);
    setSearchKeyword("");
    setAddedList([]);
  };

  return (
    <>
      {isOpen && <BackgroundLayout onClick={handleCloseModal} />}
      <Modal isOpen={isOpen}>
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
          width={"554px"}
          disabled={addedList.length === 0}
        >
          추가 후 돌아가기
        </MakingNoteButton>
      </Modal>
    </>
  );
};

export default PlaceTagModal;

const BackgroundLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10000;

  opacity: 0;
  transform: translateX(100vw);
  transition: 0.3s ease;

  ${(props) =>
    props.isOpen && {
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
