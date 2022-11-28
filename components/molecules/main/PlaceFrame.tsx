import Link from "next/link";
import styled from "styled-components";
import Likes from "../../atoms/main/Likes";

const PlaceFrame: React.FC<{
  title: string;
  imageUrl: string;
  placeId: number;
  hasLiked: boolean;
  likeCount: number;
}> = (props) => {
  const { title, imageUrl, placeId, hasLiked, likeCount } = props;

  return (
    <Container imageUrl={imageUrl}>
      <Link href={`/travel/place/detail/${placeId}`}>
        <a>
          <LinkContainer>
            <Title>{title}</Title>
          </LinkContainer>
        </a>
      </Link>
      <LikesWrapper>
        <Likes hasLiked={hasLiked} likeCount={likeCount} />
      </LikesWrapper>
    </Container>
  );
};

export default PlaceFrame;

const Container = styled.div<{ imageUrl: string }>`
  position: relative;
  cursor: pointer;
  width: 309px;
  height: 130px;
  box-shadow: inset 0px 50px 100px ${({ theme }) => theme.color.grey80};
  border-radius: 4px;
  background: url(${(props) => props.imageUrl});
  background-size: cover;
  flex-shrink: 0;

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
      minWidth: "309px",
    })}
`;

const LinkContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.p`
  position: absolute;
  left: 12px;
  top: 19px;
  max-width: 230px;
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.white, 700)};
  font-family: "PretendardBold";
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const LikesWrapper = styled.div`
  position: absolute;
  top: 19px;
  right: 12px;
`;
