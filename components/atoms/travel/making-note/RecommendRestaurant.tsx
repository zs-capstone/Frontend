import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import { CommonButton } from "../../ui/Button/CommonButton";
import RecommendRestaurantModal from "./RecommendRestaurantModal";

const RecommendRestaurant: React.FC<{ placeId: number }> = (props) => {
  const { placeId } = props;

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <Container>
        <Image
          src={iconUrl("restaurant")}
          width={24}
          height={24}
          alt={"여행 메이킹 노트 추천 음식점 아이콘"}
        />
        <Title>추천음식점</Title>
        <CommonButton
          width={"108px"}
          height={"20px"}
          color={"#72787F"}
          backgroundColor={"#F2F3F5"}
          radius={"48px"}
          size={11}
          onClick={() => setModalOpen(true)}
        >
          전체보기
        </CommonButton>
      </Container>
      <RecommendRestaurantModal
        placeId={placeId}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  );
};

export default RecommendRestaurant;

const Container = styled.div`
  position: absolute;
  top: 10px;
  left: 72px;
  width: 220px;
  height: 40px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.border1};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(12, theme.color.grey90)};
  margin: 0 6px 0 8px;
`;
