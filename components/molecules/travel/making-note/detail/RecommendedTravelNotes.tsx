import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const RecommendedTravelNotes: React.FC<{
  title: string;
  theme: string[];
  travelNoteId: number;
  imageUrl: string;
}> = (props) => {
  const { title, imageUrl, travelNoteId, theme } = props;

  return (
    <Link href={`/travel/making-note/detail/${travelNoteId}`}>
      <a>
        <Container>
          <ImageContainer imageUrl={imageUrl} />
          <TextWrapper>
            <Title>{title}</Title>
            {theme.length === 0 && <Theme>테마를 만들어주세요.</Theme>}
            {theme.slice(0, 5).map((item, idx) => (
              <Theme key={idx}>{item}</Theme>
            ))}
          </TextWrapper>
        </Container>
      </a>
    </Link>
  );
};

export default RecommendedTravelNotes;

const Container = styled.div`
  display: flex;
  cursor: pointer;
  width: 308px;
  height: 90px;
  padding: 12px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border1};

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const TextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  margin-bottom: 8px;
`;

const ImageContainer = styled.div<{ imageUrl: string }>`
  border-radius: 4px;
  background: url(${(props) => props.imageUrl});
  background-size: cover;
  width: 64px;
  height: 64px;
`;

const Theme = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
`;
