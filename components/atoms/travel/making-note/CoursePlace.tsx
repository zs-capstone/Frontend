import Image from "next/image";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import ChildButton from "../../ui/Button/ChildButton";
import PetButton from "../../ui/Button/PetButton";

const CoursePlace: React.FC<{
  placeId: number;
  child: boolean;
  animal: boolean;
  image: string;
  title: string;
  address: string;
}> = (props) => {
  const { image, title, child, animal, address } = props;

  return (
    <Container>
      <ImageContainer imageUrl={image} />
      <TextWrapper>
        <TitleWrapper>
          <Title>{title}</Title>
          {animal && <PetButton />}
          {child && <ChildButton />}
        </TitleWrapper>
        <AddressWrapper>
          <Image
            src={iconUrl("marker_grey")}
            width={14}
            height={14}
            alt={"여행 일정 코스별 여행 장소 주소 아이콘"}
          />
          <Address>{address}</Address>
        </AddressWrapper>
      </TextWrapper>
    </Container>
  );
};

export default CoursePlace;

const Container = styled.div`
  display: flex;
  position: relative;
  border-radius: 8px;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};
  flex-direction: row;
  width: 537px;
  height: 64px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "328px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const ImageContainer = styled.div<{ imageUrl: string }>`
  border-radius: 4px;
  background: url(${(props) => props.imageUrl});
  background-size: cover;
  width: 64px;
  height: 64px;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  margin-right: 4px;
`;

const Address = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(12, theme.color.grey60)};
  margin-left: 4px;
`;

const TextWrapper = styled.span`
  margin-left: 8px;
`;

const AddressWrapper = styled.span`
  display: flex;
  flex-direction: row;
`;

const TitleWrapper = styled.span`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
`;
