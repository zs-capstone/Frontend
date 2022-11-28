import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const TabBar: React.FC<{
  selected: number;
  tabs: { title: string; id: number }[];
  setSelectedTab: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const { selected, tabs, setSelectedTab } = props;

  return (
    <Container>
      {tabs.map((tab) => (
        <TabBlock
          key={tab.id}
          selected={tab.id === selected}
          onClick={() => setSelectedTab(tab.id)}
        >
          <Title selected={tab.id === selected}>{tab.title}</Title>
        </TabBlock>
      ))}
      <Border />
    </Container>
  );
};

export default TabBar;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.p<{ selected: boolean }>`
  font-size: ${({ theme }) => theme.mixin.fontSize(16)};
  color: ${(props) =>
    props.selected ? props.theme.color.grey80 : props.theme.color.grey50};

  ${({ theme }) =>
    theme.media.mobile({
      fontSize: "13px",
    })}
`;

const TabBlock = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.mixin.flexCenter()};
  cursor: pointer;
  padding: 16px;
  min-width: fit-content;

  border-top: ${(props) =>
    props.selected && `1px solid ${props.theme.color.grey40}`};
  border-right: ${(props) =>
    props.selected && `1px solid ${props.theme.color.grey40}`};
  border-left: ${(props) =>
    props.selected && `1px solid ${props.theme.color.grey40}`};
  border-bottom: ${(props) =>
    !props.selected && `1px solid ${props.theme.color.grey40}`};

  ${({ theme }) =>
    theme.media.mobile({
      padding: "10px",
    })}
`;

const Border = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.grey40};
`;
