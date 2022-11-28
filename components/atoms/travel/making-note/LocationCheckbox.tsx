import styled from "styled-components";

const LocationCheckbox: React.FC<{
  defaultChecked?: boolean;
  name: string;
  value: string;
  tabIndex?: number;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  const { defaultChecked, name, value, tabIndex, label, onChange } = props;
  return (
    <Container>
      <Checkbox
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <CheckboxLabel tabIndex={tabIndex} />
      <Label>{label}</Label>
    </Container>
  );
};

export default LocationCheckbox;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 8px;
`;

const CheckboxLabel = styled.label`
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background: papayawhip;
  transition: all 150ms;
`;

const Checkbox = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 25px;
  height: 25px;

  &:checked + ${CheckboxLabel} {
    background: white;
    border: 5px solid ${({ theme }) => theme.color.main50};
  }
`;

const Label = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
  margin-left: 8px;
`;
