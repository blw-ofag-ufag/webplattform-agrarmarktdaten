import { IcControlChevronUp } from "@/icons/icons-jsx/control";
import { t } from "@lingui/macro";
import {
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummaryProps,
  Checkbox,
  FormControlLabel,
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Stack,
  TextField,
  accordionDetailsClasses,
  accordionSummaryClasses,
  styled,
} from "@mui/material";
import { uniqBy } from "lodash";
import { useMemo } from "react";

export type Option = {
  label: string;
  value: string;
  checked?: boolean;
} & { [key: string]: string };

type Node<T extends Option> = {
  id: string;
  level: number;
  children: Node<T>[];
  value?: T;
  checked?: boolean;
  indeterminate?: boolean;
};

const nodeFromOption = <T extends Option>(option: T, level: number): Node<T> => ({
  id: option.value,
  level,
  children: [],
  value: option,
  checked: option.checked,
});

const stratify = <T extends Option>(
  items: T[],
  groupFunctions: ((item: T) => string)[],
  level = 0
) => {
  if (groupFunctions.length === 0) {
    return items.map((item) => nodeFromOption(item, level));
  }

  const groupFn = groupFunctions[0];
  const groupedItems = new Map<string, T[]>();

  for (const item of items) {
    const key = groupFn(item);
    if (!groupedItems.has(key)) {
      groupedItems.set(key, []);
    }
    groupedItems.get(key)!.push(item);
  }

  const nextGroupingFunctions = groupFunctions.slice(1);

  const result: Node<T>[] = [];
  for (const [key, subItems] of groupedItems) {
    const children = stratify(subItems, nextGroupingFunctions, level + 1);
    if (key) {
      result.push({
        id: key,
        level,
        checked: children.every((c) => c.checked),
        indeterminate: children.some((c) => c.checked),
        children,
      });
    } else {
      result.push(...children.map((c) => ({ ...c, level })));
    }
  }

  return result;
};

const getValues = <T extends Option>(node: Node<T>): T[] => {
  if (node.children.length === 0) {
    return [node.value!];
  }
  return node.children.flatMap(getValues);
};

export default function Select<T extends Option>({
  options = [],
  values = [],
  groups,
  onChange,
}: {
  options: T[];
  values: T[];
  groups?: Array<(item: T) => string>;
  onChange: (newValues: T[]) => void;
}) {
  const itemTree = useMemo(() => {
    const optionsWithChecked = options.map((option) => ({
      ...option,
      checked: values.some((v) => v.value === option.value),
    }));

    return stratify(optionsWithChecked, groups || []);
  }, [options, values, groups]);

  const onChangeItem = (node: Node<T>, checked: boolean) => {
    const targetValues = getValues(node);

    if (checked) {
      const newValues = uniqBy([...values, ...targetValues], (v) => v.value);

      console.log({ targetValues, newValues });
      onChange(newValues);
    } else {
      const targetIds = targetValues.map((v) => v.value);
      onChange(values.filter((v) => !targetIds.includes(v.value)));
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        size="small"
        placeholder={t({ id: "filters.select.search", message: "Search" })}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Stack spacing={1}>
        {itemTree.map((item) => {
          return <SelectItem key={item.id} node={item} onChangeItem={onChangeItem} />;
        })}
      </Stack>
    </Stack>
  );
}

const SelectItem = <T extends Option>({
  node,
  onChangeItem,
}: {
  node: Node<T & { checked: boolean }>;
  onChangeItem: (node: Node<T>, checked: boolean) => void;
}) => {
  if (node.children.length === 0) {
    return (
      <FormControlLabel
        checked={node.checked}
        onChange={() => onChangeItem(node, !node.checked)}
        onClick={(e) => {
          e.stopPropagation();
        }}
        control={<Checkbox />}
        label={node.value?.label}
        sx={{
          paddingLeft: "28px",
          paddingTop: "4px",
        }}
      />
    );
  }
  return (
    <Accordion>
      <AccordionSummary>
        <FormControlLabel
          checked={node.checked}
          onChange={() => onChangeItem(node, !node.checked)}
          onClick={(e) => {
            e.stopPropagation();
          }}
          control={<Checkbox />}
          label={node.value?.label || node.id}
        />
      </AccordionSummary>
      <AccordionDetails>
        <Stack>
          {node.children.map((child) => (
            <SelectItem node={child} key={child.id} onChangeItem={onChangeItem} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<IcControlChevronUp width={24} height={24} transform="rotate(90)" />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",

  [`&.${accordionSummaryClasses.root}`]: {
    padding: theme.spacing(1, 0),
    minHeight: 0,
    [`&.${accordionSummaryClasses.expanded}`]: {
      minHeight: 0,
    },
  },

  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
    [`&.${accordionSummaryClasses.expanded}`]: {
      marginLeft: theme.spacing(1),
    },
  },
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: "rotate(90deg)",
  },
}));

const AccordionDetails = styled((props: AccordionDetailsProps) => (
  <MuiAccordionDetails {...props} />
))(({ theme }) => ({
  [`&.${accordionDetailsClasses.root}`]: {
    padding: 0,
    paddingLeft: theme.spacing(4),
  },
}));
