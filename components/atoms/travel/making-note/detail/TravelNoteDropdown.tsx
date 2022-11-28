import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../../axiosInstance/constants";

export type TravelNoteDropdownType = {
  id: number;
  value: number;
};

const TravelNoteDropdown: React.FC<{
  selectDay: number;
  itemList: TravelNoteDropdownType[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleSetSelectDay: (value: number) => void;
}> = (props) => {
  const { itemList, selectDay, isOpen, setIsOpen, handleSetSelectDay } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);

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
        <SelectedValue>{selectDay + "일차"}</SelectedValue>
        {isOpen ? (
          <Image
            src={iconUrl("arrow_up")}
            height={16}
            width={16}
            alt={"드랍다운 펼치기 버튼 아이콘"}
          />
        ) : (
          <Image
            src={iconUrl("arrow_down")}
            height={16}
            width={16}
            alt={"드랍다운 펼치기 버튼 아이콘"}
          />
        )}
      </SelectedWrapper>
      <DropdownMenu isOpen={isOpen}>
        {itemList.map((item: TravelNoteDropdownType) => (
          <DropdownWrapper
            key={item.id}
            onClick={() => handleSetSelectDay(item.value)}
          >
            <DropdownItem isOpen={isOpen}>{item.value + "일차"}</DropdownItem>
          </DropdownWrapper>
        ))}
      </DropdownMenu>
    </Container>
  );
};

export default TravelNoteDropdown;

const Container = styled.div`
  cursor: pointer;
  width: 96px;
  height: 32px;
  z-index: 9999;
`;

const SelectedWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 16px;
`;

const SelectedValue = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(16, theme.color.grey60, 700)};
`;

const DropdownMenu = styled.ul<{ isOpen: boolean }>`
  opacity: 0;
  height: 0;
  width: 0;

  background-color: ${({ theme }) => theme.color.white};
  transform: translateY(-5px);
  transition: transform 0.3s ease;
  border: 1px solid ${({ theme }) => theme.color.border2};

  ${(props) =>
    props.isOpen && {
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

const DropdownItem = styled.p<{ isOpen: boolean }>`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(16, theme.color.grey60, 700)};
  padding: 6px 16px;
  display: flex;

  ${(props) =>
    !props.isOpen && {
      display: "none",
    }}

  transition: background-color 0.3s;

  :hover {
    color: ${({ theme }) => theme.color.main50};
  }
`;
