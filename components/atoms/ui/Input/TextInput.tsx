import styled from "styled-components";

const TextInput: React.FC<
  Partial<{
    tabIndex: number;
    placeholder: string;
    width: string;
    rWidth: string;
    height: string;
    value: string;
    maxLength: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }>
> = (props) => {
  const {
    tabIndex,
    placeholder,
    width,
    rWidth,
    height,
    value,
    maxLength,
    onChange,
  } = props;

  return (
    <Input
      type="text"
      tabIndex={tabIndex}
      placeholder={placeholder}
      aria-label={placeholder}
      width={width}
      rWidth={rWidth}
      height={height}
      spellCheck={false}
      value={value}
      maxLength={maxLength}
      onChange={onChange}
    />
  );
};

export default TextInput;

const Input = styled.input<{ rWidth?: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.background};
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};
  padding: 16px;
  border: none;

  ::placeholder {
    font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey50)};
  }

  ${(props) =>
    props.theme.media.tabletUnder({
      width: props.rWidth,
    })}
`;
