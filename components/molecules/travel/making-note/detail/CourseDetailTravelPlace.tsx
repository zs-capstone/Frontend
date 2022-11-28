import Link from "next/link";
import styled from "styled-components";
import { IRouteInfosType } from "../../../../../types/common";
import { PlaceBetweenSingle } from "../../../../atoms/travel/making-note/PlaceBetween";

const CourseDetailTravelPlace: React.FC<{
  title: string;
  index: number;
  address: string;
  hasNext: boolean;
  routeInfo: IRouteInfosType;
  placeId: number;
}> = (props) => {
  const { title, index, hasNext, routeInfo, placeId } = props;

  return (
    <Container>
      <Wrapper>
        <CourseIndex>
          <Index>{index}</Index>
        </CourseIndex>
        <Link href={`/travel/place/detail/${placeId}`}>
          <a>
            <Title>{title}</Title>
          </a>
        </Link>
      </Wrapper>
      {!hasNext && <PlaceBetweenSingle courseDistance={routeInfo} />}
    </Container>
  );
};

export default CourseDetailTravelPlace;

const Container = styled.div`
  width: 100%;
`;

const CourseIndex = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  background-color: ${({ theme }) => theme.color.grey70};
  width: 20px;
  height: 20px;
  border-radius: 100%;
`;

const Index = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.white, 700)};
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey80)};
  margin-left: 8px;
`;
