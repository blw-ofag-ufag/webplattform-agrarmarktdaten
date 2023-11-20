import { IcControlDownload } from "@/icons/icons-jsx/control";
import { Trans } from "@lingui/macro";
import { Button, Divider, Fade, Icon, ListItem, Menu, MenuItem, Typography } from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { useRef } from "react";

const FILE_FORMATS = ["csv", "xlsx", "json"] as const;
export type FileFormat = (typeof FILE_FORMATS)[number];

export default function DataDownload() {
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <PopupState variant="popover" popupId="data-download-popup">
      {(popupState) => (
        <>
          <Button
            ref={anchorRef}
            size="small"
            startIcon={<IcControlDownload />}
            {...bindTrigger(popupState)}
          >
            <Trans id="data.actions.download">Data download</Trans>
          </Button>
          <Menu
            TransitionComponent={Fade}
            {...bindMenu(popupState)}
            MenuListProps={{
              sx: {
                width: anchorRef.current?.offsetWidth,
                border: "1px solid",
                borderColor: "grey.300",
              },
            }}
          >
            <ListItem
              sx={{
                backgroundColor: "cobalt.50",
                py: 3,
              }}
            >
              <Typography variant="h5">
                <Trans id="data.download.title">Download dataset</Trans>
              </Typography>
            </ListItem>
            {FILE_FORMATS.map((format, i) => (
              <>
                <MenuItem
                  key={format}
                  disableRipple
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: i === FILE_FORMATS.length - 1 ? "none" : "1px solid",
                    borderColor: "grey.300",
                  }}
                >
                  <Typography variant="body1">{format.toUpperCase()}</Typography>
                  <IcControlDownload width={20} height={20} />
                </MenuItem>
              </>
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  );
}
