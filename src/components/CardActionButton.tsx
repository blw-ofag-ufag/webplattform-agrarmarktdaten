import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardActionButton = styled(IconButton)(({ theme: { palette: c } }) => ({
  backgroundColor: c.cobalt[100],
  "&:hover": {
    backgroundColor: c.cobalt[200],
  },
  minWidth: "80px",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
})) as typeof IconButton; // Need to cast as seen here https://mui.com/material-ui/guides/typescript/#complications-with-the-component-prop

export default CardActionButton;
