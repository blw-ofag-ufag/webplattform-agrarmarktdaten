import { StructuredText } from "@/components/StructuredText";
import * as GQL from "@/graphql";
import { makeStyles } from "@/components/style-utils";
import { Typography } from "@mui/material";
import flexibleStringReplace from "@rpearce/flexible-string-replace";
import Anchor from "./Anchor";

const GlossaryItem = (props: GQL.GlossaryItemFragment & { highlight?: string }) => {
  const { id, title, description, freeStyleLabel } = props;
  const { classes } = useStyles();

  const regex = new RegExp(`${props.highlight}`, "gi");

  const replaceWith = (match: string, key: number) => (
    <span key={key} className={classes.highlightMatch}>
      {match}
    </span>
  );

  const matchedTitle = title ? flexibleStringReplace(regex, replaceWith, title) : "";

  return (
    <div className={classes.root}>
      <Typography variant="body3">{props?.label?.title ?? freeStyleLabel}</Typography>
      <div className={classes.content}>
        <Anchor id={id}>
          <Typography variant="h4">{matchedTitle}</Typography>
        </Anchor>
        {description && (
          <StructuredText
            data={description}
            sx={{ "&&": { pb: 0 } }}
            highlightMatch={{ regex, replaceWith }}
          />
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles()(({ palette, spacing: s }) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: s(3),
  },
  highlightMatch: {
    backgroundColor: palette.functional.info.text,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: s(2),
  },
}));

export default GlossaryItem;
