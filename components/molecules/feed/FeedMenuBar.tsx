import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { getCookie } from "../../../utils/cookieUtils";

const FeedMenuBar: React.FC<{
  setOption: Dispatch<SetStateAction<number | null>>;
}> = (props) => {
  const { setOption } = props;

  const [selectedMenu, setSelectedMenu] = useState<number>(1);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const cookie = getCookie("nickname");

  const handleSelectMenu = (id: number) => {
    if (id === 2) {
      setSelectedMenu(2);
      setOption(21);
    } else if (id === 1) {
      setSelectedMenu(1);
      setOption(null);
    } else {
      setSelectedMenu(3);
      setOption(31);
    }
  };

  useEffect(() => {
    cookie ? setIsLogin(true) : setIsLogin(false);
  }, [cookie]);

  return (
    <Container>
      <MenuWrapper>
        <Menu selected={selectedMenu === 1} onClick={() => handleSelectMenu(1)}>
          인기
        </Menu>
        <Menu selected={selectedMenu === 2} onClick={() => handleSelectMenu(2)}>
          최신
        </Menu>
        {isLogin && (
          <Menu
            selected={selectedMenu === 3}
            onClick={() => handleSelectMenu(3)}
          >
            팔로잉
          </Menu>
        )}
      </MenuWrapper>
    </Container>
  );
};

export default FeedMenuBar;

const Container = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  height: 56px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border1};
`;

const MenuWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  column-gap: 41px;
`;

const Menu = styled.li<{ selected: boolean }>`
  cursor: pointer;
  width: 40px;
  height: 28px;
  text-align: center;
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(15, theme.color.grey90, 700)};

  ${(props) =>
    props.selected && {
      borderBottom: `4px solid ${props.theme.color.grey90}`,
    }}
`;
