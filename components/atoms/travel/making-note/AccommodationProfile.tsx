import { uniqueId } from "lodash";
import Link from "next/link";
import styled from "styled-components";
import { addDayToDate } from "../../../../utils/dateUtils";

const AccommodationProfile: React.FC<{
  imageUrl: string;
  title: string;
  tag: string[];
  dayStart: string;
  selectedDay: number;
}> = (props) => {
  const { imageUrl, title, tag, dayStart, selectedDay } = props;

  return (
    <Link
      href={`https://www.goodchoice.kr/product/result?sel_date=${addDayToDate(
        dayStart,
        selectedDay - 1
      )}&sel_date2=${addDayToDate(dayStart, selectedDay)}&keyword=${encodeURI(
        title
      )}`}
    >
      <a target={"_blank"}>
        <Container>
          <Image src={imageUrl} alt={"여행 메이킹 노트 추천 숙소 이미지"} />
          <Title>{title}</Title>
          <TagContainer>
            {tag.slice(0, 2).map((item, index) => (
              <TagWrapper key={uniqueId(index.toString())}>
                <Tag>{item}</Tag>
              </TagWrapper>
            ))}
          </TagContainer>
        </Container>
      </a>
    </Link>
  );
};

export default AccommodationProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 148px;
  height: 170px;
  margin-bottom: 24px;
`;

const Image = styled.img`
  width: 148px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.black)};
  margin-top: 6px;
  max-width: 148px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const TagWrapper = styled.div`
  width: fit-content;
  height: 20px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.border2};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  border-radius: 48px;
  padding: 3px 12px;
  ${({ theme }) => theme.mixin.flexCenter()};
`;

const Tag = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(11, theme.color.grey90)};
  max-width: 46px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const TagContainer = styled.span`
  display: flex;
  flex-direction: row;
  margin-top: 6px;
  column-gap: 4px;
`;
