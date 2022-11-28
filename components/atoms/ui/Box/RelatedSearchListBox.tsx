import Link from "next/link";
import styled from "styled-components";
import { ICommonMemberType } from "../../../../types/common";
import {
  ISearchPlacesType,
  ISearchTravelNoteType,
} from "../../../../types/search";

const RelatedSearchListBox: React.FC<
  Partial<{
    places: ISearchPlacesType[];
    travelNotes: ISearchTravelNoteType[];
    members: ICommonMemberType[];
  }>
> = (props) => {
  const { places, travelNotes, members } = props;

  return (
    <Container>
      {places?.map((place) => (
        <Link
          key={place.placeId}
          href={`/travel/place/detail/${place.placeId}`}
        >
          <a>
            <SearchItem>
              <Title>{place.title}</Title>
              <PlaceType>여행지</PlaceType>
            </SearchItem>
          </a>
        </Link>
      ))}
      {travelNotes?.map((note) => (
        <Link
          key={note.travelNoteId}
          href={`/travel/making-note/detail/${note.travelNoteId}`}
        >
          <a>
            <SearchItem key={note.travelNoteId}>
              <Title>{note.title}</Title>
              <NoteType>여행 노트</NoteType>
            </SearchItem>
          </a>
        </Link>
      ))}
      {members?.map((member) => (
        <Link key={member.memberId} href={`/member/${member.memberId}`}>
          <a>
            <SearchItem key={member.memberId}>
              <Title>{member.nickname}</Title>
              <MemberType>유저 이름</MemberType>
            </SearchItem>
          </a>
        </Link>
      ))}
    </Container>
  );
};

export default RelatedSearchListBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 48px;
  z-index: 999;
  width: 307px;
  max-height: 294px;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.grey20};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  background-color: ${({ theme }) => theme.color.white};

  ${({ theme }) => theme.mixin.scrollStyle(8)};
`;

const SearchItem = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px;

  transition: background-color 0.3s;

  :hover {
    background-color: ${({ theme }) => theme.color.grey20};
  }
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey80)};
  margin-bottom: 6px;
`;

const PlaceType = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(12, theme.color.main70, 700)};
  font-family: "PretendardBold";
`;

const NoteType = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(12, theme.color.grey70, 700)};
  font-family: "PretendardBold";
`;

const MemberType = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(12, theme.color.secondary60, 700)};
  font-family: "PretendardBold";
`;
