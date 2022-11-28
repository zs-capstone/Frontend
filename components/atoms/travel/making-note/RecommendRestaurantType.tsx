import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const RecommendRestaurantType: React.FC<{
  selectedType: number;
  setSelectedType: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const { selectedType, setSelectedType } = props;

  return (
    <TypeWrapper>
      <TypeButton
        type="button"
        selected={selectedType === 1}
        onClick={() => setSelectedType(1)}
      >
        <Type selected={selectedType === 1}>양식</Type>
      </TypeButton>
      <TypeButton
        type="button"
        selected={selectedType === 2}
        onClick={() => setSelectedType(2)}
      >
        <Type selected={selectedType === 2}>중식</Type>
      </TypeButton>
      <TypeButton
        type="button"
        selected={selectedType === 3}
        onClick={() => setSelectedType(3)}
      >
        <Type selected={selectedType === 3}>분식</Type>
      </TypeButton>
      <TypeButton
        type="button"
        selected={selectedType === 4}
        onClick={() => setSelectedType(4)}
      >
        <Type selected={selectedType === 4}>카페/베이커리</Type>
      </TypeButton>
      <TypeButton
        type="button"
        selected={selectedType === 5}
        onClick={() => setSelectedType(5)}
      >
        <Type selected={selectedType === 5}>한식</Type>
      </TypeButton>
      <TypeButton
        type="button"
        selected={selectedType === 6}
        onClick={() => setSelectedType(6)}
      >
        <Type selected={selectedType === 6}>일식</Type>
      </TypeButton>
    </TypeWrapper>
  );
};

export default RecommendRestaurantType;

const TypeWrapper = styled.span`
  display: flex;
  flex-direction: row;

  ${({ theme }) =>
    theme.media.mobile({
      whiteSpace: "nowrap",
      overflowX: "auto",
    })}
`;

const TypeButton = styled.button<{ selected: boolean }>`
  width: fit-content;
  height: 34px;
  padding: 8px 16px;
  border-radius: 48px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.border2};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  cursor: pointer;

  ${(props) =>
    props.selected && {
      backgroundColor: props.theme.color.main10,
      border: `1px solid ${props.theme.color.main30}`,
    }}
`;

const Type = styled.p<{ selected: boolean }>`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey70)};

  ${(props) =>
    props.selected && {
      color: `${props.theme.color.main50}`,
    }}
`;
