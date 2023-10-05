import { default as MUIGrid } from "@mui/material/Unstable_Grid2";
import { SxProps } from "@mui/material";

interface Props {
  children: React.ReactNode;
  sx?: SxProps;
}

const Grid = ({ children, sx, ...rest }: Props) => {
  return (
    <MUIGrid
      container
      columnSpacing={{
        xxs: "16px",
        xs: "20px",
        sm: "28px",
        md: "36px",
        lg: "40px",
        xl: "48px",
        xxl: "64px",
        xxxl: "64px",
      }}
      sx={{ maxWidth: "1920px", margin: "0 auto", width: "100%", ...sx }}
      columns={{ xxxl: 12, xxl: 12, xl: 12, lg: 6, md: 6, sm: 4, xs: 4, xxs: 4 }}
      {...rest}
    >
      {children}
    </MUIGrid>
  );
};

export default Grid;
