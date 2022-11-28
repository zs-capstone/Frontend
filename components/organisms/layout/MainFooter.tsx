import Image from "next/image";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";

const MainFooter: React.FC = () => {
  return (
    <Footer>
      <ImageContainer>
        <Image
          src={iconUrl("logo_emblem")}
          alt={"심볼형 메인 로고"}
          width={150}
          height={36}
        />
      </ImageContainer>
      <Wrapper>
        <ContentTitle>주소</ContentTitle>
        <Spacer axis={"horizontal"} size={16} />
        <Content>
          서울특별시 강남구 테헤란로 311(역삼동)
          <br /> 아남타워빌딩 7층(06151)
        </Content>
      </Wrapper>
      <Spacer size={8} />
      <Wrapper>
        <ContentTitle>문의</ContentTitle>
        <Spacer axis={"horizontal"} size={16} />
        <Content>yeoreodigm@naver.com</Content>
      </Wrapper>
      <Spacer size={20} />
      <Copyright>Copyright 2022 Yeoreodigm all rights reserved.</Copyright>
    </Footer>
  );
};

export default MainFooter;

const Footer = styled.footer`
  width: 100vw;
  height: 241px;
  padding-left: 140px;
  border-top: 1px solid ${({ theme }) => theme.color.border2};

  ${({ theme }) =>
    theme.media.tabletUnder({
      padding: "0px 16px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      height: "181px",
    })}
`;

const ImageContainer = styled.div`
  margin: 34px 0px;

  ${({ theme }) =>
    theme.media.mobile({
      margin: "20px 0px 16px",
    })}
`;

const Wrapper = styled.span`
  display: flex;
`;

const ContentTitle = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(12, theme.color.grey80, 700)};
`;

const Content = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(12, theme.color.grey60, 400)};
`;

const Copyright = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(12, theme.color.grey40, 700)};
`;
