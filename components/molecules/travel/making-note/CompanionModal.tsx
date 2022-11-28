import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCompanionList } from "../../../../apis/note";
import { useAddCompanion } from "../../../../hooks/travel/making-note/useAddCompanion";
import { queryKeys } from "../../../../react-query/constants";
import { ICompanionListType } from "../../../../types/note";
import CompanionProfile from "../../../atoms/travel/making-note/CompanionProfile";
import BorderButton from "../../../atoms/ui/Button/BorderButton";
import { CommonButton } from "../../../atoms/ui/Button/CommonButton";
import { Spacer } from "../../../atoms/ui/Spacer/Spacer";

const CompanionModal: React.FC<{ makingNoteId: number }> = (props) => {
  const { makingNoteId } = props;

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [companionInput, setCompanionInput] = useState<string>("");

  const { data: companionList } = useQuery<ICompanionListType[]>(
    [queryKeys.makingNoteCompanionList, makingNoteId],
    () => fetchCompanionList(makingNoteId)
  );

  const addCompanionAction = useAddCompanion(makingNoteId);

  const handleModalClick = () => {
    setModalOpen((prev) => !prev);
  };

  const handleAddCompanion = () => {
    setCompanionInput("");
    addCompanionAction({ id: makingNoteId, content: companionInput });
  };

  return (
    <>
      <CommonButton
        width={"327px"}
        height={"50px"}
        size={15}
        radius={"10px"}
        backgroundColor={"#FA8125"}
        color={"#FFFFFF"}
        rWidth={"100%"}
        onClick={handleModalClick}
      >
        동행자 추가
      </CommonButton>
      {modalOpen && <BackgroundLayout onClick={() => setModalOpen(false)} />}
      <Modal modalOpen={modalOpen}>
        <Title>동행자 정보</Title>
        <Spacer size={20} />
        <CompanionInfo>
          {companionList?.map((companion) => (
            <CompanionProfile
              key={companion.memberId}
              makingNoteId={makingNoteId}
              memberId={companion.memberId}
              email={companion.email}
              nickname={companion.nickname}
              profileImage={companion.profileImage}
            />
          ))}
        </CompanionInfo>
        <Spacer size={16} />
        <CompanionAdd>
          <Input
            value={companionInput}
            spellCheck={false}
            placeholder={"이메일을 입력해 주세요."}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCompanionInput(e.target.value)
            }
          />
          <BorderButton
            onClick={handleAddCompanion}
            width={"100px"}
            height={"38px"}
          >
            추가하기
          </BorderButton>
        </CompanionAdd>
        <Spacer size={16} />
        <CommonButton
          size={15}
          width={"296px"}
          height={"50px"}
          backgroundColor={"#FA8125"}
          radius={"10px"}
          color={"#FFFFFF"}
          onClick={() => setModalOpen(false)}
        >
          완료
        </CommonButton>
      </Modal>
    </>
  );
};

export default CompanionModal;

const BackgroundLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

const Modal = styled.div<{ modalOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10000;

  opacity: 0;
  transform: translateX(100vw);
  transition: 0.3s ease;

  ${(props) =>
    props.modalOpen && {
      transform: "translate(-50%,-50%)",
      opacity: 1,
    }}

  width: 328px;
  height: 364px;
  padding: 20px 16px;
  border: 1px solid ${({ theme }) => theme.color.border2};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);

  :focus {
    outline: none;
  }
`;

const CompanionAdd = styled.span`
  display: flex;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.grey, 700)};
  font-family: "PretendardBold";
`;

const CompanionInfo = styled.div`
  height: 168px;
  overflow: auto;
`;

const Input = styled.input`
  width: 186px;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.color.border2};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.background};
  font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey90)};

  ::placeholder {
    font-size: ${({ theme }) => theme.mixin.fontSize(15, theme.color.grey50)};
  }
`;
