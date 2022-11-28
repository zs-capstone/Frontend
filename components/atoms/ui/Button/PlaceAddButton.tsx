import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAddRecommendPlace } from "../../../../hooks/travel/making-note/useAddRecommendPlace";
import RadioInput from "../Input/RadioInput";
import { Spacer } from "../Spacer/Spacer";
import { CommonButton } from "./CommonButton";

const PlaceAddButton: React.FC<{
  duration: number;
  makingNoteId: number;
  placeId: number;
}> = (props) => {
  const { duration, makingNoteId, placeId } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [day, setDay] = useState<number>(0);
  const [durationArray, setDurationArray] = useState<null[]>(
    new Array(duration)
  );

  const addRecommendPlaceAction = useAddRecommendPlace(makingNoteId);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleAddRecommendPlace = () => {
    addRecommendPlaceAction({
      travelNoteId: makingNoteId,
      day,
      placeIdList: [placeId],
    });
    setModalOpen(false);
  };

  useEffect(() => {
    setDurationArray(durationArray.fill(null));
  }, [duration, durationArray]);

  return (
    <>
      <Button onClick={handleButtonClick}>+ 추가하기</Button>
      {modalOpen && <BackgroundLayout onClick={() => setModalOpen(false)} />}
      <Modal modalOpen={modalOpen}>
        <DayTitle>몇 일차에 추가할까요?</DayTitle>
        <Spacer size={20} />
        <Wrapper>
          {durationArray.map((_, index) => (
            <RadioInput
              key={index}
              name={"dayRadio"}
              value={index + 1}
              label={index + 1 + "일차"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDay(+e.target.value)
              }
            />
          ))}
        </Wrapper>
        <CommonButton
          size={15}
          width={"296px"}
          height={"50px"}
          backgroundColor={"#FA8125"}
          radius={"10px"}
          color={"#FFFFFF"}
          onClick={handleAddRecommendPlace}
        >
          완료
        </CommonButton>
      </Modal>
    </>
  );
};

export default PlaceAddButton;

const Button = styled.button.attrs({ type: "button" })`
  position: absolute;
  top: 10px;
  right: 8px;
  cursor: pointer;
  padding: 4px 12px;
  width: 85px;
  height: 26px;
  background: rgba(19, 20, 21, 0.5);
  font-size: ${({ theme }) => theme.mixin.fontSize(12, theme.color.white, 700)};
  border-radius: 56px;
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

  width: 328px;
  height: 364px;
  padding: 20px 16px;
  border: 1px solid ${({ theme }) => theme.color.border2};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);

  :focus {
    outline: none;
  }
`;

const DayTitle = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.grey, 700)};
  font-family: "PretendardBold";
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: column;
  height: 200px;
  row-gap: 10px;
  margin-bottom: 30px;
  overflow: auto;

  ${({ theme }) => theme.mixin.scrollStyle(8)};
`;
