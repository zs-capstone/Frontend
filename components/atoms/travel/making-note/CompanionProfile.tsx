import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import { useDeleteCompanion } from "../../../../hooks/travel/making-note/useDeleteCompanion";

const CompanionProfile: React.FC<{
  makingNoteId: number;
  email: string;
  memberId: number;
  nickname: string;
  profileImage: string;
}> = (props) => {
  const { email, makingNoteId, memberId, nickname, profileImage } = props;

  const deleteCompanionAction = useDeleteCompanion(makingNoteId);

  return (
    <Container>
      <Wrapper>
        <Link href={`/member/${memberId}`}>
          <a>
            <ProfileImageContainer>
              <ProfileImage
                src={`${profileImage}?${performance.now()}`}
                alt={"동행자 정보 중 프로필 사진이 존재하는 유저"}
              />
            </ProfileImageContainer>
          </a>
        </Link>
        <TextWrapper>
          <Link href={`/member/${memberId}`}>
            <a>
              <Nickname>{nickname}</Nickname>
            </a>
          </Link>
          <Email>{email}</Email>
        </TextWrapper>
      </Wrapper>
      <ImageContainer>
        <Image
          onClick={() =>
            deleteCompanionAction({ travelNoteId: makingNoteId, memberId })
          }
          src={iconUrl("close")}
          width={20}
          height={20}
          alt={"동행자 정보 프로필 삭제 아이콘"}
        />
      </ImageContainer>
    </Container>
  );
};

export default CompanionProfile;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: 8px 16px 8px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border1};
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
`;

const ProfileImageContainer = styled.div`
  border-radius: 100%;
  overflow: hidden;
`;

const TextWrapper = styled.span`
  margin-left: 24px;
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  margin-bottom: 4px;
`;

const Email = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
`;

const ImageContainer = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  object-fit: cover;
`;
