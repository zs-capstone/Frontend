import { Story } from "@storybook/react";
import RadioInput from "../components/atoms/ui/Input/RadioInput";

const Template: Story<{
  defaultChecked?: boolean;
  name: string;
  value: string;
  tabIndex?: number;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = (args) => (
  <>
    <RadioInput {...args} name="test" defaultChecked={true} />
    <RadioInput {...args} name="test" />
  </>
);

export const Basic = Template.bind({});

Basic.args = {};

const Component = {
  title: "component/ui/input/RadioInput",
  component: RadioInput,
};

export default Component;
