export const isNonBreakingMark = (mark: string) => mark === "non-breaking";
export const isLatexMark = (mark: string) => mark === "latex";

export const extractTextContent = (
  node:
    | JSX.Element
    | JSX.Element[]
    | string
    | (string | React.ReactElement<any, string | React.JSXElementConstructor<any>>)[]
): string => {
  if (Array.isArray(node)) {
    return node.map(extractTextContent).join("");
  }
  if (typeof node === "string") {
    return node;
  }
  if (typeof node === "object") {
    return extractTextContent(node?.props.children);
  }
  return "";
};
