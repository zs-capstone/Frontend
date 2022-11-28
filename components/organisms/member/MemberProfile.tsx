import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchFollowState } from "../../../apis/member";
import { useChangeFollowState } from "../../../hooks/auth/useChangeFollowState";
import { queryKeys } from "../../../react-query/constants";
import { IProfileType } from "../../../types/member";
import BorderButton from "../../atoms/ui/Button/BorderButton";
import { CommonButton } from "../../atoms/ui/Button/CommonButton";

const MemberProfile: React.FC<Partial<IProfileType> & { memberId: number }> = (
  props
) => {
  const { memberId, nickname, profileImage, introduction } = props;

  const changeFollowStateAction = useChangeFollowState(memberId);

  const { data: followState } = useQuery<{ follow: boolean }>(
    [queryKeys.followState, memberId],
    () => fetchFollowState(memberId)
  );

  const handleChangeFollowState = () => {
    changeFollowStateAction({
      memberId,
      follow: !followState,
    });
  };

  return (
    <Container>
      <ProfileImage src={profileImage} alt={"유저 상세 페이지 프로필 이미지"} />
      <TextWrapper>
        <FollowWrapper>
          <Nickname>{nickname}</Nickname>
          {followState ? (
            <CommonButton
              width={"96px"}
              height={"36px"}
              onClick={handleChangeFollowState}
              color={"#FFFFFF"}
              size={14}
              backgroundColor={"#FA8125"}
              radius={"12px"}
            >
              팔로잉
            </CommonButton>
          ) : (
            <BorderButton
              onClick={handleChangeFollowState}
              width={"96px"}
              height={"36px"}
              color={"#FA8125"}
              borderColor={"#FA8125"}
              padding={"10px 16px"}
              radius={"12px"}
            >
              팔로우
            </BorderButton>
          )}
        </FollowWrapper>
        <IntroWrapper>
          <Introduction>{introduction}</Introduction>
        </IntroWrapper>
      </TextWrapper>
    </Container>
  );
};

export default MemberProfile;

const Container = styled.div`
  height: 125px;
  ${({ theme }) => theme.mixin.flexCenter()};
`;

const ProfileImage = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 100%;
  object-fit: cover;
`;

const Nickname = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.black, 700)};
  font-family: "PretendardBold";
`;

const TextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const IntroWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  width: 390px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.color.border2};
  border-radius: 8px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "239px",
    })}
`;

const Introduction = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey90)};
`;

const FollowWrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
  align-items: center;
`;
