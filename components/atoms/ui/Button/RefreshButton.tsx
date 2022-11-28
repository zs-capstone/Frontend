import Image from "next/image";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import { queryKeys } from "../../../../react-query/constants";

const RefreshButton: React.FC = () => {
  const queryClient = useQueryClient();

  const handleButtonClick = () => {
    queryClient.invalidateQueries(queryKeys.makingNotePlacesRecommended);
  };

  return (
    <Button type="button" onClick={handleButtonClick}>
      <Image
        src={iconUrl("refresh")}
        width={24}
        height={24}
        alt={"추천 여행지 새로고침 버튼"}
      />
    </Button>
  );
};

export default RefreshButton;

const Button = styled.button`
  cursor: pointer;
  ${({ theme }) => theme.mixin.flexCenter()};
  width: 48px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.color.border1};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  border-radius: 33px;
  background-color: ${({ theme }) => theme.color.white};
  transition: transform ease 0.3s;

  :hover {
    transform: rotate(90deg);
  }
`;
