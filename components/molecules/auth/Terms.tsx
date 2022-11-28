import { useState } from "react";
import styled from "styled-components";
import TermModal from "../../atoms/auth/TermModal";
import { CommonButton } from "../../atoms/ui/Button/CommonButton";
import CheckboxInput from "../../atoms/ui/Input/CheckboxInput";

const Terms: React.FC<{
  isPrimary?: boolean;
  optional?: boolean;
  checked: boolean;
  label: string;
  tabIndex: number;
  id: string;
  handleAgreeTerm?: (id: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  content?: string;
}> = (props) => {
  const {
    isPrimary,
    optional,
    checked,
    label,
    id,
    tabIndex,
    handleAgreeTerm,
    onChange,
    title,
    content,
  } = props;

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  if (isPrimary) {
    return (
      <PrimaryContainer checked={checked}>
        <Wrapper>
          <CheckboxInput
            tabIndex={tabIndex}
            onChange={onChange}
            checked={checked}
          />
          <PrimaryLabel>{label}</PrimaryLabel>
        </Wrapper>
      </PrimaryContainer>
    );
  }

  return (
    <Container>
      <Wrapper>
        <CheckboxInput
          tabIndex={tabIndex}
          onChange={onChange}
          checked={checked}
        />
        <Label>{label}</Label>
      </Wrapper>
      {!optional && title && content && handleAgreeTerm && (
        <>
          <CommonButton onClick={() => setModalOpen(true)}>보기</CommonButton>
          <TermModal
            id={id}
            handleAgreeTerm={handleAgreeTerm}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            title={title}
            content={content}
          />
        </>
      )}
    </Container>
  );
};

export default Terms;

const PrimaryContainer = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.backgroundLight};
  max-width: 328px;
  height: 56px;
  border-radius: 10px;
  padding: 16px;
  border: ${(props) =>
    props.checked
      ? `2px solid ${props.theme.color.main50}`
      : `2px solid ${props.theme.color.background}`};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  max-width: 328px;
`;

const Wrapper = styled.span`
  ${({ theme }) => theme.mixin.flexCenter()}
`;

const PrimaryLabel = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(16, theme.color.grey90)};
  margin-left: 10px;
`;

const Label = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.black)};
  margin-left: 10px;
`;
