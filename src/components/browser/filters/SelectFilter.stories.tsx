import { createGrouping, valueChainHierarchyLevels } from "@/domain/filters";
import SelectFilterComponent from "./SelectFilter";

export const SelectFilter = () => {
  return (
    <SelectFilterComponent
      onChange={(newValues) => console.log("change", newValues)}
      values={[
        {
          value: "value-chain-detail/1",
          label: "Produktion nicht weiter definiert",
          hierarchy: {
            "value-chain-detail": { value: "value-chain/1", label: "Produktion" },
            "value-chain": {},
            market: {},
          },
        },
        {
          value: "value-chain-detail/2",
          label: "ab Hof (Stufe Produktion)",
          hierarchy: {
            "value-chain-detail": { value: "value-chain/1", label: "Produktion" },
            "value-chain": {},
            market: {},
          },
        },
      ]}
      options={[
        {
          value: "value-chain-detail/1",
          label: "Produktion nicht weiter definiert",
          hierarchy: {
            "value-chain-detail": { value: "value-chain/1", label: "Produktion" },
            "value-chain": {},
            market: {},
          },
        },
        {
          value: "value-chain-detail/2",
          label: "ab Hof (Stufe Produktion)",
          hierarchy: {
            "value-chain-detail": { value: "value-chain/1", label: "Produktion" },
            "value-chain": {},
            market: {},
          },
        },
      ]}
      withSearch
      groups={createGrouping(valueChainHierarchyLevels)}
    />
  );
};

export default {
  component: SelectFilterComponent,
  title: "App components / SelectFilter",
};
