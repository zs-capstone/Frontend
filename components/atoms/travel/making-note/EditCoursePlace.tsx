import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../../axiosInstance/constants";
import { IMakingNoteCourseDataType } from "../../../../types/course";

const EditCoursePlace: React.FC<{
  courseList: IMakingNoteCourseDataType[];
  isDragging: boolean;
  day: number;
  placeId: number;
  image: string;
  title: string;
  address: string;
  setProcessedCourseList: Dispatch<SetStateAction<number[][]>>;
}> = (props) => {
  const {
    isDragging,
    courseList,
    setProcessedCourseList,
    day,
    placeId,
    image,
    title,
    address,
  } = props;

  const handleDeletePlace = () => {
    const index = courseList[day - 1].places.findIndex(
      (place) => place.placeId === placeId
    );
    courseList[day - 1].places.splice(index, 1);
    setProcessedCourseList(
      courseList.map((dayList) => {
        return dayList.places.map((list) => {
          return list.placeId;
        });
      })
    );
  };

  return (
    <Container isDragging={isDragging}>
      <MenuImageContainer>
        <Image
          src={iconUrl("menu")}
          width={20}
          height={20}
          alt={"여행 일정 아이템을 드래그할 수 있는 아이콘"}
        />
      </MenuImageContainer>
      <ImageContainer src={image} alt={"여행 일정 코스별 여행 장소 사진"} />
      <TextWrapper>
        <Title>{title}</Title>
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
      <DeleteImageContainer>
        <Image
          onClick={handleDeletePlace}
          src={iconUrl("close")}
          width={20}
          height={20}
          alt={"여행 일정 아이템을 삭제할 수 있는 아이콘"}
        />
      </DeleteImageContainer>
    </Container>
  );
};

export default EditCoursePlace;

const Container = styled.div<{ isDragging: boolean }>`
  display: flex;
  position: relative;
  border-radius: 8px;
  align-items: center;
  background-color: ${(props) =>
    props.isDragging ? props.theme.color.background : props.theme.color.white};
  flex-direction: row;
  width: 537px;
  height: 90px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "328px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const ImageContainer = styled.img`
  border-radius: 4px;
  width: 64px;
  height: 64px;
  object-fit: cover;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  margin-bottom: 8px;
`;

const Address = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(12, theme.color.grey60)};
  margin-left: 4px;
  max-width: 370px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      fontSize: "10px",
      maxWidth: "160px",
    })}
`;

const TextWrapper = styled.span`
  margin-left: 8px;
`;

const AddressWrapper = styled.span`
  display: flex;
  flex-direction: row;
`;

const MenuImageContainer = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  margin-right: 15px;
  cursor: pointer;
`;

const DeleteImageContainer = styled.div`
  display: flex;
  position: absolute;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
`;
