import Image from "next/image";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";

const CommentBox: React.FC<{ commentCount: number }> = (props) => {
  const { commentCount } = props;

  return (
    <Container>
      <Image
        src={iconUrl("comment_primary")}
        alt={"색깔이 입혀진 댓글 달기 버튼"}
        width={12}
        height={12}
      />
      <Count>{commentCount}개</Count>
    </Container>
  );
};

export default CommentBox;

const Container = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  width: 62px;
  height: 24px;
  background-color: ${({ theme }) => theme.color.main10};
  padding: 3px;
  border-radius: 3px;
`;

const Count = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.main50)};
  margin-left: 4px;
`;
