import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../../axiosInstance/constants";

const PlaceDetailLike: React.FC<
  Partial<{
    selectedLanguage: string;
    hasLiked: boolean;
    likeCount: number;
    handleLikeChange: () => void;
  }>
> = (props) => {
  const { hasLiked, likeCount, handleLikeChange, selectedLanguage } = props;

  const [like, setLike] = useState<string>("");

  useEffect(() => {
    if (selectedLanguage === "ko") {
      setLike("좋아요");
    } else if (selectedLanguage === "en") {
      setLike("Like");
    } else {
      setLike("喜欢");
    }
  }, [selectedLanguage]);

  return (
    <Container onClick={handleLikeChange}>
      <ImageContainer>
        <Image
          src={hasLiked ? iconUrl("heart_filled") : iconUrl("heart_grey")}
          width={20}
          height={20}
          alt={"여행지 상세 페이지 좋아요 버튼"}
        />
      </ImageContainer>
      <Title>{like}</Title>
      <Count>{likeCount}</Count>
    </Container>
  );
};

export default React.memo(PlaceDetailLike);

const Container = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 144px;
  height: 36px;
  padding: 8px 22px;
  border: 1px solid ${({ theme }) => theme.color.border2};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  border-radius: 48px;
`;

const ImageContainer = styled.div`
  display: flex;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};
`;

const Count = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};
`;
