import React, { ChangeEventHandler, MouseEventHandler, RefObject } from "react";
import Image from "next/image";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";

const PasswordInput: React.FC<
  Partial<{
    tabIndex: number;
    placeholder: string;
    value: string;
    inputRef: RefObject<HTMLInputElement>;
    width: string;
    rBoxWidth: string;
    rWidth: string;
    boxWidth: string;
    mBoxWidth: string;
    typeChanged: boolean;
    onBlur: () => void;
    onChange: ChangeEventHandler;
    onClick: MouseEventHandler;
  }>
> = (props) => {
  const {
    tabIndex,
    placeholder,
    value,
    width,
    rBoxWidth,
    mBoxWidth,
    rWidth,
    inputRef,
    typeChanged,
    boxWidth,
    onBlur,
    onChange,
    onClick,
  } = props;

  return (
    <Container boxWidth={boxWidth} rBoxWidth={rBoxWidth} mBoxWidth={mBoxWidth}>
      <Input
        type={typeChanged ? "text" : "password"}
        spellCheck="false"
        autoComplete="on"
        tabIndex={tabIndex}
        onBlur={onBlur}
        ref={inputRef}
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        rWidth={rWidth}
        onChange={onChange}
        width={width}
      />
      <ImageContainer>
        <Image
          src={iconUrl("eye")}
          height={16}
          width={16}
          alt={"비밀번호 확인을 위한 버튼"}
          onClick={onClick}
        />
      </ImageContainer>
    </Container>
  );
};

export default PasswordInput;

const Container = styled.div<{
  boxWidth?: string;
  rBoxWidth?: string;
  mBoxWidth?: string;
}>`
  position: relative;
  width: ${(props) => props.boxWidth || "100%"};
  height: 50px;

  ${(props) =>
    props.theme.media.tabletUnder({
      width: props.rBoxWidth,
    })}

  ${(props) =>
    props.theme.media.mobile({
      width: props.mBoxWidth,
    })}
`;

const Input = styled.input<{ width?: string; rWidth?: string }>`
  width: ${(props) => props.width || "100%"};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.background};
  padding: 16px 44px 16px 16px;
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};

  ::placeholder {
    font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey50)};
  }

  ${(props) =>
    props.theme.media.tabletUnder({
      width: props.rWidth,
    })}
`;

const ImageContainer = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  right: 16px;
  top: 16px;
  cursor: pointer;
`;
