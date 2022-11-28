import Image from "next/image";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";

const Likes: React.FC<{
  hasLiked: boolean;
  likeCount: number;
}> = (props) => {
  const { hasLiked, likeCount } = props;

  return (
    <Container>
      <Image
        src={hasLiked ? iconUrl("heart_filled") : iconUrl("heart")}
        width={14}
        height={14}
        alt={"코스나 여행지에 좋아요를 누를 수 있는 아이콘"}
      />
      <LikesCount>{likeCount}</LikesCount>
    </Container>
  );
};

export default Likes;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50px;
  height: 26px;
  padding: 4px 8px;
  border-radius: 56px;
  background: rgba(19, 20, 21, 0.2);
`;

const LikesCount = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(12, theme.color.white, 700)};
`;
