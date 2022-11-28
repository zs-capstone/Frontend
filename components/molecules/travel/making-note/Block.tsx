import React from "react";
import styled from "styled-components";

const Block: React.FC<{
  width?: string;
  height: string;
  children: React.ReactNode;
}> = (props) => {
  const { width, height, children } = props;
  return (
    <Container width={width} height={height}>
      {children}
    </Container>
  );
};

export default Block;

const Container = styled.section<{
  width?: string;
  height: string;
}>`
  width: ${(props) => props.width || "360px"};
  height: ${(props) => props.height};
  background-color: ${({ theme }) => theme.color.white};
  overflow: hidden;
  padding: 0px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.border2};

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
      borderBottom: `4px solid ${theme.color.background}`,
      borderTop: 0,
      borderRadius: 0,
    })}
`;
