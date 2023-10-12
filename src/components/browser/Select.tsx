import { IcControlChevronUp, IcControlClose, IcSearch } from "@/icons/icons-jsx/control";
import { t } from "@lingui/macro";
import {
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummaryProps,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Stack,
  TextField,
  accordionDetailsClasses,
  accordionSummaryClasses,
  inputClasses,
  styled,
  textFieldClasses,
} from "@mui/material";
import { uniqBy } from "lodash";
import { QuickScore, ScoredObject, ScoredResult } from "quick-score";
import React, { useDeferredValue, useMemo, useState } from "react";

export type Option = {
  label: string;
  value: string;
  checked?: boolean;
} & { [key: string]: string };

type Node<T extends Option> = {
  id: string;
  level: number;
  children: Node<T>[];
  value?: T & { score?: ScoredResult<T> };
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
      const checked = children.every((c) => c.checked);
      result.push({
        id: key,
        level,
        checked,
        indeterminate: !checked && children.some((c) => c.checked),
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

const search = <T extends Option>(items: T[], searchString: string) => {
  const qs = new QuickScore(items, ["label"]);
  const results = qs.search(searchString);
  return results.filter((r) => r.score > 0.25).map((r) => ({ ...(r.item as T), score: r }));
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
  const [searchString, setSearchString] = useState("");
  const deferredSearch = useDeferredValue(searchString);

  const filteredOptions = useMemo(() => {
    if (searchString === "") {
      return options;
    }
    return search(options, deferredSearch);
  }, [options, searchString, deferredSearch]);

  const itemTree = useMemo(() => {
    const optionsWithChecked = filteredOptions.map((option) => ({
      ...option,
      checked: values.some((v) => v.value === option.value),
    }));

    return stratify(optionsWithChecked, groups || []);
  }, [filteredOptions, values, groups]);

  const onChangeItem = (node: Node<T>, checked: boolean) => {
    const targetValues = getValues(node);

    if (checked) {
      const newValues = uniqBy([...values, ...targetValues], (v) => v.value);
      onChange(newValues);
    } else {
      const targetIds = targetValues.map((v) => v.value);
      onChange(values.filter((v) => !targetIds.includes(v.value)));
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        value={searchString}
        size="small"
        placeholder={t({ id: "filters.select.search", message: "Search" })}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setSearchString(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IcSearch width={24} height={24} />
            </InputAdornment>
          ),
          endAdornment: searchString && (
            <InputAdornment position="end">
              <IconButton aria-label={t({ id: "filters.aria.clear", message: "Clear" })}>
                <IcControlClose width={12} height={12} onClick={() => setSearchString("")} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Stack spacing={1}>
        {itemTree.map((item) => {
          return (
            <SelectItem
              key={item.id}
              node={item}
              onChangeItem={onChangeItem}
              search={deferredSearch}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}

const MatchedString = <T extends Option>({
  string,
  matches,
}: {
  string: string;
  matches: ScoredObject<T>["matches"][string];
}) => {
  const substrings = [];
  let previousEnd = 0;

  for (let [start, end] of matches) {
    const prefix = string.substring(previousEnd, start);
    const match = <span style={{ fontWeight: "bold" }}>{string.substring(start, end)}</span>;

    substrings.push(prefix, match);
    previousEnd = end;
  }

  substrings.push(string.substring(previousEnd));

  return <span>{React.Children.toArray(substrings)}</span>;
};

const SelectItem = <T extends Option>({
  node,
  onChangeItem,
  search,
}: {
  node: Node<T & { checked: boolean }>;
  onChangeItem: (node: Node<T>, checked: boolean) => void;
  search?: string;
}) => {
  const isSearch = useMemo(() => search !== "", [search]);

  if (node.children.length === 0) {
    return (
      <FormControlLabel
        checked={node.checked}
        onChange={() => onChangeItem(node, !node.checked)}
        onClick={(e) => {
          e.stopPropagation();
        }}
        control={<Checkbox size="small" />}
        label={
          isSearch && node.value?.score?.matches ? (
            <MatchedString string={node.value?.label} matches={node.value?.score?.matches.label} />
          ) : (
            node.value?.label
          )
        }
        sx={{
          paddingLeft: "28px",
          paddingTop: "4px",
        }}
      />
    );
  }

  return (
    <Accordion defaultExpanded={node.level === 0}>
      <AccordionSummary>
        <FormControlLabel
          checked={node.checked}
          onChange={() => onChangeItem(node, !node.checked)}
          onClick={(e) => {
            e.stopPropagation();
          }}
          control={<Checkbox indeterminate={node.indeterminate} size="small" />}
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
