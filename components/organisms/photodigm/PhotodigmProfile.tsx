import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";
import PhotodigmTitleEdit from "../../molecules/photodigm/PhotodigmTitleEdit";

const PhotodigmProfile: React.FC<{ title?: string; photodigmId: number }> = (
  props
) => {
  const { title, photodigmId } = props;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <Container>
      {!isEdit ? (
        <TitleWrapper>
          <Title>{title}</Title>
          <ImageWrapper>
            <Image
              onClick={() => setIsEdit(true)}
              src={iconUrl("edit")}
              width={20}
              height={20}
              alt={"포토다임 제목 수정 아이콘"}
            />
          </ImageWrapper>
        </TitleWrapper>
      ) : (
        <PhotodigmTitleEdit
          photodigmId={photodigmId}
          setIsEdit={setIsEdit}
          defaultTitle={title || ""}
        />
      )}
    </Container>
  );
};

export default PhotodigmProfile;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  padding: 0 140px;
  background-color: ${({ theme }) => theme.color.white};
  border-bottom: 1px solid ${({ theme }) => theme.color.grey20};

  ${({ theme }) =>
    theme.media.tabletUnder({
      padding: "0 16px",
    })}
`;

const TitleWrapper = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(24, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin-right: 10px;

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: "18px",
      marginRight: "4px",
      overflow: "auto",
      whiteSpace: "nowrap",
    })}
`;

const ImageWrapper = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.mixin.flexCenter()};
  min-width: fit-content;
`;
