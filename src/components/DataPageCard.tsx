import { Trans } from "@lingui/macro";
import { Typography, Card, Button } from "@mui/material";
import { s } from "@interactivethings/swiss-federal-ci";
import { Download } from "@/icons/icons-jsx/control";
import { makeStyles } from "@/components/style-utils";
import CardActionButton from "@/components/CardActionButton";
import Link from "next/link";

const useStyles = makeStyles()(({ palette: c, spacing: s, shadows: e, breakpoints: b }) => ({
  button: {
    backgroundColor: c.cobalt[500],
    fontWeight: 700,
    width: "fit-content",
    gridArea: "button",
  },

  card: {
    boxShadow: e.lg,
    borderRadius: s(2),
    alignItems: "center",
    gap: "1rem",
    display: "grid",
    gridTemplateColumns: "1fr max-content",
    gridTemplateRows: "max-content max-content",
    gridTemplateAreas: '"text icon" "button icon"',

    [b.down("md")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "min-content max-content max-content",
      gridTemplateAreas: '"icon" "text" "button"',
    },
  },

  text: {
    gridArea: "text",
  },
  icon: {
    gridArea: "icon",
    width: "fit-content",
  },
}));
export const DataPageCard: React.FC<{}> = () => {
  const { classes } = useStyles();

  return (
    <Card sx={{ p: s(8) }} className={classes.card}>
      <Typography variant="body1" className={classes.text}>
        <Trans id="homepage.section.data.content">
          Unter <i>Daten herunterladen</i> können verschiedene Daten ausgewählt und heruntergeladen
          werden, insbesondere Preisreihen, in einigen Fällen auch Mengen- und Flächendaten.
        </Trans>
      </Typography>
      <Button className={classes.button} component={Link} href="/data">
        <Trans id="homepage.section.data.button">Learn More</Trans>
      </Button>
      <CardActionButton component={Link} href="/data" className={classes.icon}>
        <Download width={32} height={32} />
      </CardActionButton>
    </Card>
  );
};
