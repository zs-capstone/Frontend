import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { Spacer } from "../../ui/Spacer/Spacer";
import RecommendRestaurantList from "./RecommendRestaurantList";
import RecommendRestaurantType from "./RecommendRestaurantType";

const RecommendRestaurantModal: React.FC<{
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  placeId: number;
}> = (props) => {
  const { modalOpen, setModalOpen, placeId } = props;

  const [selectedType, setSelectedType] = useState<number>(1);

  return (
    <>
      {modalOpen && <BackgroundLayout onClick={() => setModalOpen(false)} />}
      <Container modalOpen={modalOpen}>
        <Title>추천 음식점</Title>
        <RecommendRestaurantType
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <Spacer size={16} />
        <RecommendRestaurantList
          selectedType={selectedType}
          placeId={placeId}
        />
      </Container>
    </>
  );
};

export default RecommendRestaurantModal;

const Container = styled.div<{ modalOpen: boolean }>`
  width: 472px;
  height: 502px;
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10000;
  transform: translateX(100vw);
  padding: 20px 16px;

  opacity: 0;
  transition: 0.3s ease;

  ${(props) =>
    props.modalOpen && {
      transform: "translate(-50%,-50%)",
      opacity: 1,
    }}

  ${({ theme }) =>
    theme.media.mobile({
      width: "360px",
    })}
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

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.grey, 700)};
  font-family: "PretendardBold";
  margin-bottom: 16px;
`;
