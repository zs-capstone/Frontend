import { Dispatch, SetStateAction, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { IMakingNoteCourseDataType } from "../../../../types/course";
import EditCoursePlace from "../../../atoms/travel/making-note/EditCoursePlace";

const EditDayOfCourse: React.FC<{
  isEdit: boolean;
  courseData: IMakingNoteCourseDataType[];
  setProcessedCourseList: Dispatch<SetStateAction<number[][]>>;
}> = (props) => {
  const { isEdit, courseData, setProcessedCourseList } = props;

  const [courseList, setCourseList] =
    useState<IMakingNoteCourseDataType[]>(courseData);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const target = courseList[+source.droppableId - 1].places.splice(
      source.index,
      1
    );

    courseList[+destination.droppableId - 1].places.splice(
      destination.index,
      0,
      target[0]
    );

    setCourseList(courseList);

    setProcessedCourseList(
      courseList.map((dayList) => {
        return dayList.places.map((list) => {
          return list.placeId;
        });
      })
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {courseData.map((course: IMakingNoteCourseDataType) => (
        <Droppable droppableId={course.day.toString()} key={course.day}>
          {(provided) => (
            <div
              className={course.day.toString()}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Container key={course.day}>
                <Header>
                  <Day>{course.day}일차</Day>
                </Header>
                <PlaceList>
                  {course.places.map((place, index) => (
                    <Draggable
                      draggableId={place.index.toString()}
                      index={index}
                      key={place.index.toString()}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <EditCoursePlace
                              courseList={courseList}
                              setProcessedCourseList={setProcessedCourseList}
                              isDragging={snapshot.isDragging}
                              day={course.day}
                              placeId={place.placeId}
                              image={place.imageUrl}
                              title={place.title}
                              address={place.address}
                            />
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                </PlaceList>
                {provided.placeholder}
              </Container>
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
};

export default EditDayOfCourse;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 17px;
  padding-bottom: 41px;
  border-bottom: 6px solid ${({ theme }) => theme.color.background};
  margin-bottom: 38px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      paddingLeft: "0px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      padding: "0 16px 17px",
    })}
`;

const Day = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(15, theme.color.main50, 700)};
  font-family: "PretendardBold";
`;

const Header = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 26px;
`;

const PlaceList = styled.div`
  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;
