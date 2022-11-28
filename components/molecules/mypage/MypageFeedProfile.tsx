import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";
import { IMyFeedListDataType } from "../../../types/board";

const MypageFeedProfile: React.FC<IMyFeedListDataType> = (props) => {
  const { boardId, text, thumbnail, singleImage, dateTime, commentCount } =
    props;

  return (
    <Link href={`/feed/detail/${boardId}`}>
      <a>
        <Container>
          <Thumbnail src={thumbnail} alt={"마이페이지 내 피드 피드 썸네일"} />
          {!singleImage && (
            <ImageWrapper>
              <Image
                src={iconUrl("multiple_page")}
                width={20}
                height={20}
                alt={"피드 내 사진이 여러장일 경우 보여주는 아이콘"}
              />
            </ImageWrapper>
          )}
        </Container>
      </a>
    </Link>
  );
};

export default MypageFeedProfile;

const Container = styled.div`
  position: relative;
  width: 226px;
  height: 226px;

  ${({ theme }) =>
    theme.media.mobile({
      width: "155px",
      height: "155px",
    })}
`;

const Thumbnail = styled.img`
  width: 226px;
  height: 226px;
  border-radius: 7px;
  object-fit: cover;

  ${({ theme }) =>
    theme.media.mobile({
      width: "155px",
      height: "155px",
    })}
`;

const ImageWrapper = styled.span`
  position: absolute;
  top: 10px;
  right: 14px;

  ${({ theme }) =>
    theme.media.mobile({
      right: "10px",
    })}
`;
