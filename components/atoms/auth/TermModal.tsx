import { uniqueId } from "lodash";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { iconUrl } from "../../../axiosInstance/constants";
import { CommonButton } from "../ui/Button/CommonButton";

const TermModal: React.FC<{
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  id: string;
  handleAgreeTerm: (id: string) => void;
  content: string;
}> = (props) => {
  const { modalOpen, setModalOpen, handleAgreeTerm, id, title, content } =
    props;

  const handleClickButton = () => {
    handleAgreeTerm(id);
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && <BackgroundLayout onClick={() => setModalOpen(false)} />}
      <Container modalOpen={modalOpen}>
        <TitleWrapper>
          <Title>{title}</Title>
          <ImageContainer>
            <Image
              onClick={() => setModalOpen(false)}
              src={iconUrl("close")}
              width={20}
              height={20}
              alt={"모달 창을 닫는 아이콘"}
            />
          </ImageContainer>
        </TitleWrapper>
        <ContentWrapper>
          {content.split("\n").map((elem, idx) => (
            <Content key={uniqueId(idx.toString())}>{elem}</Content>
          ))}
        </ContentWrapper>
        <ButtonWrapper>
          <CommonButton
            onClick={handleClickButton}
            width={"170px"}
            height={"52px"}
            radius={"4px"}
            backgroundColor={"#FA8125"}
            color={"#FFFFFF"}
            size={16}
          >
            동의합니다.
          </CommonButton>
        </ButtonWrapper>
      </Container>
    </>
  );
};

export default TermModal;

const Container = styled.div<{ modalOpen: boolean }>`
  width: 440px;
  height: 660px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.border1};
  background-color: ${({ theme }) => theme.color.white};
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10000;
  transform: translateX(100vw);
  opacity: 0;
  transition: 0.3s ease;

  ${(props) =>
    props.modalOpen && {
      transform: "translate(-50%,-50%)",
      opacity: 1,
    }}

  ${({ theme }) =>
    theme.media.mobile({
      width: "360px",
    })}
`;

const BackgroundLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

const TitleWrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
  height: 36px;
  align-items: center;
`;

const Title = styled.span`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(16, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  width: fit-content;
`;

const ContentWrapper = styled.span`
  display: flex;
  flex-direction: column;
  max-height: 500px;
  overflow-y: auto;
`;

const Content = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(16, theme.color.grey90, 700)};
  line-height: 30px;
`;

const ImageContainer = styled.div`
  cursor: pointer;
`;

const ButtonWrapper = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
