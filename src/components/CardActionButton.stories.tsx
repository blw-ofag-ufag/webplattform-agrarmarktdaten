import CardActionButtonComponent from "@/components/CardActionButton";
import { Download } from "@/icons/icons-jsx/control";
import { Box, Card, Typography } from "@mui/material";

export const CardActionButton = () => {
  return (
    <div>
      <CardActionButtonComponent>
        <Download width={32} height={32} />
      </CardActionButtonComponent>
    </div>
  );
};

export const CardActionButtonInsideCard = () => {
  return (
    <Card elevation={6} sx={{ p: 5, display: "flex", alignItems: "center " }}>
      <Box flexGrow={1}>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, mollit sint commodo quis proident laboris fugiat eiusmod
          labore eu amet ex id nostrud anim id. Irure reprehenderit eiusmod minim ut consectetur
          irure officia excepteur occaecat aute anim et sint non anim aliquip non laboris.
        </Typography>
      </Box>
      <CardActionButtonComponent>
        <Download width={32} height={32} />
      </CardActionButtonComponent>
    </Card>
  );
};

export default {
  component: CardActionButton,
  title: "App components / CardActionButton",
};
