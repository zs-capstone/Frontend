import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Spacer } from "../../../../atoms/ui/Spacer/Spacer";
import LanguageSelect from "../../../../molecules/travel/place/LanguageSelect";

const PlaceDetailProfile: React.FC<
  Partial<{
    selectedLanguage: string;
    setSelectedLanguage: Dispatch<SetStateAction<string>>;
    imageUrl: string;
    tag: string;
    title: string;
  }>
> = (props) => {
  const { imageUrl, tag, title, selectedLanguage, setSelectedLanguage } = props;

  return (
    <Container imageUrl={imageUrl}>
      <Spacer size={192} />
      <Title>{title}</Title>
      <LanguageSelectWrapper>
        <LanguageSelect
          selectedLanguage={selectedLanguage!}
          setSelectedLanguage={setSelectedLanguage!}
        />
      </LanguageSelectWrapper>
      <TagWrapper>
        {tag
          ?.split(",")
          .slice(0, 5)
          .map((item, index) => (
            <Tag key={index}>{`#${item}`}</Tag>
          ))}
      </TagWrapper>
    </Container>
  );
};

export default PlaceDetailProfile;

const Container = styled.div<{ imageUrl?: string }>`
  width: 964px;
  height: 280px;
  background: url(${(props) => props.imageUrl});
  object-fit: cover;
  background-position: center;
  padding-left: 16px;
  box-shadow: inset 0px -50px 100px ${({ theme }) => theme.color.grey80};
  position: relative;
  margin-bottom: 40px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      maxWidth: "674px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "100%",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(28, theme.color.white, 700)};
  font-family: "PretendardBold";
  margin-bottom: 8px;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: "24px",
    })}
`;

const Tag = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.white)};
`;

const TagWrapper = styled.span`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const LanguageSelectWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;
