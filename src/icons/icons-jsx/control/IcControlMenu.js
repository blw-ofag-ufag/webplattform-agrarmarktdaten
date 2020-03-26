import * as React from "react";

function SvgIcControlMenu(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
        d="M1 12h22M1 19h22M1 5h22"
      />
    </svg>
  );
}

export default SvgIcControlMenu;
