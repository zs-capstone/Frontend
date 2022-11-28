import Link from "next/link";
import styled from "styled-components";
import { ICommonMemberType } from "../../../types/common";

const MemberSearchProfile: React.FC<ICommonMemberType> = (props) => {
  const { memberId, profileImage, nickname } = props;

  return (
    <Link href={`/member/${memberId}`}>
      <a>
        <Container>
          <Image
            src={profileImage}
            alt={"맴버 검색 페이지 멤버 프로필 이미지"}
          />
          <Wrapper>
            <Nickname>{nickname}</Nickname>
          </Wrapper>
        </Container>
      </a>
    </Link>
  );
};

export default MemberSearchProfile;

const Container = styled.div`
  width: 180px;
  height: 180px;
  padding: 4px;
  position: relative;

  ${({ theme }) =>
    theme.media.mobile({
      width: "140px",
      height: "140px",
    })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  object-fit: cover;
`;

const Nickname = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.white)};
`;

const Wrapper = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  width: fit-content;
  height: 39px;
  background-color: rgba(19, 20, 21, 0.5);
  border-radius: 56px;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 4px 12px;
`;
