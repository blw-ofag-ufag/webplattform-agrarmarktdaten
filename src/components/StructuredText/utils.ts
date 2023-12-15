import { StructuredTextGraphQlResponse } from "react-datocms";
import {
  Span,
  Paragraph,
  Heading,
  Block,
  List,
  Blockquote,
  Code,
  ThematicBreak,
  InlineNode,
  ListItem,
  Root,
} from "datocms-structured-text-utils";
import { replaceNumberSeparators } from "@/domain/string";

type Node =
  | Paragraph
  | Heading
  | Block
  | List
  | Blockquote
  | Code
  | ThematicBreak
  | InlineNode
  | ListItem;

/**
 * Ensure numbers over 999 that use a space as a thousand separator do not break to the next line
 */
export const sanitizeBigNumbers = (
  data: StructuredTextGraphQlResponse["value"]
): StructuredTextGraphQlResponse["value"] => {
  if (data?.document) {
    const children = data?.document.children.map(traverse) as Root["children"];
    return { ...data, document: { ...data?.document, children } };
  }
  return data;
};

const spanVisitor = (node: Node) => {
  const { type, ...rest } = node;
  if (node?.type === "span") {
    return {
      ...rest,
      type,
      value: replaceNumberSeparators(node.value),
    } as Span;
  }
  return node;
};

/**
 * Traverse the DAST tree, find the spans and sanitize them
 */
const traverse = (node: Node): Node => {
  const visitedNode = spanVisitor(node);
  const { type, ...rest } = visitedNode;
  return {
    type,
    ...rest,
    ...("children" in visitedNode && { children: visitedNode.children.map(traverse) }),
  } as $FixMe; // Types in this instance make this whole ordeal a headache.
};
