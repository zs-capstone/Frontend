import Link from "next/link";
import { MouseEventHandler } from "react";
import styled from "styled-components";

const BorderButton: React.FC<
  Partial<{
    children: React.ReactNode;
    link: string;
    tabIndex: number;
    width: string;
    height: string;
    padding: string;
    shadow: boolean;
    radius: string;
    fontFamily: string;
    borderColor: string;
    size: number;
    color: string;
    onClick: MouseEventHandler;
  }>
> = (props) => {
  const {
    children,
    link,
    onClick,
    width,
    height,
    padding,
    radius,
    borderColor,
    size,
    color,
    fontFamily,
    shadow,
    tabIndex,
  } = props;

  const button = (
    <Button
      type="button"
      onClick={onClick}
      tabIndex={tabIndex}
      padding={padding}
      width={width}
      fontFamily={fontFamily}
      height={height}
      size={size}
      borderColor={borderColor}
      color={color}
      shadow={shadow}
      radius={radius}
    >
      {children}
    </Button>
  );

  if (link) {
    return (
      <Link href={link}>
        <a>{button}</a>
      </Link>
    );
  }

  return <>{button}</>;
};

export default BorderButton;

const Button = styled.button<
  Partial<{
    width: string;
    height: string;
    borderColor: string;
    padding: string;
    shadow: boolean;
    size: number;
    radius: string;
    color: string;
    fontFamily: string;
  }>
>`
  width: ${(props) => props.width || "90px"};
  height: ${(props) => props.height || "38px"};
  border-radius: ${(props) => props.radius || "8px"};
  padding: ${(props) => props.padding || "10px 16px"};
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${(props) => props.borderColor || props.theme.color.border2};
  cursor: pointer;
  box-shadow: ${(props) =>
    props.shadow && "0px 3px 5px rgba(38, 40, 43, 0.04)"};

  font-size: ${(props) =>
    props.theme.mixin.fontSize(
      props.size || 14,
      props.color || props.theme.color.grey90,
      700
    )};
  font-family: ${(props) => props.fontFamily};
`;
