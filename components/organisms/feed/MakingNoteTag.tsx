import dynamic from "next/dynamic";
import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import MakingNoteTagButton from "../../atoms/ui/Button/MakingNoteTagButton";

const MakingNoteTagModal = dynamic(
  () => import("../../molecules/feed/MakingNoteTagModal"),
  { suspense: true }
);

const MakingNoteTagSelectedProfile = dynamic(
  () => import("../../atoms/feed/MakingNoteTagSelectedProfile"),
  { ssr: false }
);

const MakingNoteTag: React.FC<{
  selectedTravelNoteId: number;
  setSelectedTravelNoteId: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const { selectedTravelNoteId, setSelectedTravelNoteId } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Container>
      <Title>여행노트 태그 추가</Title>
      <Description>
        관련 여행노트를 추가해 주세요. 여행노트를 추가시 여행지는 자동 추가
        됩니다.
      </Description>
      {selectedTravelNoteId ? (
        <MakingNoteTagSelectedProfile
          setIsOpen={setIsOpen}
          selectedTravelNoteId={selectedTravelNoteId}
          setSelectedTravelNoteId={setSelectedTravelNoteId}
        />
      ) : (
        <MakingNoteTagButton setIsOpen={setIsOpen} />
      )}
      <MakingNoteTagModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSelectedTravelNoteId={setSelectedTravelNoteId}
      />
    </Container>
  );
};

export default React.memo(MakingNoteTag);

const Container = styled.div`
  margin: 24px 140px;
  display: flex;
  flex-direction: column;

  ${({ theme }) =>
    theme.media.tabletUnder({
      margin: "24px 16px",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(18, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey60)};
  margin-bottom: 17px;
`;
