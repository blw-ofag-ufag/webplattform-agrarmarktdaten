import * as React from "react";
import { Button, Popover, Box, Typography, IconButton } from "@mui/material";
import ShareIcon from "@/icons/icons-jsx/control/IcShare";
import XIcon from "@/icons/icons-jsx/social/IcSocialLogoX";
import FacebookIcon from "@/icons/icons-jsx/social/IcSocialLogoFacebook2";
import LinkedinIcon from "@/icons/icons-jsx/social/IcSocialLogoLinkedin";
import DuplicateIcon from "@/icons/icons-jsx/control/IcDuplicate";
import CheckIcon from "@/icons/icons-jsx/control/IcCheckmark";
import { makeStyles } from "@/components/style-utils";
import { copyToClipboard } from "@/lib/clipboard";
import NextLink from "next/link";
import { SafeHydrate } from "@/components/SafeHydrate";
import { Trans } from "@lingui/macro";

const useStyles = makeStyles<{ isUrlUnlocked: boolean }>()(
  ({ palette: c, spacing, breakpoints: b }, { isUrlUnlocked }) => ({
    shareButton: {
      position: "absolute",
      width: "44px",
      height: "44px",
      minWidth: "44px",
      padding: "8px",
      top: 16,
      right: 0,
      [b.only("xl")]: { right: 64 },
      [b.only("lg")]: { right: 49 },
      [b.only("md")]: { right: 36 },
      [b.only("sm")]: { right: 35 },
      [b.down("sm")]: { right: 28 },
    },
    shareIcon: {
      width: "32px!important",
      height: "32px",
      margin: "0!important",
    },
    socialButton: {
      borderRadius: "4px",
    },
    title: {
      fontWeight: "bold",
      marginRight: "auto",
      verticalAlign: "bottom",
      display: "flex",
      alignItems: "end",
      paddingBottom: "10px",
    },
    url: {
      borderTopRightRadius: "0",
      borderBottomRightRadius: "0",
      borderBottomLeftRadius: "4px",
      borderTopLeftRadius: "4px",
      border: `1px solid ${c.cobalt[500]}`,
      display: "block",
      height: "42px",
      color: c.monochrome[400],
      alignItems: "center",
      paddingLeft: spacing(2),
      textOverflow: isUrlUnlocked ? "initial" : "ellipsis",
      overflowX: isUrlUnlocked ? "scroll" : "hidden",
      whiteSpace: "nowrap",
      maxWidth: "254px",
      width: "100%",
      lineHeight: "39px!important",
      "&:focus-visible": {
        outline: "none",
      },
    },
    copyIcon: {
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
      borderBottomLeftRadius: "0",
      borderTopLeftRadius: "0",
      border: `1px solid ${c.cobalt[500]}`,
      borderLeft: "none",
    },
  })
);

const ShareButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [isCopied, setIsCopied] = React.useState(false);
  const [isUrlUnlocked, setIsUrlUnlocked] = React.useState(false);
  const { classes } = useStyles({ isUrlUnlocked });
  const [url, setUrl] = React.useState("");

  const handleCopy = async () => {
    await copyToClipboard(window.location.href);
    setIsCopied(true);
  };

  React.useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <SafeHydrate>
      <Button
        className={classes.shareButton}
        ref={anchorRef}
        aria-describedby="share"
        variant="ghost"
        onClick={() => setIsOpen((x) => !x)}
      >
        <ShareIcon width={32} height={32} className={classes.shareIcon} />
      </Button>
      <Popover
        id="share"
        anchorEl={anchorRef.current}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box p={3} paddingTop={1} display="flex" flexDirection="column" gap="8px">
          <Box display="flex" justifyContent="end">
            <Typography variant="body3" className={classes.title}>
              <Trans id="social.share">Teilen</Trans>
            </Typography>
            <NextLink href={`https://twitter.com/intent/tweet?url=${url}`} target="_blank">
              <IconButton className={classes.socialButton}>
                <XIcon width={32} height={32} />
              </IconButton>
            </NextLink>
            <NextLink href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank">
              <IconButton className={classes.socialButton}>
                <FacebookIcon width={32} height={32} />
              </IconButton>
            </NextLink>
            <NextLink
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
              target="_blank"
            >
              <IconButton className={classes.socialButton}>
                <LinkedinIcon width={32} height={32} />
              </IconButton>
            </NextLink>
          </Box>
          <Box display="flex" width={290}>
            <Box onClick={() => setIsUrlUnlocked(true)} width="100%">
              <input className={classes.url} value={url} />
            </Box>
            <IconButton className={classes.copyIcon} onClick={handleCopy}>
              {isCopied ? (
                <CheckIcon width={24} height={24} />
              ) : (
                <DuplicateIcon width={24} height={24} />
              )}
            </IconButton>
          </Box>
        </Box>
      </Popover>
    </SafeHydrate>
  );
};

export default ShareButton;
