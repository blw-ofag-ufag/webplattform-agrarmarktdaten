import * as React from "react";
import { Pagination as MUIPagination, PaginationItem } from "@mui/material";
import { IcControlChevronDown } from "@/icons/icons-jsx/control";

interface Props {
  total: number;
  current: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PreviousIcon = () => {
  return (
    <IcControlChevronDown style={{ transform: "rotate(90deg)", width: "30px", height: "30px" }} />
  );
};

const NextIcon = () => {
  return (
    <IcControlChevronDown style={{ transform: "rotate(-90deg)", width: "30px", height: "30px" }} />
  );
};

const Pagination = (props: Props) => {
  return (
    <MUIPagination
      count={props.total}
      page={props.current}
      onChange={props.onChange}
      renderItem={(item) => (
        <PaginationItem
          sx={{ displat: "flex", alignItems: "center", justifyContent: "center" }}
          slots={{ previous: PreviousIcon, next: NextIcon }}
          {...item}
        />
      )}
    />
  );
};

export default Pagination;
