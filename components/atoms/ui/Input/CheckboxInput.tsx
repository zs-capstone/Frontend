import styled from "styled-components";

const CheckboxInput: React.FC<{
  checked: boolean;
  tabIndex: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelWrap?: boolean;
}> = (props) => {
  const { checked, tabIndex, labelWrap = true } = props;
  const content = (
    <CheckboxContainer>
      <HiddenCheckbox {...props} />
      <StyledCheckbox checked={checked}>
        <Icon tabIndex={tabIndex} viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );

  return labelWrap ? <label>{content}</label> : <>{content}</>;
};

export default CheckboxInput;

const CheckboxContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
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
  width: 25px;
  height: 25px;
  background: ${(props) =>
    props.checked ? props.theme.color.main50 : "papayawhip"};
  border-radius: 100%;
  transition: all 150ms;

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;
