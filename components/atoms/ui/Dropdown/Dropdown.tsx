import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";

export type DropdownItemList = {
  id: number;
  value: string;
};

const Dropdown: React.FC<{
  defaultValue: string;
  setApiOption?: Dispatch<SetStateAction<number | null>>;
  itemList: DropdownItemList[];
}> = (props) => {
  const { itemList, defaultValue, setApiOption } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [item, setItem] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const onSelectItem = (value: string) => {
    if (setApiOption) {
      if (value === "인기순") {
        setApiOption(11);
      } else if (value === "최신순") {
        setApiOption(null);
      }
    }
    setItem(value);
    setIsOpen((prev) => !prev);
  };

  const handleOpenDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.focus();
    }
  };

  return (
    <Container
      ref={dropdownRef}
      tabIndex={0}
      onClick={handleOpenDropdown}
      onBlur={() => setIsOpen(false)}
    >
      <SelectedWrapper onClick={() => setIsOpen((prev) => !prev)}>
        <SelectedValue>{item || defaultValue}</SelectedValue>
        {isOpen ? (
          <Image
            src={iconUrl("arrow_up")}
            height={12}
            width={12}
            alt={"드랍다운 펼치기 버튼 아이콘"}
          />
        ) : (
          <Image
            src={iconUrl("arrow_down")}
            height={12}
            width={12}
            alt={"드랍다운 펼치기 버튼 아이콘"}
          />
        )}
      </SelectedWrapper>
      <DropdownMenu isOpen={isOpen}>
        {itemList.map((item: DropdownItemList) => (
          <DropdownWrapper
            key={item.id}
            onClick={() => onSelectItem(item.value)}
          >
            <DropdownItem>{item.value}</DropdownItem>
          </DropdownWrapper>
        ))}
      </DropdownMenu>
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  cursor: pointer;
  width: 89px;
  height: 30px;
`;

const SelectedWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 16px;
  border: 1px solid ${({ theme }) => theme.color.border2};
`;

const SelectedValue = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
`;

const DropdownMenu = styled.ul<{ isOpen: boolean }>`
  opacity: 0;
  height: 0;
  width: 0;

  background-color: ${({ theme }) => theme.color.white};
  transform: translateY(-20px);
  transition: transform 0.3s ease;
  border: 1px solid ${({ theme }) => theme.color.border2};

  ${(props) =>
    props.isOpen && {
      borderTop: "none",
      height: "fit-content",
      width: "100%",
      transform: "translateY(0%)",
      opacity: 1,
    }}
`;

const DropdownWrapper = styled.li`
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  transition: background-color 0.3s;

  :hover {
    background-color: ${({ theme }) => theme.color.main10};
  }
`;

const DropdownItem = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
  padding: 6px 16px;
  width: 100%;

  transition: background-color 0.3s;

  :hover {
    color: ${({ theme }) => theme.color.main50};
  }
`;
