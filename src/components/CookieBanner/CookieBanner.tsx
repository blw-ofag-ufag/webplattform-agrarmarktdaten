import { Box, Button, Fade } from "@mui/material";
import * as React from "react";
import { makeStyles } from "@/components/style-utils";
import * as GQL from "@/graphql/generated";
import { StructuredText } from "@/components/StructuredText";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/graphql";
import { GridContainer } from "@/components/Grid";
import IcCheckmarkIcon from "@/icons/icons-jsx/control/IcCheckmark";
import IcCloseIcon from "@/icons/icons-jsx/control/IcControlClose";
import { useRouter } from "next/router";

const useStyles = makeStyles()(({ spacing: s, breakpoints: b }) => ({
  wrapper: {
    position: "sticky",
    bottom: 0,
    width: "100%",
    paddingBlock: "40px",
    zIndex: 10,
    backgroundColor: "rgb(239, 246, 255)",
  },
  innerWrapper: {
    display: "flex",
    [b.down("lg")]: {
      flexDirection: "column",
      gap: s(4),
    },
  },

  buttonsContainer: {
    display: "flex",
    gap: s(4),
  },
  acceptButton: {
    height: "fit-content",
    whiteSpace: "nowrap",
  },
  rejectButton: {
    height: "fit-content",
    whiteSpace: "nowrap",
  },
}));

const LOCAL_STORAGE_KEY = "cookie-banner";

const CookieBanner = () => {
  const { classes } = useStyles();
  const [showBanner, setShowBanner] = React.useState(false);

  const { locale } = useRouter();

  const handleAccept = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, "accepted");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, "rejected");
    setShowBanner(false);
    //TODO: what else do we need to do here? how do we disable mamoto?
  };

  React.useEffect(() => {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedValue !== "accepted" && storedValue !== "rejected") {
      setShowBanner(true);
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["cookieBanner"],
    queryFn: async () => {
      const result = await client
        .query<GQL.CookieBannerQuery>(GQL.CookieBannerDocument, { locale })
        .toPromise();
      if (!result.data) {
        console.error(result.error?.toString());
        throw new Error("Failed to fetch API");
      }
      return result.data;
    },
    enabled: showBanner,
  });

  return (
    <Fade in={showBanner}>
      <Box className={classes.wrapper}>
        <GridContainer>
          <Box className={classes.innerWrapper}>
            {data?.cookieBanner?.content && (
              <StructuredText
                data={data?.cookieBanner.content}
                sx={{ paddingBottom: "0!important", display: "inline-block", marginRight: "20px" }}
              />
            )}
            <Box className={classes.buttonsContainer}>
              <Button variant="outlined" className={classes.acceptButton} onClick={handleAccept}>
                {data?.cookieBanner?.accept}
                <IcCheckmarkIcon width={24} height={24} />
              </Button>
              <Button variant="ghost" className={classes.rejectButton} onClick={handleReject}>
                {data?.cookieBanner?.reject}
                <IcCloseIcon width={16} height={16} />
              </Button>
            </Box>
          </Box>
        </GridContainer>
      </Box>
    </Fade>
  );
};

export default CookieBanner;
