import { Story } from "@storybook/react";
import SubmitButton from "../components/atoms/ui/Button/SubmitButton";

const Template: Story<{
  disabled?: boolean;
  tabIndex: number;
  children: React.ReactNode;
}> = (args) => <SubmitButton {...args}>버튼</SubmitButton>;

export const Basic = Template.bind({});

Basic.args = {
  disabled: false,
};

const Component = {
  title: "component/ui/button/SubmitButtonInput",
  component: SubmitButton,
};

export default Component;
