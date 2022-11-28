import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";

const LanguageSelect: React.FC<{
  selectedLanguage: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
}> = (props) => {
  const { selectedLanguage, setSelectedLanguage } = props;

  return (
    <Container>
      <ImageContainer focused={selectedLanguage === "ko"}>
        <Image
          onClick={() => setSelectedLanguage("ko")}
          src={iconUrl("south_korea")}
          width={36}
          height={36}
          alt={"여행지 프로필 언어를 한국어로 설정하는 아이콘"}
        />
      </ImageContainer>
      <ImageContainer focused={selectedLanguage === "en"}>
        <Image
          onClick={() => setSelectedLanguage("en")}
          src={iconUrl("united_states")}
          width={36}
          height={36}
          alt={"여행지 프로필 언어를 영어로 설정하는 아이콘"}
        />
      </ImageContainer>
      <ImageContainer focused={selectedLanguage === "zh"}>
        <Image
          onClick={() => setSelectedLanguage("zh")}
          src={iconUrl("china")}
          width={36}
          height={36}
          alt={"여행지 프로필 언어를 중국어로 설정하는 아이콘"}
        />
      </ImageContainer>
    </Container>
  );
};

export default LanguageSelect;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 60px;
  width: 156px;
  border-radius: 56px;
  z-index: 9998;
  column-gap: 10px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ImageContainer = styled.div<{ focused: boolean }>`
  display: flex;
  width: fit-content;
  height: fit-content;
  border-radius: 100%;
  overflow: hidden;
  cursor: pointer;

  ${(props) =>
    props.focused && {
      border: `4px solid ${props.theme.color.main50}`,
    }}
`;
