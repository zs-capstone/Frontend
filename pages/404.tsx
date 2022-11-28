import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { iconUrl } from "../axiosInstance/constants";
import { CommonButton } from "../components/atoms/ui/Button/CommonButton";
import { Spacer } from "../components/atoms/ui/Spacer/Spacer";

const Custom404: React.FC = () => {
  return (
    <Container>
      <Image
        src={iconUrl("embarrassed")}
        width={104}
        height={104}
        alt={"404 페이지 오류 발생 이미지"}
      />
      <Spacer size={35} />
      <Description>
        오류가 생겨 페이지에 접속할 수 없거나
        <br /> 존재하지 않는 페이지 입니다.
      </Description>
      <Spacer size={24} />
      <ManualBlock>
        <ManualText>1. Wifi 혹은 인터넷 연결 상태를 확인해주세요.</ManualText>
        <ManualText>2. 새로고침을 통해 다시 접속해 주세요.</ManualText>
      </ManualBlock>
      <Spacer size={24} />
      <Link href={"/"}>
        <a>
          <CommonButton
            size={15}
            backgroundColor={"#FA8125"}
            color={"#FFFFFF"}
            width={"327px"}
            height={"50px"}
            radius={"10px"}
          >
            홈으로
          </CommonButton>
        </a>
      </Link>
    </Container>
  );
};

export default Custom404;

const Container = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: column;
  margin: 278px auto 0px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      marginTop: "105px",
    })}
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};
  line-height: 18px;
  text-align: center;
`;

const ManualBlock = styled.div`
  width: 328px;
  height: 92px;
  background-color: ${({ theme }) => theme.color.background};
  padding: 16px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const ManualText = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(14, theme.color.grey80, 400)};
  margin: 6px 0;
`;
