import { TableOfContents } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/TableOfContents",
  component: TableOfContents,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TableOfContents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    activeColor: "#ACB4BD",
    data: {
      value: {
        schema: "dast",
        document: {
          type: "root",
          children: [
            {
              type: "heading",
              level: 1,
              children: [
                {
                  type: "span",
                  value: "Title 1",
                },
              ],
            },
            {
              type: "heading",
              level: 6,
              children: [
                {
                  type: "span",
                  value: "First title",
                },
              ],
            },
            {
              type: "heading",
              level: 2,
              children: [
                {
                  type: "span",
                  value: "heading 2",
                },
              ],
            },
            {
              type: "heading",
              level: 3,
              children: [
                {
                  type: "span",
                  value: "heading 3",
                },
              ],
            },
            {
              type: "heading",
              level: 4,
              children: [
                {
                  type: "span",
                  value: "heading 4",
                },
              ],
            },
            {
              type: "heading",
              level: 5,
              children: [
                {
                  type: "span",
                  value: "heading 5",
                },
              ],
            },
            {
              type: "heading",
              level: 6,
              children: [
                {
                  type: "span",
                  value: "heading 6",
                },
              ],
            },
            {
              type: "thematicBreak",
            },
            {
              type: "paragraph",
              children: [
                {
                  type: "span",
                  value: "",
                },
              ],
            },
            {
              type: "paragraph",
              children: [
                {
                  type: "span",
                  marks: ["strong"],
                  value: "Lorem",
                },
                {
                  type: "span",
                  value: " ",
                },
                {
                  type: "span",
                  marks: ["emphasis"],
                  value: "ipsum",
                },
                {
                  type: "span",
                  value: " ",
                },
                {
                  type: "span",
                  marks: ["underline"],
                  value: "dolor",
                },
                {
                  type: "span",
                  value: " ",
                },
                {
                  type: "span",
                  marks: ["strikethrough"],
                  value: "sit",
                },
                {
                  type: "span",
                  value: " ",
                },
                {
                  type: "span",
                  marks: ["highlight"],
                  value: "amet",
                },
                {
                  type: "span",
                  value: ". ",
                },
                {
                  type: "span",
                  marks: ["code"],
                  value: "Non",
                },
                {
                  type: "span",
                  value: " ",
                },
                {
                  url: "www.google.com",
                  type: "link",
                  children: [
                    {
                      type: "span",
                      value: "quia",
                    },
                  ],
                },
                {
                  type: "span",
                  value:
                    " accusantium et similique voluptas ut quas nesciunt in neque magnam in rerum molestias et accusantium amet in blanditiis facere. Sed officiis adipisci eum provident fuga est recusandae eveniet et doloremque tempora et nostrum quam.",
                },
              ],
            },
            {
              type: "list",
              style: "bulleted",
              children: [
                {
                  type: "listItem",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "span",
                          value: "list item 1",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "span",
                          value: "list item 2",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "span",
                          value: "list item 3",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "list",
              style: "numbered",
              children: [
                {
                  type: "listItem",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "span",
                          value: "list item 1",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "span",
                          value: "list item 2",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "span",
                          value: "list item 3",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "blockquote",
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      type: "span",
                      value: "Some quote from someone intelligent ",
                    },
                  ],
                },
              ],
              attribution: "Someone intelligent",
            },
            {
              type: "heading",
              level: 1,
              children: [
                {
                  type: "span",
                  value: "Title 2",
                },
              ],
            },
            {
              type: "paragraph",
              children: [
                {
                  type: "span",
                  value:
                    "Ut exercitationem ipsa est reprehenderit rerum ut molestias dignissimos aut voluptatem nostrum quo iure omnis ex nihil mollitia. ",
                },
                {
                  type: "span",
                  marks: ["emphasis"],
                  value: "Et",
                },
                {
                  type: "span",
                  value:
                    " quis nihil quo nihil odit quo impedit natus a quae consequatur ad dolor nemo est delectus minima ut dolore dolor. ",
                },
                {
                  type: "span",
                  marks: ["emphasis"],
                  value: "Et",
                },
                {
                  type: "span",
                  value: " animi possimus eos omnis vitae nam laudantium aliquam aut dolor possimus.",
                },
              ],
            },
            {
              type: "heading",
              level: 1,
              children: [
                {
                  type: "span",
                  value: "Title 3",
                },
              ],
            },
            {
              type: "paragraph",
              children: [
                {
                  type: "span",
                  value:
                    "Id eveniet libero est molestiae magnam ut minima totam vel provident consequuntur sed voluptatem voluptatem? Et impedit saepe est perspiciatis voluptatem hic tenetur enim eum sint saepe eum temporibus ipsum est tempora earum. ",
                },
                {
                  type: "span",
                  marks: ["emphasis"],
                  value: "Non",
                },
                {
                  type: "span",
                  value:
                    " reprehenderit asperiores 33 omnis labore eum cupiditate molestiae vel voluptatibus internos.",
                },
              ],
            },
            {
              type: "paragraph",
              children: [
                {
                  type: "span",
                  value: "",
                },
              ],
            },
          ],
        },
      },
    },
  },
};
