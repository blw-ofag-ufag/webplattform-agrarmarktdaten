import * as React from "react";
import type { SVGProps } from "react";
const SvgIcCheckmark = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path
      fill="#1F2937"
      fillRule="nonzero"
      stroke="#1F2937"
      strokeWidth={0.25}
      d="M9.913 17.443 5 12.531 5.531 12l4.382 4.383L19.295 7l.531.531z"
    />
  </svg>
);
export default SvgIcCheckmark;
