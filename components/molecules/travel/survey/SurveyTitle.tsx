import styled from "styled-components";

const SurveyTitle: React.FC = () => {
  return (
    <>
      <Title>여행지 성향 테스트</Title>
      <SubContent>마음에 드는 여행지를 선택해주세요!</SubContent>
    </>
  );
};

export default SurveyTitle;

const Title = styled.h1`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(32, theme.color.grey90, 700)};
  font-family: "NexonBold";
  margin: 44px 0 32px;

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: 20,
      margin: "33px 0 16px",
    })}
`;

const SubContent = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(24, theme.color.grey90, 400)};
  font-family: "NexonLight";

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: 16,
    })}
`;
