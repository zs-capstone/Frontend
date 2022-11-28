import { css } from "styled-components";

const fontSize = (
  size: number = 10,
  color: string = "#FFFFFF",
  weight: number = 500
) => css`
  font-family: "Pretendard";
  font-size: ${size}px;
  color: ${color};
  font-weight: ${weight};
`;

const setTextEllipsis = () => css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const flexCenter = () => css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const scrollStyle = (scrollbarWidth: number) => {
  return css`
    &::-webkit-scrollbar {
      display: initial;
      width: ${scrollbarWidth}px;
      cursor: pointer;
    }
    &::-webkit-scrollbar-track {
      border-radius: 20px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 20px;
      background-color: ${({ theme }) => theme.color.grey50};
    }
    &::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }
  `;
};

export { fontSize, setTextEllipsis, flexCenter, scrollStyle };
