import React, { Dispatch, Key, SetStateAction } from "react";
import styled from "styled-components";

export type ValueType = string | number;

const SelectInput: React.FC<{
  isNumberType?: boolean;
  data: ValueType[];
  width: string;
  height: string;
  tabIndex: number;
  setState: Dispatch<SetStateAction<ValueType>>;
}> = (props) => {
  const { isNumberType, data, width, height, tabIndex, setState } = props;

  return (
    <Select
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setState(isNumberType ? +value : value);
      }}
      width={width}
      height={height}
      tabIndex={tabIndex}
    >
      {data.map((item: ValueType, idx: Key) => {
        return (
          <option key={idx} value={item}>
            {item}
          </option>
        );
      })}
    </Select>
  );
};

export default SelectInput;

const Select = styled.select<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 16px;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};

  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("https://yeoreodigm-s3.s3.ap-northeast-2.amazonaws.com/assets/icons/arrow_down.svg")
    ${({ theme }) => theme.color.background} no-repeat right 16px center;
`;
