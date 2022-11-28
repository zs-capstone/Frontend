import styled from "styled-components";

const Ranks: React.FC<{ rank: number }> = (props) => {
  const { rank } = props;

  return (
    <Container>
      <Rank>{rank}</Rank>
    </Container>
  );
};

export default Ranks;

const Container = styled.div`
  width: 23px;
  height: 26px;
  ${({ theme }) => theme.mixin.flexCenter()};
  background-color: ${({ theme }) => theme.color.main50};
`;

const Rank = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.white, 700)};
  font-family: "PretendardBold";
`;
