import styled from "styled-components";

const RadioInput: React.FC<{
  defaultChecked?: boolean;
  name: string;
  value: string | number;
  tabIndex?: number;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  const { defaultChecked, name, value, tabIndex, label, onChange } = props;
  return (
    <RadioContainer>
      <RadioButton
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <RadioButtonLabel tabIndex={tabIndex} />
      <Label>{label}</Label>
    </RadioContainer>
  );
};

export default RadioInput;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 8px;
`;

const RadioButtonLabel = styled.label`
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background: papayawhip;
  transition: all 150ms;
`;

const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 25px;
  height: 25px;

  &:checked + ${RadioButtonLabel} {
    background: white;
    border: 5px solid ${({ theme }) => theme.color.main50};
  }
`;

const Label = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
  margin-left: 8px;
`;
