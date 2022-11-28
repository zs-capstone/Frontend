import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useRemoveFeed } from "../../../../hooks/board/detail/useRemoveFeed";
import BorderButton from "../../ui/Button/BorderButton";
import { CommonButton } from "../../ui/Button/CommonButton";
import { Spacer } from "../../ui/Spacer/Spacer";

const FeedMenuModal: React.FC<{
  boardId?: number;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  const { boardId, modalOpen, setModalOpen } = props;

  const removeFeedAction = useRemoveFeed();

  const handleRemoveFeed = () => {
    setModalOpen(false);
    setTimeout(() => {
      if (confirm("게시글을 삭제하시겠습니까?")) {
        if (boardId) {
          removeFeedAction(boardId);
        }
      } else {
        return;
      }
    }, 0);
  };

  return (
    <>
      {modalOpen && <BackgroundLayout onClick={() => setModalOpen(false)} />}
      <Container modalOpen={modalOpen}>
        <Title>피드 변경</Title>
        <BorderButton
          link={`/feed/upload/${boardId}`}
          width={"296px"}
          height={"52px"}
          radius={"3px"}
          size={16}
        >
          피드 수정
        </BorderButton>
        <Spacer size={16} />
        <BorderButton
          onClick={handleRemoveFeed}
          width={"296px"}
          height={"52px"}
          radius={"3px"}
          color={"#EA3737"}
          size={16}
        >
          피드 삭제
        </BorderButton>
        <Spacer size={16} />
        <CommonButton
          onClick={() => setModalOpen(false)}
          width={"296px"}
          size={15}
          height={"50px"}
          radius={"10px"}
          backgroundColor={"#E8EBED"}
          color={"#26282B"}
        >
          취소
        </CommonButton>
      </Container>
    </>
  );
};

export default FeedMenuModal;

const Container = styled.div<{ modalOpen: boolean }>`
  width: 328px;
  height: 262px;
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10000;
  transform: translateX(100vw);
  padding: 20px 16px;

  opacity: 0;
  transition: 0.3s ease;

  ${(props) =>
    props.modalOpen && {
      transform: "translate(-50%,-50%)",
      opacity: 1,
    }}
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.grey, 700)};
  font-family: "PretendardBold";
  width: fit-content;
  margin-bottom: 16px;
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
