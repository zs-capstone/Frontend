import styled from "styled-components";
import Image from "next/image";
import { iconUrl } from "../../../axiosInstance/constants";

const ProgressBar: React.FC<{ progress: number }> = (props) => {
  const { progress } = props;

  return (
    <Container>
      <MarkerWrapper progress={progress}>
        <Image
          width={26}
          height={29}
          src={iconUrl("marker")}
          alt={"성향 테스트 진행도를 알려주는 마커"}
        />
        <MarkerNumber>{progress}</MarkerNumber>
      </MarkerWrapper>
      <MarkerDestWrapper>
        <Image
          width={26}
          height={29}
          src={iconUrl("marker_dest")}
          alt={"성향 테스트 엔드 포인트를 알려주는 마커"}
        />
        <MarkerDestNumber>10</MarkerDestNumber>
      </MarkerDestWrapper>
      <Bar>
        <Filling progress={progress}></Filling>
      </Bar>
    </Container>
  );
};

export default ProgressBar;

const Container = styled.div`
  margin: 28px 0 56px;
  padding-top: 33px;
  position: relative;

  ${({ theme }) =>
    theme.media.mobile({
      margin: "30px 0 32px",
    })}
`;

const MarkerWrapper = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: ${(props) => props.progress * 60 - 1}px;
  z-index: 1;
  transition: left 1s;
  transform: translateX(-50%);
  width: fit-content;
  height: fit-content;

  ${(props) =>
    props.theme.media.mobile({
      left: `${props.progress * 30 - 1}px`,
    })}
`;

const MarkerDestWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 1px;
  transform: translateX(50%);
  width: fit-content;
  height: fit-content;
`;

const MarkerNumber = styled.p`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;

const MarkerDestNumber = styled.p`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.grey60, 700)};
  font-family: "PretendardBold";
`;

const Bar = styled.div`
  width: 600px;
  height: 11px;
  background-color: ${({ theme }) => theme.color.darkest};
  border-radius: 60px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "300px",
    })}
`;

const Filling = styled.div<{ progress: number }>`
  height: 100%;
  width: ${(props) => props.progress * 60}px;
  border-radius: 60px;
  background-color: ${({ theme }) => theme.color.secondary60};
  transition: width 1s;

  ${(props) =>
    props.theme.media.mobile({
      width: `${props.progress * 30 - 1}px`,
    })}
`;
