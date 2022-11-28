import { Story } from "@storybook/react";
import Alert from "../components/atoms/ui/Alert/Alert";

const Template: Story<{ iconType: string; content: string }> = (args) => (
  <Alert {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  iconType: "success",
  content: "사용할 수 있는 이메일입니다.",
};

const Component = {
  title: "component/ui/Alert/Alert",
  component: Alert,
};

export default Component;
