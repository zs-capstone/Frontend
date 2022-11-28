import { useRef, useState } from "react";
import styled from "styled-components";
import { useChangeNotePersonnel } from "../../../../hooks/travel/making-note/useChangeNotePersonnel";
import { CommonButton } from "../../../atoms/ui/Button/CommonButton";
import { Spacer } from "../../../atoms/ui/Spacer/Spacer";
import PersonnelInput from "./PersonnelInput";

const PersonnelModal: React.FC<{
  makingNoteId: number;
  adult: number;
  child: number;
  animal: number;
}> = (props) => {
  const { makingNoteId, adult, child, animal } = props;

  const [adultCnt, setAdultCnt] = useState(adult);
  const [childCnt, setChildCnt] = useState(child);
  const [animalCnt, setAnimalCnt] = useState(animal);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const changeNotePersonnelAction = useChangeNotePersonnel(makingNoteId);

  const handleModalClick = () => {
    setModalOpen((prev) => !prev);
    modalRef.current?.focus();
  };

  const handleChangeNotePersonnel = () => {
    changeNotePersonnelAction({
      travelNoteId: makingNoteId,
      adult: adultCnt,
      child: childCnt,
      animal: animalCnt,
    });
    setModalOpen(false);
  };

  return (
    <Container>
      <Button onClick={handleModalClick}>
        성인 {adult}명 / 아동 {child}명 / 반려동물 {animal}마리
      </Button>
      <Modal
        modalOpen={modalOpen}
        ref={modalRef}
        tabIndex={1}
        onBlur={handleChangeNotePersonnel}
      >
        <PersonnelInput
          type="adult"
          isProfile
          number={adultCnt}
          setState={setAdultCnt}
        />
        <Spacer size={16} />
        <PersonnelInput
          type="kid"
          isProfile
          number={childCnt}
          setState={setChildCnt}
        />
        <Spacer size={16} />
        <PersonnelInput
          isProfile
          type="pet"
          number={animalCnt}
          setState={setAnimalCnt}
        />
        <Spacer size={16} />
        <CommonButton
          size={15}
          width={"280px"}
          height={"50px"}
          rWidth={"100%"}
          backgroundColor={"#FA8125"}
          radius={"10px"}
          color={"#FFFFFF"}
          onClick={handleChangeNotePersonnel}
        >
          적용하기
        </CommonButton>
      </Modal>
    </Container>
  );
};

export default PersonnelModal;

const Container = styled.div`
  position: relative;
`;

const Button = styled.div`
  display: flex;
  cursor: pointer;
  height: 52px;
  width: 328px;
  padding: 16px 12px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.border1};
  border-radius: 3px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const Modal = styled.div<{ modalOpen: boolean }>`
  position: absolute;
  top: 0;
  opacity: 0;
  z-index: -1;

  transform: translateX(-100%);
  transition: 0.3s ease;

  ${(props) =>
    props.modalOpen && {
      transform: "translateX(0%)",
      opacity: 1,
      zIndex: 100000,
    }}

  width: 328px;
  height: 294px;
  padding: 20px 24px;
  border: 1px solid ${({ theme }) => theme.color.border2};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.color.white};

  :focus {
    outline: none;
  }

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;
