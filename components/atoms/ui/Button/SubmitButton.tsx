import React from "react";
import styled from "styled-components";

const SubmitButton: React.FC<
  Partial<{
    danger: boolean;
    disabled: boolean;
    tabIndex: number;
    children: React.ReactNode;
    rWidth: string;
  }>
> = (props) => {
  const { danger, disabled, tabIndex, children, rWidth } = props;

  return (
    <Button
      disabled={disabled}
      danger={danger}
      tabIndex={tabIndex}
      rWidth={rWidth}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;

const Button = styled.button<{ danger?: boolean; rWidth?: string }>`
  cursor: pointer;
  width: 328px;
  height: 50px;
  background-color: ${(props) =>
    props.danger ? props.theme.color.danger : props.theme.color.main50};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.mixin.fontSize(16)};

  &:disabled {
    background-color: ${({ theme }) => theme.color.grey30};
  }

  ${(props) =>
    props.theme.media.mobile({
      width: props.rWidth,
    })}
`;
