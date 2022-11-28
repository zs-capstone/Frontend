import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import { FlightDropdownItemList } from "../../../organisms/travel/making-note/MakingNoteFlight";

const FlightDropdown: React.FC<{
  flightItems: FlightDropdownItemList[];
  setSelectedAirportId: Dispatch<SetStateAction<string>>;
}> = (props) => {
  const { flightItems, setSelectedAirportId } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedAirportValue, setSelectedAirportValue] = useState<string>(
    flightItems[0].value
  );

  const flightRef = useRef<HTMLDivElement>(null);

  const handleSetAirport = (id: string, value: string) => {
    setSelectedAirportId(id);
    setSelectedAirportValue(value);
    setIsOpen(false);
  };

  const handleOpenDropdown = () => {
    if (flightRef.current) {
      flightRef.current.focus();
    }
  };

  return (
    <Container
      onClick={handleOpenDropdown}
      ref={flightRef}
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
    >
      <SelectedWrapper onClick={() => setIsOpen((prev) => !prev)}>
        <SelectedValue>{selectedAirportValue}</SelectedValue>
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
      {isOpen && (
        <AirportWrapper>
          {flightItems.map((item) => (
            <AirportItem
              key={item.id}
              onClick={() => handleSetAirport(item.id, item.value)}
            >
              {item.value}
            </AirportItem>
          ))}
        </AirportWrapper>
      )}
    </Container>
  );
};

export default FlightDropdown;

const Container = styled.div`
  cursor: pointer;
  position: relative;
`;

const SelectedWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 35px;
  align-items: center;
`;

const SelectedValue = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(12, theme.color.grey60)};
`;

const AirportItem = styled.li`
  font-size: ${({ theme }) => theme.mixin.fontSize(12, theme.color.grey60)};
  padding: 6px 16px;
  transition: all 0.3s;

  :hover {
    background-color: ${({ theme }) => theme.color.main10};
    color: ${({ theme }) => theme.color.main50};
  }
`;

const AirportWrapper = styled.ul`
  position: absolute;
  height: fit-content;
  background-color: ${({ theme }) => theme.color.white};
  z-index: 9999;
  width: 60px;
  left: -12px;
  top: 20px;
  border: 1px solid ${({ theme }) => theme.color.border2};
`;
