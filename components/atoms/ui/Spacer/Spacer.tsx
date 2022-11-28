import styled from "styled-components";

export const Spacer = styled.span<Partial<{ axis?: string; size: number }>>`
  display: block;
  width: ${(props) =>
    props.axis === "horizontal" ? props.size + "px" : "1px"};
  min-width: ${(props) =>
    props.axis === "horizontal" ? props.size + "px" : "1px"};
  height: ${(props) =>
    props.axis === "horizontal" ? "1px" : props.size + "px"};
  min-height: ${(props) =>
    props.axis === "horizontal" ? "1px" : props.size + "px"};
`;
