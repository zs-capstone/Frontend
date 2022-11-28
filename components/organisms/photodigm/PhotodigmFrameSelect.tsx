import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPhotodigmFrame } from "../../../apis/photodigm";
import { queryKeys } from "../../../react-query/constants";
import { IPhotodigmFrameType } from "../../../types/photodigm";
import PhotodigmFrame from "../../atoms/photodigm/PhotodigmFrame";

const PhotodigmFrameSelect: React.FC<{ photodigmId: number; frameId: number }> =
  (props) => {
    const { photodigmId, frameId } = props;

    const { data: frameData } = useQuery<IPhotodigmFrameType[]>(
      [queryKeys.photodigmFrame, photodigmId],
      () => fetchPhotodigmFrame(),
      { suspense: true }
    );

    return (
      <Container>
        <Title>프레임 선택</Title>
        <FrameWrapper>
          {frameData?.map((frame) => (
            <PhotodigmFrame
              key={frame.frameId}
              photodigmId={photodigmId}
              frameId={frame.frameId}
              imageUrl={frame.imageUrl}
              selectedId={frameId}
            />
          ))}
        </FrameWrapper>
      </Container>
    );
  };

export default PhotodigmFrameSelect;

const Container = styled.div`
  height: 166px;
  padding: 20px 140px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border1};
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.03);

  ${({ theme }) =>
    theme.media.tabletUnder({
      padding: "20px 16px",
    })}
`;

const FrameWrapper = styled.div`
  display: flex;
  column-gap: 12px;
  max-width: 960px;
  overflow-x: auto;
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(16, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  margin-bottom: 12px;
`;
