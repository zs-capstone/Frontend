import styled from "styled-components";

const Frame: React.FC<{
  label: string;
  children: React.ReactNode;
  gap?: string;
  required?: boolean;
}> = (props) => {
  const { label, children, gap, required } = props;

  if (required) {
    return (
      <>
        <RequiredWrapper>
          <Label>{label}</Label>
          <RequiredText>*</RequiredText>
        </RequiredWrapper>
        <Wrapper gap={gap}>{children}</Wrapper>
      </>
    );
  }

  return (
    <>
      <Label>{label}</Label>
      <Wrapper gap={gap}>{children}</Wrapper>
    </>
  );
};

export default Frame;

const Label = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(13, theme.color.grey70)};
  padding-left: 8px;
  margin-bottom: 8px;
`;

const RequiredWrapper = styled.span`
  display: flex;
  flex-direction: row;
`;

const RequiredText = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(13, theme.color.danger)};
  height: fit-content;
  margin-left: 2px;
`;

const Wrapper = styled.span<{ gap?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.gap};
`;
