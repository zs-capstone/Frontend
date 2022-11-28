import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";
import { useLogout } from "../../../hooks/auth/useLogout";
import { getCookie } from "../../../utils/cookieUtils";
import { Menu } from "../../atoms/menu/Menu";
import BorderButton from "../../atoms/ui/Button/BorderButton";
import { CommonButton } from "../../atoms/ui/Button/CommonButton";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";

const Menubar: React.FC<{
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  const { menuOpen, setMenuOpen } = props;

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const logoutAction = useLogout();
  const cookie = getCookie("nickname");

  useEffect(() => {
    cookie ? setIsLogin(true) : setIsLogin(false);
  }, [cookie]);

  return (
    <Container menuOpen={menuOpen}>
      <Spacer size={23} />
      <Status>{isLogin ? `${cookie}님` : "로그인 해주세요!"}</Status>
      <Cross
        onClick={() => setMenuOpen(false)}
        src={iconUrl("cross")}
        alt={"메뉴바 창 닫기 아이콘"}
      />
      <Spacer size={29} />
      {isLogin ? (
        <Wrapper>
          <BorderButton link="/mypage" height={"38px"} width={"96px"}>
            내 정보
          </BorderButton>
          <Spacer size={11} axis={"horizontal"} />
          <CommonButton
            onClick={() => logoutAction()}
            size={14}
            height={"36px"}
            width={"96px"}
            color={"#FFFFFF"}
            backgroundColor={"#F17618"}
            radius={"8px"}
          >
            로그아웃
          </CommonButton>
        </Wrapper>
      ) : (
        <Wrapper>
          <BorderButton link="/auth/register" height={"38px"} width={"96px"}>
            회원가입
          </BorderButton>
          <Spacer size={11} axis={"horizontal"} />
          <Link href="/auth/login">
            <a>
              <CommonButton
                size={14}
                height={"36px"}
                width={"96px"}
                color={"#FFFFFF"}
                backgroundColor={"#F17618"}
                radius={"8px"}
              >
                로그인
              </CommonButton>
            </a>
          </Link>
        </Wrapper>
      )}
      <Spacer size={21} />
      <ul>
        <Menu link="/travel/making-note/advance" content="계획하러가기" />
        <Menu link="/feed" content="여행피드 구경하기" />
        <Menu link="https://open.kakao.com/o/sDwDsjEe" content="고객센터" />
      </ul>
    </Container>
  );
};

export default Menubar;

const Container = styled.aside<{ menuOpen: boolean }>`
  position: fixed;
  z-index: 10000;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.color.white};
  height: 100vh;
  width: 415px;

  transform: translateX(100%);
  opacity: 0;
  transition: 0.3s ease;

  ${(props) =>
    props.menuOpen && {
      transform: "translateX(0%)",
      opacity: 1,
    }}

  ${({ theme }) =>
    theme.media.mobile({
      width: "287px",
    })};
`;

const Status = styled.p`
  margin-left: 16px;
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(24, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;

const Cross = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  cursor: pointer;
  top: 26px;
  right: 24px;
`;

const Wrapper = styled.span`
  display: flex;
  margin-left: 16px;
`;
