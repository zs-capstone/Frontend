import Link from "next/link";
import styled from "styled-components";

const MyPhotodigm: React.FC<{
  imageUrl: string;
  title: string;
  dateTime: string;
  photodigmId: number;
}> = (props) => {
  const { imageUrl, title, dateTime, photodigmId } = props;

  return (
    <Link href={`/photodigm/${photodigmId}`}>
      <a>
        <Container>
          <ImageContainer>
            <Thumbnail
              src={imageUrl}
              alt={"마이페이지 나의 포토다임 포토다임 이미지"}
            />
          </ImageContainer>
          <Title>{title}</Title>
          <DateTime>{dateTime.slice(0, 10)}</DateTime>
        </Container>
      </a>
    </Link>
  );
};

export default MyPhotodigm;

const Container = styled.div`
  width: 226px;
  height: 206px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.border1};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);

  ${({ theme }) =>
    theme.media.mobile({
      width: "156px",
      height: "206px",
    })}
`;

const ImageContainer = styled.div`
  width: 226px;
  height: 130px;
  position: relative;
  box-shadow: inset 0px -50px 100px ${({ theme }) => theme.color.grey80};

  ${({ theme }) =>
    theme.media.mobile({
      width: "156px",
    })}
`;

const Thumbnail = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 14px 12px 10px 12px;

  ${({ theme }) =>
    theme.media.mobile({
      maxWidth: "130px",
    })}
`;

const DateTime = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
  margin-left: 12px;
`;
