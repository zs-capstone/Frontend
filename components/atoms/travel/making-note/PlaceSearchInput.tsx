import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const PlaceSearchInput: React.FC<{
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
}> = (props) => {
  const { searchKeyword, setSearchKeyword } = props;

  return (
    <Input
      value={searchKeyword}
      placeholder="여행지를 검색해보세요."
      spellCheck={false}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchKeyword(e.target.value)
      }
    />
  );
};

export default PlaceSearchInput;

const Input = styled.input`
  width: 100%;
  height: 36px;
  padding: 6px 36px 6px 16px;
  background-color: ${({ theme }) => theme.color.background};
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};
  border-radius: 56px;

  ::placeholder {
    font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey50)};
  }
`;
