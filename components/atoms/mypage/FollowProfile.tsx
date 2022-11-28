import Link from "next/link";
import styled from "styled-components";
import { ICommonMemberType } from "../../../types/common";

const FollowProfile: React.FC<ICommonMemberType> = (props) => {
  const { memberId, profileImage, nickname } = props;

  return (
    <Link href={`/member/${memberId}`}>
      <a>
        <Container>
          <Image
            src={profileImage}
            alt={"팔로워, 팔로잉한 사람 프로필 이미지"}
          />
          <Nickname>{nickname}</Nickname>
        </Container>
      </a>
    </Link>
  );
};

export default FollowProfile;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 226px;
  height: 54px;
  border: 1px solid ${({ theme }) => theme.color.border2};
  border-radius: 12px;
  padding: 12px 16px;
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  object-fit: cover;
`;

const Nickname = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};
  margin-left: 7px;
  width: fit-content;
`;
