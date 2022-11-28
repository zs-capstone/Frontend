import React, { MouseEventHandler } from "react";
import styled from "styled-components";

const MakingNoteButton: React.FC<
  Partial<{
    onClick: MouseEventHandler;
    disabled: boolean;
    tabIndex: number;
    children: React.ReactNode;
    width: string;
  }>
> = (props) => {
  const { onClick, disabled, tabIndex, width, children } = props;

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      width={width}
      tabIndex={tabIndex}
    >
      {children}
    </Button>
  );
};

export default MakingNoteButton;

const Button = styled.button<{ width?: string }>`
  cursor: pointer;
  width: ${(props) => props.width || "328px"};
  height: 50px;
  min-height: 50px;
  background-color: ${({ theme }) => theme.color.main50};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.mixin.fontSize(16)};

  &:disabled {
    background-color: ${({ theme }) => theme.color.grey30};
  }

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "360px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "calc(100% - 32px)",
    })}
`;
