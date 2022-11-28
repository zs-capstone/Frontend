import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchSelectedFeedTravelNote } from "../../../../apis/note";
import { iconUrl } from "../../../../axiosInstance/constants";
import { queryKeys } from "../../../../react-query/constants";
import { ISelectedFeedTravelNoteType } from "../../../../types/note";

const MakingNoteTagSelectedProfileLink: React.FC<{
  selectedTravelNoteId: number;
}> = (props) => {
  const { selectedTravelNoteId } = props;

  const { data: selectedTravelNote } = useQuery<ISelectedFeedTravelNoteType>(
    [queryKeys.selectedFeedTravelNote, selectedTravelNoteId],
    () => fetchSelectedFeedTravelNote(selectedTravelNoteId)
  );

  return (
    <Link
      href={`/travel/making-note/detail/${selectedTravelNote?.travelNoteId}`}
    >
      <a>
        <Container>
          <Profile>
            <ThumbnailWrapper>
              <Thumbnail imageUrl={selectedTravelNote?.thumbnail} />
              <Title>{selectedTravelNote?.title}</Title>
            </ThumbnailWrapper>
            <PlaceWrapper>
              <Image
                src={iconUrl("flag")}
                alt={"피드 페이지 선택된 여행노트 여행지 개수"}
                width={14}
                height={14}
              />
              <Place>{`${
                selectedTravelNote?.placeCount || 0
              }개의 여행지`}</Place>
            </PlaceWrapper>
            <Day>
              {selectedTravelNote?.dayStart} ~ {selectedTravelNote?.dayEnd}
            </Day>
          </Profile>
        </Container>
      </a>
    </Link>
  );
};

export default MakingNoteTagSelectedProfileLink;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  position: absolute;
  left: 12px;
  bottom: 16px;
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.white, 700)};
  max-width: 276px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Profile = styled.div`
  width: 472px;
  height: 210px;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.border1};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "328px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 472px;
  height: 133px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "328px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const Thumbnail = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.imageUrl});
  background-position: center;
  background-size: cover;
  flex-shrink: 0;
  box-shadow: inset 0px -50px 100px ${({ theme }) => theme.color.grey80};
`;

const PlaceWrapper = styled.span`
  display: flex;
  flex-direction: row;
  margin: 12px 16px;
`;

const Place = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
  margin-left: 4px;
`;

const Day = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.grey60)};
  margin: 12px 16px;
`;
