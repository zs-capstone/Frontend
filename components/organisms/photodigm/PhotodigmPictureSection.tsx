import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPhotodigmPictureList } from "../../../apis/photodigm";
import { queryKeys } from "../../../react-query/constants";
import { IPhotodigmPictureListType } from "../../../types/photodigm";
import PhotodigmPictureSelectBox from "../../molecules/photodigm/PhotodigmPictureSelectBox";

const PhotodigmPictureSection: React.FC<{ photodigmId: number }> = (props) => {
  const { photodigmId } = props;

  const { data: pictureListData } = useQuery<IPhotodigmPictureListType>(
    [queryKeys.photodigmPictureList, photodigmId],
    () => fetchPhotodigmPictureList(photodigmId)
  );

  return (
    <Container>
      <Title>사진 추가</Title>
      <SelectBoxWrapper>
        {pictureListData && (
          <PhotodigmPictureSelectBox
            key={1}
            photodigmId={photodigmId}
            pictureId={1}
            picture={pictureListData.pictureUrls[0]}
          />
        )}
        {pictureListData && (
          <PhotodigmPictureSelectBox
            key={2}
            photodigmId={photodigmId}
            pictureId={2}
            picture={pictureListData.pictureUrls[1]}
          />
        )}
        {pictureListData && (
          <PhotodigmPictureSelectBox
            key={3}
            photodigmId={photodigmId}
            pictureId={3}
            picture={pictureListData.pictureUrls[2]}
          />
        )}
        {pictureListData && (
          <PhotodigmPictureSelectBox
            key={4}
            photodigmId={photodigmId}
            pictureId={4}
            picture={pictureListData.pictureUrls[3]}
          />
        )}
      </SelectBoxWrapper>
    </Container>
  );
};

export default PhotodigmPictureSection;

const Container = styled.div`
  min-width: 144px;
  height: fit-content;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.border1};
  box-shadow: 0px -1px 18px rgba(0, 0, 0, 0.03);
  border-radius: 11px;
  padding-top: 20px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "100%",
      height: "fit-content",
    })}
  ${({ theme }) =>
    theme.media.mobile({
      height: "140px",
      width: "328px",
    })};
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(16, theme.color.grey90, 700)};
  width: fit-content;
  margin-left: 20px;
  margin-bottom: 14px;
  font-family: "PretendardBold";
`;

const SelectBoxWrapper = styled.span`
  display: flex;
  flex-direction: column;

  ${({ theme }) =>
    theme.media.tabletUnder({
      flexDirection: "row",
    })}
`;
