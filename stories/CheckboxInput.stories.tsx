import { Story } from "@storybook/react";
import CheckboxInput from "../components/atoms/ui/Input/CheckboxInput";

const Template: Story<{
  checked: boolean;
  tabIndex: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelWrap?: boolean;
}> = (args) => <CheckboxInput {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  checked: true,
};

const Component = {
  title: "component/ui/input/CheckboxInput",
  component: CheckboxInput,
};

export default Component;
