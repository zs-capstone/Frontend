import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { getCookie, removeCookie } from "../../../utils/cookieUtils";
import { CommonButton } from "../../atoms/ui/Button/CommonButton";
import SearchInput from "../../molecules/ui/SearchInput";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";
import { iconUrl } from "../../../axiosInstance/constants";

const MainHeader: React.FC<{ setMenuOpen: Dispatch<SetStateAction<boolean>> }> =
  (props) => {
    const { setMenuOpen } = props;

    const [isLogin, setIsLogin] = useState<boolean>(false);

    const router = useRouter();
    const cookie = getCookie("nickname");

    const handleLogout = () => {
      localStorage.removeItem("autoLogin");
      removeCookie("accessToken");
      removeCookie("refreshToken");
      removeCookie("grantType");
      removeCookie("email");
      removeCookie("nickname");
      removeCookie("authority");

      router.push("/");
    };

    useEffect(() => {
      cookie ? setIsLogin(true) : setIsLogin(false);
    }, [cookie]);

    return (
      <Header>
        <Link href="/">
          <a>
            <Logo>
              <LogoSymbolImageContainer>
                <Image
                  width={51}
                  height={41}
                  src={iconUrl("logo_symbol")}
                  alt={"심볼형 메인 로고"}
                />
              </LogoSymbolImageContainer>
              <ResponsiveSpacer size={7} axis={"horizontal"} />
              <LogoTextImageContainer>
                <Image
                  width={118}
                  height={32}
                  src={iconUrl("logo_text")}
                  alt={"텍스트형 메인 로고"}
                />
              </LogoTextImageContainer>
            </Logo>
          </a>
        </Link>
        <Wrapper>
          <SearchInput />
          {isLogin ? (
            <>
              <ResponsiveSpacer size={8} axis={"horizontal"} />
              <Link href="/mypage">
                <a>
                  <ResponsiveButton
                    size={14}
                    height={"36px"}
                    width={"96px"}
                    color={"#454C53"}
                  >
                    내 정보
                  </ResponsiveButton>
                </a>
              </Link>
              <ResponsiveSpacer size={8} axis={"horizontal"} />
              <ResponsiveButton
                onClick={handleLogout}
                size={14}
                height={"36px"}
                width={"96px"}
                color={"#FFFFFF"}
                backgroundColor={"#F17618"}
                radius={"12px"}
              >
                로그아웃
              </ResponsiveButton>
            </>
          ) : (
            <>
              <ResponsiveSpacer size={8} axis={"horizontal"} />
              <Link href="/auth/register">
                <a>
                  <ResponsiveButton
                    size={14}
                    height={"36px"}
                    width={"96px"}
                    color={"#454C53"}
                  >
                    회원가입
                  </ResponsiveButton>
                </a>
              </Link>
              <ResponsiveSpacer size={8} axis={"horizontal"} />
              <Link href="/auth/login">
                <ResponsiveButton
                  size={14}
                  height={"36px"}
                  width={"96px"}
                  color={"#FFFFFF"}
                  backgroundColor={"#F17618"}
                  radius={"12px"}
                >
                  로그인
                </ResponsiveButton>
              </Link>
            </>
          )}
          <Spacer size={20} axis={"horizontal"} />
          <MenuImageContainer>
            <Image
              onClick={() => setMenuOpen(true)}
              src={iconUrl("menu")}
              width={24}
              height={24}
              alt={"헤더 메뉴 아이콘"}
            />
          </MenuImageContainer>
        </Wrapper>
      </Header>
    );
  };

export default MainHeader;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border1};
  padding: 0px 140px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      padding: "0px 16px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      height: "56px",
    })}
`;

const Logo = styled.span`
  ${({ theme }) => theme.mixin.flexCenter()}
  cursor: pointer;
`;

const Wrapper = styled.span`
  ${({ theme }) => theme.mixin.flexCenter()};
`;

const LogoSymbolImageContainer = styled.div`
  width: "51px";
  height: "41px";

  ${({ theme }) =>
    theme.media.mobile({
      display: "none",
    })}
`;

const LogoTextImageContainer = styled.div`
  width: "118px";
  height: "32px";

  ${({ theme }) =>
    theme.media.mobile({
      width: "68px",
      height: "18px",
    })}
`;

const MenuImageContainer = styled.div`
  cursor: pointer;
`;

const ResponsiveButton = styled(CommonButton)`
  ${({ theme }) =>
    theme.media.mobile({
      display: "none",
    })}
`;

const ResponsiveSpacer = styled(Spacer)`
  ${({ theme }) =>
    theme.media.mobile({
      display: "none",
    })}
`;
