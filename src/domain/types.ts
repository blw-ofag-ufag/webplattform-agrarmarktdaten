export interface Market {
  title: string;
  lead: string;
  slug: string;
  tile: {
    url: string;
  };
  blocks: any[];
  powerBiReport: PowerBIReport;
  seo: any;
}

export interface PowerBIReport {
  title: string;
  url: string;
}

export interface Theme {
  title: string;
  lead: string;
  slug: string;
  blocks: any[];
  seo: any;
}

export interface BlogPost {
  title: string;
  lead: string;
  slug: string;
  author: Person;
  image: {
    url: string;
  };
  markets: Market[];
  themes: Theme[];
  blocks: any[];
  seo: any;
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
