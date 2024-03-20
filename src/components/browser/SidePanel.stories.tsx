import { Meta } from "@storybook/react";
import SidePanelComponent from "./SidePanel";
import * as atomMocks from "@/mocks/atoms.mock";
import { Provider } from "jotai";
import HydrateAtoms from "@/components/HydrateAtoms";
import { cubeDimensionsStatusAtom, cubesAtom } from "@/domain/cubes";
import { filterAtom, timeViewAtom } from "@/domain/filters";

export const SidePanel = () => {
  return (
    <SidePanelComponent
      slots={{
        drawer: {
          container: null,
        },
      }}
    />
  );
};
const meta: Meta = {
  component: SidePanel,
  title: "organisms / SidePanel",
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={[
            [cubesAtom, atomMocks.cubes],
            [timeViewAtom, "month"],
            [cubeDimensionsStatusAtom, atomMocks.cubeDimensionsStatus],
            [filterAtom, atomMocks.filters],
          ]}
        >
          <Story />
        </HydrateAtoms>
      </Provider>
    ),
  ],
};

export default meta;
