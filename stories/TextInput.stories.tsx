import { Story } from "@storybook/react";
import TextInput from "../components/atoms/ui/Input/TextInput";

const Template: Story<{
  tabIndex: number;
  placeholder?: string;
  width: string;
  height: string;
  value?: string;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = (args) => <TextInput {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  height: "40px",
  width: "200px",
};

const Component = {
  title: "component/ui/input/TextInput",
  component: TextInput,
};

export default Component;
