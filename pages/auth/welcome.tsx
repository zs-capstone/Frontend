import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { iconUrl } from "../../axiosInstance/constants";
import SubmitButton from "../../components/atoms/ui/Button/SubmitButton";
import { Spacer } from "../../components/atoms/ui/Spacer/Spacer";

const Welcome: NextPage = () => {
  return (
    <Container>
      <Spacer size={105} />
      <Image
        src={iconUrl("smile")}
        height={92}
        width={92}
        alt={"회원가입을 축하하는 웃는 이미지"}
      />
      <Spacer size={23} />
      <Title>환영합니다!</Title>
      <Spacer size={23} />
      <SubContent>
        제주 어디갈래와 함께
        <br />
        즐거운 여행을 준비하세요!
      </SubContent>
      <Spacer size={37} />
      <Link href="/">
        <a>
          <SubmitButton tabIndex={1}>메인으로</SubmitButton>
        </a>
      </Link>
    </Container>
  );
};

export default Welcome;

const Container = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(24, theme.color.grey90, 700)};
  font-family: "PretendardBold";
`;

const SubContent = styled.p`
  width: 170px;
  line-height: 28px;
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(16, theme.color.grey70, 400)};
  text-align: center;
`;
