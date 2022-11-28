import styled from "styled-components";

const ThemeCheckbox: React.FC<{
  checked: boolean;
  content: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  const { checked, content } = props;
  return (
    <label>
      <CheckboxContainer>
        <HiddenCheckbox {...props} />
        <StyledCheckbox checked={checked}>
          <ThemeContent checked={checked}># {content}</ThemeContent>
        </StyledCheckbox>
      </CheckboxContainer>
    </label>
  );
};

export default ThemeCheckbox;

const CheckboxContainer = styled.div`
  display: flex;
  cursor: pointer;
  display: inline-block;
  word-break: break-all;
  margin: 0 7px 16px 0;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: fit-content;
  height: 34px;
  background: ${(props) =>
    props.checked ? props.theme.color.main10 : props.theme.color.white};
  border: 1px solid;
  border-color: ${(props) =>
    props.checked ? props.theme.color.main30 : props.theme.color.border2};
  border-radius: 56px;
  padding: 8px 16px;
  transition: all 150ms;
`;

const ThemeContent = styled.p<{ checked: boolean }>`
  font-size: ${(props) =>
    props.theme.mixin.fontSize(
      15,
      props.checked ? props.theme.color.main70 : props.theme.color.grey60
    )};
`;
