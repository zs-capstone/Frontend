import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { MypageMenu } from "../../atoms/menu/Menu";

const menuList = [
  { id: 1, title: "계정관리" },
  { id: 2, title: "나의 여행노트" },
  { id: 3, title: "나의 포토다임" },
  { id: 4, title: "나의 피드" },
  { id: 5, title: "좋아요한 여행노트" },
  { id: 6, title: "좋아요한 여행지" },
  { id: 7, title: "팔로워 / 팔로잉" },
  { id: 8, title: "회원탈퇴" },
];

const MypageMenubar: React.FC<{
  isSelected: number;
  setSelectedMenu: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const { isSelected, setSelectedMenu } = props;

  return (
    <Container>
      {menuList.map((menu) => (
        <MypageMenu
          key={menu.id}
          onClick={() => setSelectedMenu(menu.id)}
          content={menu.title}
          isSelected={menu.id === isSelected}
          noBorder={menu.id === 8}
        />
      ))}
    </Container>
  );
};

export default React.memo(MypageMenubar);

const Container = styled.ul`
  min-width: 226px;
  height: fit-content;
  border: 1px solid ${({ theme }) => theme.color.border2};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  border-radius: 8px;
  overflow: hidden;

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
      borderRadius: 0,
      boxShadow: "none",
    })}
`;
