import styled from "styled-components";

export const CommonButton = styled.button.attrs({
  type: "button",
})<
  Partial<{
    size: number;
    width: string;
    height: string;
    color: string;
    backgroundColor: string;
    radius: string;
    borderColor: string;
    fontFamily: string;
    tWidth: string;
    rWidth: string;
    rHeight: string;
  }>
>`
  cursor: pointer;
  width: ${(props) => props.width || "fit-content"};
  height: ${(props) => props.height || "fit-content"};
  font-size: ${(props) =>
    props.theme.mixin.fontSize(
      props.size || 13,
      props.color || props.theme.color.grey60,
      700
    )};
  font-family: ${(props) => props.fontFamily};
  background-color: ${(props) => props.backgroundColor || "transparent"};
  border-radius: ${(props) => props.radius || "0px"};
  border: ${(props) => props.borderColor && `1px solid ${props.borderColor}`};

  ${(props) =>
    props.theme.media.tabletUnder({
      width: props.tWidth,
    })}

  ${(props) =>
    props.theme.media.mobile({
      width: props.rWidth,
      height: props.rHeight,
    })}
`;
