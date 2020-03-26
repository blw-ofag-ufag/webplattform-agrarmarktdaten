import { IconName } from "../icons";

export interface MarketArea {
  slug: string;
  title: string;
  icon: IconName;
}

export interface Newsfeed {
  title: string;
  publicationDate: string;
}
