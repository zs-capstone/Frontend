import Link from "next/link";
import styled from "styled-components";
import Likes from "../../atoms/main/Likes";
import Ranks from "../../atoms/main/Ranks";

const CourseFrame: React.FC<{
  rank?: number;
  imageUrl: string;
  travelNoteId: number;
  title: string;
  hasLiked: boolean;
  likeCount: number;
}> = (props) => {
  const { rank, imageUrl, travelNoteId, title, hasLiked, likeCount } = props;

  return (
    <Link href={`/travel/making-note/detail/${travelNoteId}`}>
      <a>
        <Container imageUrl={imageUrl}>
          <Title>{title}</Title>
          {rank && (
            <RanksWrapper>
              <Ranks rank={rank} />
            </RanksWrapper>
          )}
          <LikesWrapper>
            <Likes hasLiked={hasLiked} likeCount={likeCount} />
          </LikesWrapper>
        </Container>
      </a>
    </Link>
  );
};

export default CourseFrame;

const Container = styled.div<{ imageUrl: string }>`
  position: relative;
  cursor: pointer;
  width: 228px;
  height: 200px;
  box-shadow: inset 0px -50px 100px ${({ theme }) => theme.color.grey80};
  border-radius: 8px;
  background: url(${(props) => props.imageUrl});
  background-size: cover;
  flex-shrink: 0;
`;

const Title = styled.p`
  position: absolute;
  left: 17px;
  right: 17px;
  bottom: 20px;
  font-size: ${({ theme }) => theme.mixin.fontSize(22, theme.color.white, 700)};
  font-family: "PretendardBold";
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 190px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      fontSize: "18px",
      left: "9px",
      bottom: "15px",
    })}
`;

const LikesWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 8px;
`;

const RanksWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 10px;
`;
