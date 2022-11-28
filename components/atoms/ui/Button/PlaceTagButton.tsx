import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";

const PlaceTagButton: React.FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  const { setIsOpen } = props;

  return (
    <Button onClick={() => setIsOpen(true)} type="button">
      <Image
        src={iconUrl("plus")}
        height={24}
        width={24}
        alt={"여행 노트 태그를 추가하는 아이콘"}
      />
      <Title>여행지 추가</Title>
    </Button>
  );
};

export default PlaceTagButton;

const Button = styled.button`
  cursor: pointer;
  min-width: 308px;
  height: 147px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.grey30};
  background-color: ${({ theme }) => theme.color.white};
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
  margin-top: 8px;
`;
