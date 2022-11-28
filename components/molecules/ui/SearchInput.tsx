import styled from "styled-components";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { queryKeys } from "../../../react-query/constants";
import { fetchRelatedSearchList } from "../../../apis/search";
import { IRelatedSearchListType } from "../../../types/search";
import RelatedSearchListBox from "../../atoms/ui/Box/RelatedSearchListBox";
import { useRouter } from "next/router";
import { iconUrl } from "../../../axiosInstance/constants";

const SearchInput: React.FC = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState<string>("");
  const [boxOpen, setBoxOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { data: relatedSearchList } = useQuery<IRelatedSearchListType>(
    [queryKeys.makingNoteCompanionList, inputText],
    () => fetchRelatedSearchList(inputText),
    { enabled: !!inputText }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleOnBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setBoxOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search/${inputText}`);
  };

  useEffect(() => {
    setInputText("");
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [router]);

  useEffect(() => {
    if (
      relatedSearchList &&
      (relatedSearchList.places.length > 0 ||
        relatedSearchList.travelNotes.length > 0 ||
        relatedSearchList.members.length > 0)
    ) {
      setBoxOpen(true);
    } else {
      setBoxOpen(false);
    }
  }, [relatedSearchList]);

  return (
    <form onSubmit={handleSubmit}>
      <Wrapper onBlur={handleOnBlur} tabIndex={0}>
        <Input
          ref={inputRef}
          type="text"
          value={inputText}
          placeholder="검색어를 입력해 주세요."
          spellCheck={false}
          onChange={handleInputChange}
        />
        <SearchButton type="submit">
          <Image
            width={20}
            height={20}
            src={iconUrl("search")}
            alt={"검색어 입력 후 검색 페이지로 이동시키는 찾기 아이콘"}
          />
        </SearchButton>
        {boxOpen && (
          <RelatedSearchListBox
            places={relatedSearchList?.places}
            travelNotes={relatedSearchList?.travelNotes}
            members={relatedSearchList?.members}
          />
        )}
      </Wrapper>
    </form>
  );
};

export default SearchInput;

const Wrapper = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()}
  position: relative;
  width: 240px;
  height: 40px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "197px",
      height: "36px",
    })}
`;

const Input = styled.input`
  width: 100%;
  border-radius: 11px;
  padding: 8px 36px 8px 16px;
  background-color: ${({ theme }) => theme.color.backgroundLight};
  border: 1px solid ${({ theme }) => theme.color.border1};
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};

  ::placeholder {
    font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
  }
`;

const SearchButton = styled.button`
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 8px;
  height: 20px;
  background-color: transparent;

  ${({ theme }) =>
    theme.media.mobile({
      width: "16px",
      height: "16px",
      top: "9px",
    })}
`;
