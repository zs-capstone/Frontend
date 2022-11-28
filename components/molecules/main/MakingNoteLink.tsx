import Image from "next/image";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchTotalTravelNoteCount } from "../../../apis/note";
import { iconUrl } from "../../../axiosInstance/constants";
import { queryKeys } from "../../../react-query/constants";
import SpeechBubble from "../../atoms/main/SpeechBubble";
import BorderButton from "../../atoms/ui/Button/BorderButton";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";

const MakingNoteLink: React.FC = () => {
  const { data: totalTravelNoteCount } = useQuery<{ totalCount: number }>(
    queryKeys.totalTravelNoteCount,
    fetchTotalTravelNoteCount
  );

  return (
    <Container>
      <Image
        src={iconUrl("logo_white")}
        width={"55px"}
        height={"13px"}
        alt={"메인 페이지 메이킹노트 링크 버튼에 삽입된 여러다임 로고"}
        priority
      />
      <Title>
        번거로운 여행동선을
        <br />
        직접 짜드려요.
      </Title>
      <BorderButton
        width={"79px"}
        height={"32px"}
        padding={"6px 12px"}
        radius={"7px"}
        fontFamily={"PretendardBold"}
        link={"/travel/making-note/advance"}
        shadow
      >
        시작하기
      </BorderButton>
      <Spacer size={21} />
      <SpeechBubble
        content={`${totalTravelNoteCount?.totalCount}번째 여행 노트를 만들어보세요`}
      />
    </Container>
  );
};

export default MakingNoteLink;

const Container = styled.div`
  width: 554px;
  height: 240px;
  border-radius: 10px;
  padding: 20px 0 0 32px;
  background: url("https://yeoreodigm-s3.s3.ap-northeast-2.amazonaws.com/assets/icons/making_note_link_background.webp");

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "327px",
      height: "160px",
      padding: "22px 0 0 22px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
    })}
`;

const Title = styled.p`
  margin: 15px 0;
  font-size: ${({ theme }) => theme.mixin.fontSize(24, theme.color.white, 700)};
  line-height: 30px;
  font-family: "PretendardBold";

  ${({ theme }) =>
    theme.media.tabletUnder({
      margin: "12px 0",
      fontSize: "20px",
      lineHeight: "24px",
    })}
`;
