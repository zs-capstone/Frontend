import styled from "styled-components";
import Image from "next/image";
import { iconUrl } from "../../../../axiosInstance/constants";

const Alert: React.FC<{ iconType: string; content: string }> = (props) => {
  const { iconType, content } = props;

  return (
    <Container>
      {iconType === "success" ? (
        <Image
          src={iconUrl("success")}
          width={"12px"}
          height={"12px"}
          alt={"인증 페이지 성공 아이콘"}
        />
      ) : (
        <Image
          src={iconUrl("error")}
          width={"12px"}
          height={"12px"}
          alt={"인증 페이지 실패 아이콘"}
        />
      )}
      <Content color={iconType || "error"}>{content}</Content>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => theme.mixin.flexCenter()};
  flex-direction: row;
  width: fit-content;
  margin-top: 6px;
  padding-left: 8px;
`;

const Content = styled.p<{ color: string }>`
  color: ${(props) =>
    props.theme.mixin.fontSize(
      12,
      props.color === "success"
        ? props.theme.color.grey70
        : props.theme.color.danger
    )};
  margin-left: 5px;
`;

export default Alert;
