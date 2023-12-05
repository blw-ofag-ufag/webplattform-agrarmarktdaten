import * as React from "react";
import { Box, IconButton, BoxProps } from "@mui/material";
import { makeStyles } from "@/components/style-utils";
import { IcControlChevronDown } from "@/icons/icons-jsx/control";

const bucketBy = <T,>(arr: T[], size: number) => {
  const buckets = [];
  for (let i = 0; i < arr.length; i = i + size) {
    buckets.push(arr.slice(i, i + size));
  }
  return buckets;
};

const useCarouselStyles = makeStyles()((theme) => ({
  root: {
    width: "100%",
    "& .MuiIconButton-root.Mui-disabled": {
      opacity: 0.25,
    },
  },
  slides: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "1.5rem",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    width: "100%",
  },
  dots: {
    display: "flex",
    gap: "6px",
    "--dot-size": "10px",
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: "2px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&::before": {
      content: '" "',
      display: "block",
      width: "var(--dot-size)",
      height: "var(--dot-size)",
      borderRadius: 15,
      backgroundColor: "transparent",
      border: "1px solid",
      borderColor: theme.palette.cobalt[600],
      transition: "0.3s ease background-color",
    },
  },
  activeDot: {
    backgroundColor: theme.palette.active,
    "&::before": {
      backgroundColor: theme.palette.cobalt[600],
    },
  },
  chevronLeft: {
    transform: "rotate(90deg)",
  },
  chevronRight: {
    transform: "rotate(-90deg)",
  },
}));

const useCircle = (max: number, defaultValue?: number) => {
  const [page, setPage] = React.useState(defaultValue ?? 0);
  return {
    value: page,
    set: setPage,
    prev: () => setPage((p) => (p + max) % (max + 1)),
    next: () => setPage((p) => (p + 1) % (max + 1)),
  };
};

export const Carousel = ({
  perPage,
  children,
  slidesClassName,
  ...props
}: { perPage: number; children: React.ReactNode[]; slidesClassName?: string } & BoxProps) => {
  const childrenBuckets = React.useMemo(() => bucketBy(children, perPage), [children, perPage]);
  const { classes, cx } = useCarouselStyles();

  const maxPage = Math.ceil(children.length / perPage) - 1;
  const { value: page, set: setPage, next: nextPage, prev: prevPage } = useCircle(maxPage);

  return (
    <Box className={classes.root} {...props}>
      <div className={cx(classes.slides, slidesClassName)}>{childrenBuckets[page]}</div>
      <div className={classes.controls}>
        <IconButton onClick={() => prevPage()}>
          <IcControlChevronDown className={classes.chevronLeft} />
        </IconButton>
        <div className={classes.dots}>
          {Array.from({ length: maxPage + 1 })
            .fill(null)
            .map((_, i) => {
              return (
                <div
                  onClick={() => setPage(i)}
                  key={i}
                  className={cx(classes.dot, i === page ? classes.activeDot : null)}
                />
              );
            })}
        </div>
        <IconButton onClick={() => nextPage()}>
          <IcControlChevronDown className={classes.chevronRight} />
        </IconButton>
      </div>
    </Box>
  );
};
