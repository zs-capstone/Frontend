import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import LocationCheckbox from "../../../atoms/travel/making-note/LocationCheckbox";

const LocationInput: React.FC<{
  locationList: string[];
  setLocationList: Dispatch<SetStateAction<string[]>>;
  location: "제주 동부" | "제주 서부" | "제주 남부" | "제주 북부";
  content: string;
}> = (props) => {
  const { locationList, setLocationList, location, content } = props;

  const handleLocationThemeList = (themeContent: string) => {
    const index = locationList.findIndex((element) => element === themeContent);
    if (index !== -1) {
      setLocationList([
        ...locationList.slice(0, index),
        ...locationList.slice(index + 1),
      ]);
    } else {
      setLocationList([...locationList, themeContent]);
    }
  };

  return (
    <Container>
      <Wrapper>
        <LocationCheckbox
          name="location"
          value={location}
          label={content}
          onChange={() => handleLocationThemeList(location)}
        />
      </Wrapper>
      {location === "제주 동부" && (
        <ImageContainer>
          <Image
            src={iconUrl("jeju_east")}
            width={126}
            height={72}
            alt={"여행 계획 준비 페이지 제주 동부 위치 아이콘"}
          />
        </ImageContainer>
      )}
      {location === "제주 서부" && (
        <ImageContainer>
          <Image
            src={iconUrl("jeju_west")}
            width={126}
            height={72}
            alt={"여행 계획 준비 페이지 제주 서부 위치 아이콘"}
          />
        </ImageContainer>
      )}
      {location === "제주 남부" && (
        <ImageContainer>
          <Image
            src={iconUrl("jeju_south")}
            width={126}
            height={72}
            alt={"여행 계획 준비 페이지 제주 남부 위치 아이콘"}
          />
        </ImageContainer>
      )}
      {location === "제주 북부" && (
        <ImageContainer>
          <Image
            src={iconUrl("jeju_north")}
            width={126}
            height={72}
            alt={"여행 계획 준비 페이지 제주 북부 위치 아이콘"}
          />
        </ImageContainer>
      )}
    </Container>
  );
};

export default LocationInput;

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  width: 156px;
  height: 140px;
  padding: 4px 4px 16px;
  border: 1px solid ${({ theme }) => theme.color.border1};
  border-radius: 3px;
`;

const Wrapper = styled.span``;

const ImageContainer = styled.div`
  margin-left: 8px;
`;
