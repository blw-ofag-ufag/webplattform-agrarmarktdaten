import * as React from "react";
import { SelectChangeEvent, Modal, Button, Fade, Box, IconButton, Typography } from "@mui/material";
import IcFilterIcon from "@/icons/icons-jsx/control/IcFilter";
import IcControlClose from "@/icons/icons-jsx/control/IcControlClose";
import { makeStyles } from "@/components/style-utils";
import { Filter } from "./Filters";
import { Trans } from "@lingui/macro";
import * as GQL from "@/graphql";

const TRANSITION_DURATION = 200;

const useStyles = makeStyles()((theme) => ({
  filterButton: { display: "flex", justifyContent: "center" },
  menu: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBlock: theme.spacing(2),
    paddingRight: "20px",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  header: {
    paddingBlock: theme.spacing(4),
    paddingInline: "20px",
  },
  wrapper: { width: "100%", height: "100%", backgroundColor: "#ffffff" },
  modal: {
    zIndex: 20,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#ffffff",
    position: "sticky",
    top: 0,
    left: 0,
  },
  content: {
    paddingTop: theme.spacing(4),
    paddingInline: "20px",
  },
  buttonWrapper: {
    padding: "20px",
    marginTop: "48px",
  },
  applyButton: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    backgroundColor: theme.palette.cobalt[500],
    fontWeight: "bold",
  },
}));

interface Props {
  markets: GQL.SimpleMarketArticleFragment[];
  selectedMarket: string;
  onSelectMarket: (e: SelectChangeEvent) => void;
  focusArticles: GQL.SimpleFocusArticleFragment[];
  selectedFocusArticle: string;
  onSelectFocusArticle: (e: SelectChangeEvent) => void;
}

const MobileFilters = (props: Props) => {
  const {
    markets,
    selectedMarket,
    onSelectMarket,
    focusArticles,
    selectedFocusArticle,
    onSelectFocusArticle,
  } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const { classes } = useStyles();

  return (
    <>
      <Button className={classes.filterButton} onClick={handleOpen}>
        <IcFilterIcon width={25} height={25} />
      </Button>
      <Modal open={isOpen} onClose={handleClose} closeAfterTransition className={classes.modal}>
        <Fade in={isOpen} timeout={TRANSITION_DURATION}>
          <Box className={classes.wrapper}>
            <div className={classes.menu}>
              <IconButton onClick={handleClose}>
                <IcControlClose />
              </IconButton>
            </div>
            <div className={classes.header}>
              <Typography variant="h4">
                <Trans id="filter.filters">Filters</Trans>
              </Typography>
            </div>
            <div className={classes.content}>
              <Filter
                label={<Trans id="filter.market">Market</Trans>}
                options={markets}
                selectedOption={selectedMarket}
                onSelectOption={onSelectMarket}
              />
            </div>
            <div className={classes.content}>
              <Filter
                options={focusArticles}
                selectedOption={selectedFocusArticle}
                onSelectOption={onSelectFocusArticle}
                label={<Trans id="filter.focus">Focus</Trans>}
              />
            </div>
            <div className={classes.buttonWrapper}>
              <Button className={classes.applyButton} onClick={handleClose}>
                <Trans id="filter.apply">Apply</Trans>
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default MobileFilters;
