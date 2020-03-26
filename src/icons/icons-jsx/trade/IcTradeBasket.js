import * as React from "react";

function SvgIcTradeBasket(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 64 64" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
        d="M13 21L23 3m27 18L40 3m17 30v22.615C57 58.493 54.668 61 52 61H12c-2.668 0-5-2.507-5-5.385V33M1 21h62v9H1v-9zm31 18v14m12-14v14M20 39v14"
      />
    </svg>
  );
}

export default SvgIcTradeBasket;
