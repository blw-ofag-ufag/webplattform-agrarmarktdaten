import { IcControlChevronUp, IcControlClose, IcSearch } from "@/icons/icons-jsx/control";
import { Trans, t } from "@lingui/macro";
import { CheckBox, CheckBoxOutlineBlank, Circle, IndeterminateCheckBox } from "@mui/icons-material";
import {
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummaryProps,
  Box,
  Button,
  Checkbox as MuiCheckbox,
  CheckboxProps,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Stack,
  TextField,
  Typography,
  accordionDetailsClasses,
  accordionSummaryClasses,
  styled,
} from "@mui/material";
import { uniqBy } from "lodash";
import { QuickScore, ScoredObject, ScoredResult } from "quick-score";
import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import PreviewFilter from "./PreviewFilter";
import { Option } from "@/domain/data";

type Node<T extends Option> = {
  id: string;
  level: number;
  children: Node<T>[];
  value?: T & { score?: ScoredResult<T> };
  checked?: boolean;
  total?: number;
  indeterminate?: boolean;
};

type ScoredOption = Option & { score?: ScoredResult<Option> };

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
      const allValues = children.flatMap((c) => getValues(c));
      const checked = children.every((c) => c.checked);
      result.push({
        id: key,
        level,
        checked,
        total: allValues.length,
        indeterminate: !checked && allValues.some((c) => c.checked),
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
  const qs = new QuickScore(items, {
    keys: ["label"],
    // minimumScore: -1,
  });
  const results = qs.search(searchString);
  return results.map((r) => ({ ...(r.item as T), score: r }));
};

const propagateValueInTree = <T extends Option>(
  source: Node<T>[],
  target: Node<T & { checked: boolean }>[],
  field: keyof Node<T>
): Node<T & { checked: boolean }>[] => {
  return target.map((node) => {
    const match = source.find((n) => n.id === node.id);
    if (match) {
      return {
        ...node,
        [field]: match[field],
        children: propagateValueInTree(match.children, node.children, field),
      };
    }
    return node;
  });
};

export type SelectProps<T extends Option> = {
  options: T[];
  values: T[];
  groups?: Array<(item: T) => string>;
  onChange: (newValues: T[]) => void;
  colorCheckbox?: (item: T) => string;
  withSearch?: boolean;
};

export default function Select<T extends Option>({
  options = [],
  values = [],
  groups,
  onChange,
  colorCheckbox,
  withSearch = false,
}: SelectProps<T>) {
  const [searchString, setSearchString] = useState("");
  const deferredSearch = useDeferredValue(searchString);

  const searchOptions = useMemo(() => {
    if (searchString === "") {
      return options;
    }
    return search(options, deferredSearch);
  }, [options, searchString, deferredSearch]);

  const allItemsTree = useMemo(() => stratify(options, groups || []), [options, groups]);

  const itemTree = useMemo(() => {
    const optionsWithChecked = searchOptions.map((option) => ({
      ...option,
      checked: values.some((v) => v.value === option.value),
    }));
    const tree = stratify(optionsWithChecked, groups || []);

    return propagateValueInTree(allItemsTree, tree, "total");
  }, [searchOptions, values, groups, allItemsTree]);

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
      {withSearch && (
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
      )}
      <Stack
        direction="row"
        spacing={0.5}
        divider={
          <Circle
            sx={{
              color: "grey.600",
              width: 2,
              height: 2,
            }}
          />
        }
        alignItems="center"
      >
        <Button variant="text" disabled={searchString !== ""} onClick={() => onChange(options)}>
          <Typography variant="body2">
            <Trans id="filters.select.all">Select all</Trans>
          </Typography>
        </Button>
        <Button variant="text" onClick={() => onChange([])}>
          <Typography variant="body2">
            <Trans id="filters.select.clear">Clear</Trans>
          </Typography>
        </Button>
      </Stack>
      <Stack spacing={1}>
        {itemTree.map((item) => {
          return (
            <SelectItem
              key={item.id}
              node={item}
              onChangeItem={onChangeItem}
              isSearch={deferredSearch !== ""}
              colorCheckbox={colorCheckbox}
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

const SelectItem = <T extends ScoredOption>({
  node,
  onChangeItem,
  isSearch = false,
  colorCheckbox = () => "primary",
}: {
  node: Node<T & { checked: boolean }>;
  onChangeItem: (node: Node<T>, checked: boolean) => void;
  isSearch: boolean;
  colorCheckbox?: (item: T) => string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasResults = useMemo(
    () => isSearch && getValues(node).some((v) => v.score && v.score.score > 0),
    [isSearch, node]
  );

  useEffect(() => {
    setExpanded(node.level === 0 || hasResults);
  }, [node.level, hasResults]);

  if (node.children.length === 0) {
    return (
      <FormControlLabel
        checked={node.checked}
        onChange={() => onChangeItem(node, !node.checked)}
        onClick={(e) => {
          e.stopPropagation();
        }}
        control={<SelectCheckbox color={node.value && colorCheckbox(node.value)} />}
        label={
          <Typography variant="body2">
            {isSearch && node.value?.score?.matches ? (
              <MatchedString
                string={node.value?.label}
                matches={node.value?.score?.matches.label}
              />
            ) : (
              node.value?.label
            )}
          </Typography>
        }
        sx={{
          paddingLeft: node.level === 0 ? 0 : "28px",
          paddingTop: "4px",
        }}
      />
    );
  }

  const values = getValues(node);

  return (
    <Accordion
      expanded={expanded}
      onClick={(e) => {
        e.stopPropagation();
        setExpanded(!expanded);
      }}
    >
      <AccordionSummary>
        <FormControlLabel
          checked={node.checked}
          onChange={() => !isSearch && onChangeItem(node, !node.checked)}
          onClick={(e) => {
            e.stopPropagation();
          }}
          control={
            !isSearch ? (
              <SelectCheckbox
                checked={node.checked}
                indeterminate={node.indeterminate}
                color={colorCheckbox(values[0])}
              />
            ) : (
              <Box width={12} />
            )
          }
          label={
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body2">{node.value?.label || node.id}</Typography>
              {isSearch && (
                <Typography variant="body2" color="grey.600">
                  {t({ id: "filters.select.total", message: `(${node.total} total)` })}
                </Typography>
              )}
            </Stack>
          }
        />
      </AccordionSummary>
      <AccordionDetails>
        <Stack>
          {node.children.map((child) => (
            <SelectItem
              node={child}
              key={child.id}
              onChangeItem={onChangeItem}
              isSearch={isSearch}
              colorCheckbox={colorCheckbox}
            />
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

const SelectCheckbox = ({ color, ...props }: Omit<CheckboxProps, "color"> & { color?: string }) => {
  return (
    <MuiCheckbox
      size="small"
      icon={
        <CheckBoxOutlineBlank
          style={{
            color,
          }}
        />
      }
      checkedIcon={
        <CheckBox
          style={{
            color,
          }}
        />
      }
      indeterminateIcon={
        <IndeterminateCheckBox
          style={{
            color,
          }}
        />
      }
      {...props}
    />
  );
};

export const PreviewSelect = <T extends Option>({
  options,
  values,
  show,
}: {
  options: T[];
  values: T[];
  show: boolean;
}) => {
  return (
    <PreviewFilter show={show}>
      {values.length === 0
        ? t({ id: "data.filters.none", message: "None" })
        : values.length === options.length
        ? t({ id: "data.filters.all", message: "All" })
        : t({
            id: "data.filters.some",
            message: `${values.length} of ${options.length}`,
          })}
    </PreviewFilter>
  );
};
