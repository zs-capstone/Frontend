import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import ThemeCheckbox from "../../../atoms/travel/making-note/ThemeCheckbox";
import { Spacer } from "../../../atoms/ui/Spacer/Spacer";
import Block from "../../../molecules/travel/making-note/Block";

const Theme: React.FC<{
  themeList: string[];
  setThemeList: Dispatch<SetStateAction<string[]>>;
}> = (props) => {
  const { themeList, setThemeList } = props;

  const handleSetThemeList = (themeContent: string) => {
    const index = themeList.findIndex((element) => element === themeContent);
    if (index !== -1) {
      setThemeList([
        ...themeList.slice(0, index),
        ...themeList.slice(index + 1),
      ]);
    } else {
      setThemeList([...themeList, themeContent]);
    }
  };

  return (
    <Block height={"244px"}>
      <Title>여행 테마</Title>
      <Spacer size={24} />
      <Wrapper>
        <ThemeCheckbox
          onChange={() => handleSetThemeList("자연경관")}
          checked={themeList.includes("자연경관")}
          content={"자연경관"}
        />
        <ThemeCheckbox
          onChange={() => handleSetThemeList("액티비티")}
          checked={themeList.includes("액티비티")}
          content={"액티비티"}
        />
        <ThemeCheckbox
          onChange={() => handleSetThemeList("바다")}
          checked={themeList.includes("바다")}
          content={"바다"}
        />
        <ThemeCheckbox
          onChange={() => handleSetThemeList("산")}
          checked={themeList.includes("산")}
          content={"산"}
        />
        <ThemeCheckbox
          onChange={() => handleSetThemeList("힐링")}
          checked={themeList.includes("힐링")}
          content={"힐링"}
        />
        <ThemeCheckbox
          onChange={() => handleSetThemeList("산책")}
          checked={themeList.includes("산책")}
          content={"산책"}
        />
        <ThemeCheckbox
          onChange={() => handleSetThemeList("야경")}
          checked={themeList.includes("야경")}
          content={"야경"}
        />
        <ThemeCheckbox
          onChange={() => handleSetThemeList("인문학")}
          checked={themeList.includes("인문학")}
          content={"인문학"}
        />
        <ThemeCheckbox
          onChange={() => handleSetThemeList("실내")}
          checked={themeList.includes("실내")}
          content={"실내"}
        />
        <ThemeCheckbox
          onChange={() => handleSetThemeList("실외")}
          checked={themeList.includes("실외")}
          content={"실외"}
        />
      </Wrapper>
    </Block>
  );
};

export default Theme;

const Title = styled.h1`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin-top: 32px;
`;

const Wrapper = styled.span`
  max-width: 322px;
`;
