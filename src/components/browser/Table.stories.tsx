import { StoryObj, Meta } from "@storybook/react";
import { Table as TableComponent, TableProps } from "./Table";
import { cubeDimensionsStatus } from "@/mocks/atoms.mock";

export default {
  title: "components / Table",
  component: TableComponent,
} as Meta;

export const Table: StoryObj<TableProps> = {
  args: {
    observations: [],
    dimensions: {
      ...cubeDimensionsStatus.data!.measures,
      ...cubeDimensionsStatus.data!.properties,
    },
  },
};
