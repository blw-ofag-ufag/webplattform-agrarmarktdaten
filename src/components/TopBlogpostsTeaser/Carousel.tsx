import * as React from "react";
import { Box, IconButton, BoxProps } from "@mui/material";
import { makeStyles } from "@/components/style-utils";
import { clamp } from "remeda";
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
    gap: "0.25rem",
    "--dot-size": "16px",
    [theme.breakpoints.down("md")]: {
      "--dot-size": "12px",
    },
  },
  dot: {
    width: "var(--dot-size)",
    height: "var(--dot-size)",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "transparent",
    border: "1px solid",
    borderColor: theme.palette.cobalt[400],
    transition: "0.3s ease background-color",
  },
  activeDot: {
    backgroundColor: theme.palette.cobalt[600],
  },
  chevronLeft: {
    transform: "rotate(90deg)",
  },
  chevronRight: {
    transform: "rotate(-90deg)",
  },
}));
export const Carousel = ({
  perPage,
  children,
  slidesClassName,
  ...props
}: { perPage: number; children: React.ReactNode[]; slidesClassName?: string } & BoxProps) => {
  const pageLimits = { min: 0, max: Math.ceil(children.length / perPage) - 1 };
  const childrenBuckets = React.useMemo(() => bucketBy(children, perPage), [children, perPage]);
  const { classes, cx } = useCarouselStyles();
  const [page, setPage] = React.useState(0);

  return (
    <Box className={classes.root} {...props}>
      <div className={cx(classes.slides, slidesClassName)}>{childrenBuckets[page]}</div>
      <div className={classes.controls}>
        <IconButton
          disabled={page === pageLimits.min}
          onClick={() => setPage((p) => clamp(p - 1, pageLimits))}
        >
          <IcControlChevronDown className={classes.chevronLeft} />
        </IconButton>
        <div className={classes.dots}>
          {Array.from({ length: pageLimits.max + 1 })
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
        <IconButton
          disabled={page === pageLimits.max}
          onClick={() => setPage((p) => clamp(p + 1, pageLimits))}
        >
          <IcControlChevronDown className={classes.chevronRight} />
        </IconButton>
      </div>
    </Box>
  );
};
