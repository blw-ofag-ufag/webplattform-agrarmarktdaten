import { GridContainer } from "@/components/Grid";
import StructuredTextComponent from "@/components/StructuredText/StructuredText";
import { sampleStructuredText } from "@/components/StructuredText/sample";
import { useLayoutStyles } from "@/components/useLayoutStyles";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";

type StructuredTextData = React.ComponentProps<typeof StructuredTextComponent>["data"];

export const StructuredText = () => {
  const [debug, setDebug] = useState(false);
  const { classes } = useLayoutStyles();
  return (
    <>
      <Box p="2rem" bgcolor="cobalt.50" mb="2rem">
        <FormControlLabel
          label={"Debug"}
          control={<Checkbox value={debug} onChange={(ev, checked) => setDebug(checked)} />}
        />
      </Box>
      <GridContainer>
        <div className={classes.content}>
          <StructuredTextComponent
            debug={debug}
            data={sampleStructuredText as StructuredTextData}
          />
        </div>
      </GridContainer>
    </>
  );
};
export default {
  component: StructuredTextComponent,
  title: "Design System / Content",
};
