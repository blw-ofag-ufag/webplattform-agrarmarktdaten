export interface SEO {
  title?: string;
  description?: string;
  image?: {
    url: string;
  };
  twitterCard?: string;
}

export interface Market {
  title: string;
  lead: string;
  slug: string;
  tile: {
    url: string;
  };
  blocks: any[];
  powerBiReport: PowerBIReport;
  seo?: SEO;
}

export interface PowerBIReport {
  title: string;
  url: string;
}

export interface Theme {
  title: string;
  lead: string;
  slug: string;
  tile: {
    url: string;
  };
  blocks: any[];
  seo?: SEO;
}

export interface BlogPost {
  title: string;
  lead: string;
  slug: string;
  author: Person;
  image: {
    url: string;
    alt: string;
  };
  markets: Market[];
  themes: Theme[];
  blocks: any[];
  seo?: SEO;
  _firstPublishedAt?: string;
}

export interface Person {
  firstName: string;
  lastName: string;
  portrait: {
    url: string;
  };
  role: Role;
  email: string;
}

export interface Role {
  title: string;
  description?: string;
}

export interface Newsfeed {
  title: string;
  publicationDate: string;
}

type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T; // from lodash

/**
 * Enables type narrowing through Array::filter
 *
 * @example
 * const a = [1, undefined].filter(Boolean) // here the type of a is (number | undefined)[]
 * const b = [1, undefined].filter(truthy) // here the type of b is number[]
 */
export function truthy<T>(value: T): value is Truthy<T> {
  return !!value;
}
