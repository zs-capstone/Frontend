import Image from "next/image";
import { iconUrl } from "../../../../axiosInstance/constants";

const ChildButton: React.FC = () => {
  return (
    <Image
      src={iconUrl("kid_button")}
      width={24}
      height={24}
      alt={"아이들이 좋아하는 여행지 표시 아이콘"}
    />
  );
};

export default ChildButton;
