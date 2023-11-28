import { Button, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";

const colors = ["primary", "secondary", "success", "error", "warning", "info"] as const;
const variants = ["contained", "aside", "text", "outlined", "inline", "inverted", "ghost"] as const;

export const Buttons = () => {
  const [toggleValue, setToggleValue] = useState("left");
  return (
    <Stack spacing={5}>
      {variants.map((variant) => (
        <Stack key={variant} spacing={2}>
          <Typography variant="h3" gutterBottom>
            {variant}
          </Typography>
          <Stack direction="row" spacing={2}>
            {colors.map((color) => (
              <Button key={color} variant={variant} color={color}>
                {color || "default"}
              </Button>
            ))}
          </Stack>
        </Stack>
      ))}
      <Stack spacing={2}>
        <Typography variant="h3" gutterBottom>
          Toggle Group
        </Typography>
        <ToggleButtonGroup
          size="small"
          fullWidth
          value={toggleValue}
          exclusive
          onChange={(_, value) => setToggleValue(value)}
        >
          <ToggleButton value="left">Left</ToggleButton>
          <ToggleButton value="right">Right</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};
export default {
  component: Button,
  title: " Design system / Components / Buttons",
};
