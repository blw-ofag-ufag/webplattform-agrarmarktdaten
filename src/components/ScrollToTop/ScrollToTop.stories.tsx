import { ScrollToTop } from "./";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/ScrollToTop",
  component: ScrollToTop,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => {
      return (
        <div style={{ height: "2000px", position: "relative", display: "flex", alignItems: "end" }}>
          <div
            style={{
              position: "sticky",
              bottom: "100px",
              right: "20px",
              height: "fit-content",
            }}
          >
            <Story />
          </div>
        </div>
      );
    },
  ],
} satisfies Meta<typeof ScrollToTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
