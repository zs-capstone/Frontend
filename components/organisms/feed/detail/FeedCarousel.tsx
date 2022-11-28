import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { uniqueId } from "lodash";
import Image from "next/image";
import { iconUrl } from "../../../../axiosInstance/constants";

const Prev = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 3%;
  z-index: 3;
`;

const NextTo = styled.div`
  width: 36px;
  height: 36px;
  position: absolute;
  right: 3%;
  z-index: 3;
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: (
    <Prev>
      <Image
        src={iconUrl("prev_arrow")}
        width={36}
        height={36}
        alt={"다음 페이지로 넘어가는 캐러설 화살표"}
      />
    </Prev>
  ),
  nextArrow: (
    <NextTo>
      <Image
        src={iconUrl("next_arrow")}
        width={36}
        height={36}
        alt={"다음 페이지로 넘어가는 캐러설 화살표"}
      />
    </NextTo>
  ),
};

const FeedCarousel: React.FC<{ imageList: string[] }> = (props) => {
  const { imageList } = props;

  return (
    <Container>
      <StyledSlider {...settings}>
        {imageList.map((image, idx) => (
          <CarouselImage
            key={uniqueId(idx.toString())}
            src={image}
            alt={"피드 상세 페이지 캐러셀에 들어갈 이미지"}
          />
        ))}
      </StyledSlider>
    </Container>
  );
};

export default FeedCarousel;

const Container = styled.div`
  width: 472px;
  height: fit-content;
  border-radius: 7px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "328px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
      aspectRatio: "1/1",
    })}
`;

const CarouselImage = styled.img`
  width: 472px;
  height: 472px;
  border-radius: 7px;
  object-fit: cover;

  ${({ theme }) =>
    theme.media.tabletUnder({
      width: "328px",
      height: "328px",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      width: "100%",
      height: "fit-content",
      aspectRatio: "1/1",
    })}
`;

const StyledSlider = styled(Slider)`
  .slick-prev {
    ::before {
      display: none;
    }
  }

  .slick-next {
    ::before {
      display: none;
    }
  }

  .slick-dots li {
    width: 6px;
    height: 6px;
    margin: 0 3.5px;
  }

  .slick-dots li button {
    width: 6px;
    height: 6px;
  }

  .slick-dots li button:before {
    width: 6px;
    height: 6px;
    color: ${({ theme }) => theme.color.slick};
  }

  .slick-dots li.slick-active button:before {
    color: ${({ theme }) => theme.color.main50};
  }
`;
