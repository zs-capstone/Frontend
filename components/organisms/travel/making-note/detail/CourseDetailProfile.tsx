import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchTravelNoteDetailInfo } from "../../../../../apis/note/detail";
import { queryKeys } from "../../../../../react-query/constants";
import { ITravelNoteDetailInfoType } from "../../../../../types/note/detail";
import CoursePeriod from "../../../../atoms/travel/making-note/detail/CoursePeriod";
import { Spacer } from "../../../../atoms/ui/Spacer/Spacer";

const CourseDetailProfile: React.FC<{ travelNoteId: number }> = (props) => {
  const { travelNoteId } = props;

  const { data: detailInfo } = useQuery<ITravelNoteDetailInfoType>(
    [queryKeys.travelNoteDetailInfo, +travelNoteId],
    () => fetchTravelNoteDetailInfo(+travelNoteId),
    { suspense: true }
  );

  return (
    <Container thumbnail={detailInfo?.thumbnail!}>
      <Spacer size={158} />
      <CoursePeriod content={detailInfo?.period!} />
      <Title>{detailInfo?.title}</Title>
      <TagWrapper>
        {!detailInfo?.theme.length && <Tag>테마를 만들어주세요.</Tag>}
        {detailInfo?.theme.slice(0, 5).map((item, index) => (
          <Tag key={index}>{`#${item}`}</Tag>
        ))}
      </TagWrapper>
    </Container>
  );
};

export default React.memo(CourseDetailProfile);

const Container = styled.div<{ thumbnail: string }>`
  width: 964px;
  height: 280px;
  background: url(${(props) => props.thumbnail});
  background-position: center;
  background-size: cover;
  padding-left: 16px;
  box-shadow: inset 0px -50px 100px ${({ theme }) => theme.color.grey80};

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
  margin: 8px 0px;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: "24px",
    })}
`;

const TagWrapper = styled.span`
  gap: 8px;
  display: flex;
  flex-direction: row;
`;

const Tag = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.white)};

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: "13px",
    })}
`;
