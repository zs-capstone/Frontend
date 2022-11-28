import styled from "styled-components";
import PlaceAddButton from "../../../atoms/ui/Button/PlaceAddButton";

const RecommendedPlace: React.FC<{
  image: string;
  title: string;
  duration: number;
  placeId: number;
  makingNoteId: number;
}> = (props) => {
  const { image, title, duration, placeId, makingNoteId } = props;

  return (
    <Container image={image}>
      <Title>{title}</Title>
      <PlaceAddButton
        duration={duration}
        makingNoteId={makingNoteId}
        placeId={placeId}
      />
    </Container>
  );
};

export default RecommendedPlace;

const Container = styled.div<{ image: string }>`
  position: relative;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 34.6%,
      rgba(0, 0, 0, 0.5) 82.49%
    ),
    url(${(props) => props.image});
  background-size: cover;
  width: 156px;
  height: 130px;
  border-radius: 4px;
`;

const Title = styled.p`
  position: absolute;
  left: 12px;
  bottom: 16px;
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.white, 700)};

  max-width: 130px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
