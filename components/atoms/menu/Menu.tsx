import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";

export const Menu: React.FC<{
  content: string;
  link: string;
}> = (props) => {
  const { content, link } = props;
  return (
    <li>
      <Link href={link}>
        <a>
          <Container>
            <Content>{content}</Content>
            <Image
              width={"12px"}
              height={"12px"}
              src={iconUrl("arrow_right")}
              alt="메뉴바의 메뉴로 이동하는 화살표"
            />
          </Container>
        </a>
      </Link>
    </li>
  );
};

export const MypageMenu: React.FC<{
  content: string;
  noBorder: boolean;
  isSelected: boolean;
  onClick: () => void;
}> = (props) => {
  const { noBorder, isSelected, content, onClick } = props;

  return (
    <li onClick={onClick}>
      <Container noBorder={noBorder} isSelected={isSelected}>
        <Content>{content}</Content>
        <Image
          width={"12px"}
          height={"12px"}
          src={iconUrl("arrow_right")}
          alt="메뉴바의 메뉴로 이동하는 화살표"
        />
      </Container>
    </li>
  );
};

const Container = styled.span<{ noBorder?: boolean; isSelected?: boolean }>`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border1};
  ${(props) => props.noBorder && { border: "none" }}

  ${(props) =>
    props.isSelected && { backgroundColor: props.theme.color.background }}

  &:hover {
    p {
      font-size: ${({ theme }) =>
        theme.mixin.fontSize(16, theme.color.main50, 700)};
    }
  }
`;

const Content = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  transition: 0.3s ease;
`;
