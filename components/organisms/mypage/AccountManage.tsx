import styled from "styled-components";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";
import MypageNickname from "../../molecules/mypage/MypageNickname";
import MypageOriginPassword from "../../molecules/mypage/MypageOriginPassword";
import MypagePassword from "../../molecules/mypage/MypagePassword";

const AccountManage: React.FC = () => {
  return (
    <Wrapper>
      <MypageNickname />
      <Spacer size={120} />
      <MypageOriginPassword />
      <Spacer size={24} />
      <MypagePassword />
    </Wrapper>
  );
};

export default AccountManage;

const Wrapper = styled.span`
  display: flex;
  flex-direction: column;

  ${({ theme }) =>
    theme.media.tabletUnder({
      maxWidth: "328px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      marginTop: "40px",
    })}
`;
