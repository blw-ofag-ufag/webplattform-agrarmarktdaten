import { TopBlogpostsTeaser } from "./TopBlogpostsTeaser";
import * as GQL from "@/graphql";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "App Components / TopBlogpostsTeaser",
  component: TopBlogpostsTeaser,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TopBlogpostsTeaser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    blogposts: [
      {
        __typename: "BlogPostRecord",
        id: "121805521",
        title: "Milk Post",
        slug: "milk-post-en",
        cardSummary: {
          __typename: "BlogPostModelCardSummaryField",
          value: {
            schema: "dast",
            document: {
              type: "root",
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      type: "span",
                      value:
                        "Im Jahr 2023 stieg die Nachfrage nach Eiern aller Kategorien in der Schweiz im Vergleich zum Vorjahr um 2,8 %. Sie erreichte damit 1 701 Mio. Eier, was nach der Nachfragespitze während der COVID-19-Pandemie einem neuen Höchststand entspricht. Gleichzeitig ging die Schweizer Eierproduktion um 3,7 % zurück. Dies ist der stärkste Rückgang seit 2014. Um den inländischen Verbrauch zu decken, wurden 608 Mio. Eier importiert, 17 % mehr als 2022. Das bedeutet einen Rückgang des Anteils der in der Schweiz produzierten Schaleneier um 5 Prozentpunkte. Im Detailhandel sank der Absatz indessen um 5 %, während die Preise stiegen. ",
                    },
                  ],
                },
              ],
            },
          },
        } as GQL.SimpleBlogPostFragment["cardSummary"],
        image: {
          __typename: "FileField",
          id: "46793926",
          url: "https://www.datocms-assets.com/21252/1653990333-brian-suman-vdbq-iiyvgy-unsplash.jpg",
          alt: null,
        },
        markets: [
          { __typename: "MarketArticleRecord", title: "Bio", slug: "bio", id: "121805521" },
          { __typename: "MarketArticleRecord", title: "Milk", slug: "milk", id: "121805522" },
        ],
        focusArticles: [
          { __typename: "FocusArticleRecord", slug: "bio", title: "Bio", id: "121805523" },
        ],
        publishedDate: "5/24/2022",
      },
      {
        __typename: "BlogPostRecord",
        id: "121948050",
        title: "Potatoes Post",
        slug: "potatoes-post-en",
        cardSummary: {
          __typename: "BlogPostModelCardSummaryField",
          value: {
            schema: "dast",
            document: {
              type: "root",
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      type: "span",
                      value:
                        "Im Jahr 2023 stieg die Nachfrage nach Eiern aller Kategorien in der Schweiz im Vergleich zum Vorjahr um 2,8 %. Sie erreichte damit 1 701 Mio. Eier, was nach der Nachfragespitze während der COVID-19-Pandemie einem neuen Höchststand entspricht. Gleichzeitig ging die Schweizer Eierproduktion um 3,7 % zurück. Dies ist der stärkste Rückgang seit 2014. Um den inländischen Verbrauch zu decken, wurden 608 Mio. Eier importiert, 17 % mehr als 2022. Das bedeutet einen Rückgang des Anteils der in der Schweiz produzierten Schaleneier um 5 Prozentpunkte. Im Detailhandel sank der Absatz indessen um 5 %, während die Preise stiegen. ",
                    },
                  ],
                },
              ],
            },
          },
        } as GQL.SimpleBlogPostFragment["cardSummary"],
        image: {
          __typename: "FileField",
          id: "46793968",
          url: "https://www.datocms-assets.com/21252/1653990537-chad-elliott-4o4dngdad8q-unsplash.jpg",
          alt: null,
        },
        markets: [],
        focusArticles: [],
        publishedDate: "5/31/2022",
      },
      {
        __typename: "BlogPostRecord",
        id: "121805523",
        title: "Milk Post",
        slug: "milk-post-en",
        cardSummary: {
          __typename: "BlogPostModelCardSummaryField",
          value: {
            schema: "dast",
            document: {
              type: "root",
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      type: "span",
                      value:
                        "Im Jahr 2023 stieg die Nachfrage nach Eiern aller Kategorien in der Schweiz im Vergleich zum Vorjahr um 2,8 %. Sie erreichte damit 1 701 Mio. Eier, was nach der Nachfragespitze während der COVID-19-Pandemie einem neuen Höchststand entspricht. Gleichzeitig ging die Schweizer Eierproduktion um 3,7 % zurück. Dies ist der stärkste Rückgang seit 2014. Um den inländischen Verbrauch zu decken, wurden 608 Mio. Eier importiert, 17 % mehr als 2022. Das bedeutet einen Rückgang des Anteils der in der Schweiz produzierten Schaleneier um 5 Prozentpunkte. Im Detailhandel sank der Absatz indessen um 5 %, während die Preise stiegen. ",
                    },
                  ],
                },
              ],
            },
          },
        } as GQL.SimpleBlogPostFragment["cardSummary"],
        image: {
          __typename: "FileField",
          id: "46793926",
          url: "https://www.datocms-assets.com/21252/1653990333-brian-suman-vdbq-iiyvgy-unsplash.jpg",
          alt: null,
        },
        markets: [
          { __typename: "MarketArticleRecord", title: "Bio", slug: "bio", id: "121805521" },
          { __typename: "MarketArticleRecord", title: "Milk", slug: "milk", id: "121805522" },
        ],
        focusArticles: [
          { __typename: "FocusArticleRecord", slug: "bio", title: "Bio", id: "121805523" },
        ],
        publishedDate: "5/24/2022",
      },
    ],
  },
};
