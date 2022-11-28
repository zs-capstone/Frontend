import Image from "next/image";
import { iconUrl } from "../../../../axiosInstance/constants";

const PetButton: React.FC = () => {
  return (
    <Image
      src={iconUrl("pet_button")}
      width={24}
      height={24}
      alt={"반려동물 입장 가능한 여행지 표시 아이콘"}
    />
  );
};

export default PetButton;
