import { Meta, StoryObj } from "@storybook/react";
import { ErrorAlert as ErrorAlertComponent } from "./ErrorAlert";

// following is the sotry for the ErrorAlert component
const meta: Meta = {
  component: ErrorAlertComponent,
  title: "App components / ErrorAlert",
};

export default meta;

export const ErrorAlert: StoryObj = {
  args: {
    error: new Error("This is an error"),
  },
};
