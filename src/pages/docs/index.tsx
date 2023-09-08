import { MDXProvider } from "@mdx-js/react";
import {
  AudioSpecimen,
  Catalog,
  CodeSpecimen,
  ColorPaletteSpecimen,
  ColorSpecimen,
  ConfigPageOrGroup,
  DownloadSpecimen,
  HintSpecimen,
  HtmlSpecimen,
  ImageSpecimen,
  Markdown,
  Page,
  TableSpecimen,
  TypeSpecimen,
} from "catalog";
import { useEffect, useState } from "react";

const pages: ConfigPageOrGroup[] = [
  {
    path: "/",
    title: "Introduction",
    content: require("@/catalog/index.mdx"),
  },
  {
    path: "/design",
    title: "Design",
    content: require("@/catalog/design.mdx"),
  },
  {
    path: "/technology",
    title: "Technology",
    content: require("@/catalog/technology.mdx"),
  },
  {
    title: "Components",
    pages: [
      {
        path: "/components/content-container",
        title: "ContentContainer",
        content: require("@/catalog/components/content-container.tsx"),
      },
      {
        path: "/components/hero",
        title: "Hero",
        content: require("@/catalog/components/hero.tsx"),
      },
    ],
  },
];

const mkHeading = (level: number) => {
  return (props: $IntentionalAny) => {
    return (
      <Markdown.Heading level={level} text={[props.children]} slug="wat" />
    );
  };
};

const mdxComponents = {
  wrapper: ({ children }: $IntentionalAny) => <Page>{children}</Page>,
  h1: mkHeading(1),
  h2: mkHeading(2),
  h3: mkHeading(3),
  h4: mkHeading(4),
  h5: mkHeading(5),
  h6: mkHeading(6),
  p: Markdown.Paragraph,
  ul: Markdown.UnorderedList,
  ol: Markdown.OrderedList,
  li: Markdown.ListItem,
  blockquote: Markdown.BlockQuote,
  em: Markdown.Em,
  strong: Markdown.Strong,
  del: Markdown.Del,
  img: Markdown.Image,
  code: Markdown.CodeSpan,
  hr: Markdown.Hr,
  a: ({ href, ...props }: $IntentionalAny) => (
    <Markdown.Link to={href} {...props} />
  ),
  ImageSpecimen,
  AudioSpecimen,
  CodeSpecimen,
  ColorSpecimen,
  ColorPaletteSpecimen,
  HtmlSpecimen,
  HintSpecimen,
  TableSpecimen,
  TypeSpecimen,
  DownloadSpecimen,
};

export default function Docs() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <MDXProvider components={mdxComponents}>
      <Catalog
        title="Market Data Platform Prototype"
        pages={pages}
        theme={{
          brandColor: "#333",
          sidebarColorText: "#333",
          navBarTextColor: "#333",
          sidebarColorHeading: "#333",
          pageHeadingTextColor: "#fff",
          linkColor: "rgb(255,95,85)",
          sidebarColorTextActive: "rgb(255,95,85)",
          background: "#F5F5F5",
          pageHeadingBackground: "#156896",
        }}
      />
    </MDXProvider>
  ) : null;
}
