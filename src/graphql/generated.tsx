import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BooleanType: { input: boolean; output: boolean; }
  CustomData: { input: any; output: any; }
  Date: { input: string; output: string; }
  DateTime: { input: string; output: string; }
  FloatType: { input: number; output: number; }
  IntType: { input: number; output: number; }
  ItemId: { input: any; output: any; }
  JsonField: { input: any; output: any; }
  MetaTagAttributes: { input: any; output: any; }
  UploadId: { input: any; output: any; }
};

export type AnalysisPageModelLeadField = {
  __typename: 'AnalysisPageModelLeadField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<AnalysisPageModelLeadLinksField>;
  value: Scalars['JsonField']['output'];
};

export type AnalysisPageModelLeadFieldMultiLocaleField = {
  __typename: 'AnalysisPageModelLeadFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<AnalysisPageModelLeadField>;
};

export type AnalysisPageModelLeadLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FocusArticleRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | TermsPageRecord;

/** Record of type 📊 Analysis Page (analysis_page) */
export type AnalysisPageRecord = RecordInterface & {
  __typename: 'AnalysisPageRecord';
  _allLeadLocales?: Maybe<Array<AnalysisPageModelLeadFieldMultiLocaleField>>;
  _allSeoLocales?: Maybe<Array<SeoFieldMultiLocaleField>>;
  _allSlugLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  lead?: Maybe<AnalysisPageModelLeadField>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 📊 Analysis Page (analysis_page) */
export type AnalysisPageRecordAllLeadLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📊 Analysis Page (analysis_page) */
export type AnalysisPageRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📊 Analysis Page (analysis_page) */
export type AnalysisPageRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📊 Analysis Page (analysis_page) */
export type AnalysisPageRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📊 Analysis Page (analysis_page) */
export type AnalysisPageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📊 Analysis Page (analysis_page) */
export type AnalysisPageRecordLeadArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📊 Analysis Page (analysis_page) */
export type AnalysisPageRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📊 Analysis Page (analysis_page) */
export type AnalysisPageRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📊 Analysis Page (analysis_page) */
export type AnalysisPageRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Block of type Asset Link Button (asset_link_button) */
export type AssetLinkButtonRecord = RecordInterface & {
  __typename: 'AssetLinkButtonRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  asset?: Maybe<FileField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  label?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Block of type Asset Link Button (asset_link_button) */
export type AssetLinkButtonRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

export type BlogPostModelContentBlocksField = AssetLinkButtonRecord | DataButtonRecord | ExternalLinkButtonRecord | IframeBlockRecord | ImageTeaserBlockRecord | InternalLinkButtonRecord;

export type BlogPostModelContentField = {
  __typename: 'BlogPostModelContentField';
  blocks: Array<BlogPostModelContentBlocksField>;
  links: Array<BlogPostModelContentLinksField>;
  value: Scalars['JsonField']['output'];
};

export type BlogPostModelContentFieldMultiLocaleField = {
  __typename: 'BlogPostModelContentFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<BlogPostModelContentField>;
};

export type BlogPostModelContentLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FileDownloadSectionRecord | FocusArticleRecord | HighlightSectionRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | PowerBiReportRecord | TermsPageRecord;

export type BlogPostModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<BlogPostModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BlogPostModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  authors?: InputMaybe<LinksFilter>;
  content?: InputMaybe<StructuredTextFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  focusArticles?: InputMaybe<LinksFilter>;
  id?: InputMaybe<ItemIdFilter>;
  image?: InputMaybe<FileFilter>;
  lead?: InputMaybe<StructuredTextFilter>;
  leadCard?: InputMaybe<TextFilter>;
  markets?: InputMaybe<LinksFilter>;
  publishedDate?: InputMaybe<DateFilter>;
  seo?: InputMaybe<SeoFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export type BlogPostModelLeadField = {
  __typename: 'BlogPostModelLeadField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<BlogPostModelLeadLinksField>;
  value: Scalars['JsonField']['output'];
};

export type BlogPostModelLeadFieldMultiLocaleField = {
  __typename: 'BlogPostModelLeadFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<BlogPostModelLeadField>;
};

export type BlogPostModelLeadLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FocusArticleRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | TermsPageRecord;

export enum BlogPostModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  publishedDate_ASC = 'publishedDate_ASC',
  publishedDate_DESC = 'publishedDate_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type 📝Blog Post (blog_post) */
export type BlogPostRecord = RecordInterface & {
  __typename: 'BlogPostRecord';
  _allContentLocales?: Maybe<Array<BlogPostModelContentFieldMultiLocaleField>>;
  _allLeadCardLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allLeadLocales?: Maybe<Array<BlogPostModelLeadFieldMultiLocaleField>>;
  _allSeoLocales?: Maybe<Array<SeoFieldMultiLocaleField>>;
  _allSlugLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  authors: Array<PersonRecord>;
  content?: Maybe<BlogPostModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  focusArticles: Array<FocusArticleRecord>;
  id: Scalars['ItemId']['output'];
  image?: Maybe<FileField>;
  lead?: Maybe<BlogPostModelLeadField>;
  leadCard?: Maybe<Scalars['String']['output']>;
  markets: Array<MarketArticleRecord>;
  publishedDate?: Maybe<Scalars['Date']['output']>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 📝Blog Post (blog_post) */
export type BlogPostRecordAllContentLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📝Blog Post (blog_post) */
export type BlogPostRecordAllLeadCardLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Record of type 📝Blog Post (blog_post) */
export type BlogPostRecordAllLeadLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📝Blog Post (blog_post) */
export type BlogPostRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📝Blog Post (blog_post) */
export type BlogPostRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📝Blog Post (blog_post) */
export type BlogPostRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📝Blog Post (blog_post) */
export type BlogPostRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📝Blog Post (blog_post) */
export type BlogPostRecordContentArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📝Blog Post (blog_post) */
export type BlogPostRecordLeadArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📝Blog Post (blog_post) */
export type BlogPostRecordLeadCardArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Record of type 📝Blog Post (blog_post) */
export type BlogPostRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📝Blog Post (blog_post) */
export type BlogPostRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📝Blog Post (blog_post) */
export type BlogPostRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter Boolean fields */
export type BooleanFilter = {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['BooleanType']['input']>;
};

export type CollectionMetadata = {
  __typename: 'CollectionMetadata';
  count: Scalars['IntType']['output'];
};

export enum ColorBucketType {
  black = 'black',
  blue = 'blue',
  brown = 'brown',
  cyan = 'cyan',
  green = 'green',
  grey = 'grey',
  orange = 'orange',
  pink = 'pink',
  purple = 'purple',
  red = 'red',
  white = 'white',
  yellow = 'yellow'
}

export type ColorField = {
  __typename: 'ColorField';
  alpha: Scalars['IntType']['output'];
  blue: Scalars['IntType']['output'];
  cssRgb: Scalars['String']['output'];
  green: Scalars['IntType']['output'];
  hex: Scalars['String']['output'];
  red: Scalars['IntType']['output'];
};

export type CookieBannerModelContentField = {
  __typename: 'CookieBannerModelContentField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<Scalars['String']['output']>;
  value: Scalars['JsonField']['output'];
};

export type CookieBannerModelContentFieldMultiLocaleField = {
  __typename: 'CookieBannerModelContentFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<CookieBannerModelContentField>;
};

/** Record of type 🍪 Cookie Banner (cookie_banner) */
export type CookieBannerRecord = RecordInterface & {
  __typename: 'CookieBannerRecord';
  _allAcceptLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allContentLocales?: Maybe<Array<CookieBannerModelContentFieldMultiLocaleField>>;
  _allRejectLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  accept?: Maybe<Scalars['String']['output']>;
  content?: Maybe<CookieBannerModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  reject?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🍪 Cookie Banner (cookie_banner) */
export type CookieBannerRecordAllAcceptLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🍪 Cookie Banner (cookie_banner) */
export type CookieBannerRecordAllContentLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🍪 Cookie Banner (cookie_banner) */
export type CookieBannerRecordAllRejectLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🍪 Cookie Banner (cookie_banner) */
export type CookieBannerRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🍪 Cookie Banner (cookie_banner) */
export type CookieBannerRecordAcceptArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🍪 Cookie Banner (cookie_banner) */
export type CookieBannerRecordContentArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🍪 Cookie Banner (cookie_banner) */
export type CookieBannerRecordRejectArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter by creation datetime */
export type CreatedAtFilter = {
  /** Filter records with a value that's within the specified minute range. Seconds and milliseconds are truncated from the argument. */
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Block of type Data Button (data_button) */
export type DataButtonRecord = RecordInterface & {
  __typename: 'DataButtonRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  label?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};


/** Block of type Data Button (data_button) */
export type DataButtonRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type 🤖 Data Page (data_page) */
export type DataPageRecord = RecordInterface & {
  __typename: 'DataPageRecord';
  _allSeoLocales?: Maybe<Array<SeoFieldMultiLocaleField>>;
  _allSlugLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🤖 Data Page (data_page) */
export type DataPageRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🤖 Data Page (data_page) */
export type DataPageRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🤖 Data Page (data_page) */
export type DataPageRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🤖 Data Page (data_page) */
export type DataPageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🤖 Data Page (data_page) */
export type DataPageRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🤖 Data Page (data_page) */
export type DataPageRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🤖 Data Page (data_page) */
export type DataPageRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter Date fields */
export type DateFilter = {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['Date']['input']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['Date']['input']>;
  /** Filter records with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['Date']['input']>;
  /** Filter records with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['Date']['input']>;
  /** Filter records with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['Date']['input']>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Block of type Download Teaser Asset (download_teaser_asset) */
export type DownloadTeaserAssetRecord = RecordInterface & {
  __typename: 'DownloadTeaserAssetRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  file?: Maybe<FileField>;
  id: Scalars['ItemId']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Block of type Download Teaser Asset (download_teaser_asset) */
export type DownloadTeaserAssetRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Block of type Download Teaser (download_teaser_block) */
export type DownloadTeaserBlockRecord = RecordInterface & {
  __typename: 'DownloadTeaserBlockRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  downloadTeaserAssets: Array<DownloadTeaserAssetRecord>;
  id: Scalars['ItemId']['output'];
  markdown?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Block of type Download Teaser (download_teaser_block) */
export type DownloadTeaserBlockRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Block of type Download Teaser (download_teaser_block) */
export type DownloadTeaserBlockRecordDescriptionArgs = {
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Block of type Download Teaser (download_teaser_block) */
export type DownloadTeaserBlockRecordMarkdownArgs = {
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Block of type External Link Button (external_link_button) */
export type ExternalLinkButtonRecord = RecordInterface & {
  __typename: 'ExternalLinkButtonRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  label?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};


/** Block of type External Link Button (external_link_button) */
export type ExternalLinkButtonRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Block of type External Video (external_video_block) */
export type ExternalVideoBlockRecord = RecordInterface & {
  __typename: 'ExternalVideoBlockRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  externalVideo?: Maybe<VideoField>;
  id: Scalars['ItemId']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


/** Block of type External Video (external_video_block) */
export type ExternalVideoBlockRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

export enum FaviconType {
  appleTouchIcon = 'appleTouchIcon',
  icon = 'icon',
  msApplication = 'msApplication'
}

export type FileDownloadItemModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<FileDownloadItemModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<FileDownloadItemModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  date?: InputMaybe<DateFilter>;
  description?: InputMaybe<TextFilter>;
  file?: InputMaybe<FileFilter>;
  id?: InputMaybe<ItemIdFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum FileDownloadItemModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  date_ASC = 'date_ASC',
  date_DESC = 'date_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type 📁 File Download Item (file_download_item) */
export type FileDownloadItemRecord = RecordInterface & {
  __typename: 'FileDownloadItemRecord';
  _allDescriptionLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allFileLocales?: Maybe<Array<FileFieldMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  date?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  file?: Maybe<FileField>;
  id: Scalars['ItemId']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 📁 File Download Item (file_download_item) */
export type FileDownloadItemRecordAllDescriptionLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Record of type 📁 File Download Item (file_download_item) */
export type FileDownloadItemRecordAllFileLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📁 File Download Item (file_download_item) */
export type FileDownloadItemRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📁 File Download Item (file_download_item) */
export type FileDownloadItemRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📁 File Download Item (file_download_item) */
export type FileDownloadItemRecordDescriptionArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Record of type 📁 File Download Item (file_download_item) */
export type FileDownloadItemRecordFileArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📁 File Download Item (file_download_item) */
export type FileDownloadItemRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type FileDownloadItemRecordListListNonNullMultiLocaleField = {
  __typename: 'FileDownloadItemRecordListListNonNullMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value: Array<FileDownloadItemRecord>;
};

export type FileDownloadSectionModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<FileDownloadSectionModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<FileDownloadSectionModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  fileDownloadItems?: InputMaybe<LinksFilter>;
  id?: InputMaybe<ItemIdFilter>;
  title?: InputMaybe<StringFilter>;
  titleNotShown?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum FileDownloadSectionModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  titleNotShown_ASC = 'titleNotShown_ASC',
  titleNotShown_DESC = 'titleNotShown_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type 🗂️ File Download Section (file_download_section) */
export type FileDownloadSectionRecord = RecordInterface & {
  __typename: 'FileDownloadSectionRecord';
  _allFileDownloadItemsLocales?: Maybe<Array<FileDownloadItemRecordListListNonNullMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allTitleNotShownLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  fileDownloadItems: Array<FileDownloadItemRecord>;
  id: Scalars['ItemId']['output'];
  title?: Maybe<Scalars['String']['output']>;
  titleNotShown?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🗂️ File Download Section (file_download_section) */
export type FileDownloadSectionRecordAllFileDownloadItemsLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ File Download Section (file_download_section) */
export type FileDownloadSectionRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ File Download Section (file_download_section) */
export type FileDownloadSectionRecordAllTitleNotShownLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ File Download Section (file_download_section) */
export type FileDownloadSectionRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ File Download Section (file_download_section) */
export type FileDownloadSectionRecordFileDownloadItemsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ File Download Section (file_download_section) */
export type FileDownloadSectionRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ File Download Section (file_download_section) */
export type FileDownloadSectionRecordTitleNotShownArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type FileField = FileFieldInterface & {
  __typename: 'FileField';
  _createdAt: Scalars['DateTime']['output'];
  /** The DatoCMS URL where you can edit this entity. To use this field, you need to set a X-Base-Editing-Url header in the request */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  alt?: Maybe<Scalars['String']['output']>;
  author?: Maybe<Scalars['String']['output']>;
  basename: Scalars['String']['output'];
  blurUpThumb?: Maybe<Scalars['String']['output']>;
  blurhash?: Maybe<Scalars['String']['output']>;
  colors: Array<ColorField>;
  copyright?: Maybe<Scalars['String']['output']>;
  customData: Scalars['CustomData']['output'];
  exifInfo: Scalars['CustomData']['output'];
  filename: Scalars['String']['output'];
  focalPoint?: Maybe<FocalPoint>;
  format: Scalars['String']['output'];
  height?: Maybe<Scalars['IntType']['output']>;
  id: Scalars['UploadId']['output'];
  md5: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  responsiveImage?: Maybe<ResponsiveImage>;
  size: Scalars['IntType']['output'];
  smartTags: Array<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
  thumbhash?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  video?: Maybe<UploadVideoField>;
  width?: Maybe<Scalars['IntType']['output']>;
};


export type FileFieldAltArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldBlurUpThumbArgs = {
  imgixParams?: InputMaybe<ImgixParams>;
  punch?: Scalars['Float']['input'];
  quality?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
};


export type FileFieldCustomDataArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldFocalPointArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldResponsiveImageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  imgixParams?: InputMaybe<ImgixParams>;
  locale?: InputMaybe<SiteLocale>;
  sizes?: InputMaybe<Scalars['String']['input']>;
};


export type FileFieldTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldUrlArgs = {
  imgixParams?: InputMaybe<ImgixParams>;
};

export type FileFieldInterface = {
  _createdAt: Scalars['DateTime']['output'];
  /** The DatoCMS URL where you can edit this entity. To use this field, you need to set a X-Base-Editing-Url header in the request */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  alt?: Maybe<Scalars['String']['output']>;
  author?: Maybe<Scalars['String']['output']>;
  basename: Scalars['String']['output'];
  blurUpThumb?: Maybe<Scalars['String']['output']>;
  blurhash?: Maybe<Scalars['String']['output']>;
  colors: Array<ColorField>;
  copyright?: Maybe<Scalars['String']['output']>;
  customData: Scalars['CustomData']['output'];
  exifInfo: Scalars['CustomData']['output'];
  filename: Scalars['String']['output'];
  focalPoint?: Maybe<FocalPoint>;
  format: Scalars['String']['output'];
  height?: Maybe<Scalars['IntType']['output']>;
  id: Scalars['UploadId']['output'];
  md5: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  responsiveImage?: Maybe<ResponsiveImage>;
  size: Scalars['IntType']['output'];
  smartTags: Array<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
  thumbhash?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  video?: Maybe<UploadVideoField>;
  width?: Maybe<Scalars['IntType']['output']>;
};


export type FileFieldInterfaceAltArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldInterfaceBlurUpThumbArgs = {
  imgixParams?: InputMaybe<ImgixParams>;
  punch?: Scalars['Float']['input'];
  quality?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
};


export type FileFieldInterfaceCustomDataArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldInterfaceFocalPointArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldInterfaceResponsiveImageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  imgixParams?: InputMaybe<ImgixParams>;
  locale?: InputMaybe<SiteLocale>;
  sizes?: InputMaybe<Scalars['String']['input']>;
};


export type FileFieldInterfaceTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldInterfaceUrlArgs = {
  imgixParams?: InputMaybe<ImgixParams>;
};

export type FileFieldMultiLocaleField = {
  __typename: 'FileFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<FileField>;
};

/** Specifies how to filter Single-file/image fields */
export type FileFilter = {
  /** Search for records with an exact match. The specified value must be an Upload ID */
  eq?: InputMaybe<Scalars['UploadId']['input']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records that have one of the specified uploads */
  in?: InputMaybe<Array<InputMaybe<Scalars['UploadId']['input']>>>;
  /** Exclude records with an exact match. The specified value must be an Upload ID */
  neq?: InputMaybe<Scalars['UploadId']['input']>;
  /** Filter records that do not have one of the specified uploads */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['UploadId']['input']>>>;
};

export type FocusArticleModelContentBlocksField = AssetLinkButtonRecord | DataButtonRecord | ExternalLinkButtonRecord | IframeBlockRecord | ImageTeaserBlockRecord | InternalLinkButtonRecord;

export type FocusArticleModelContentField = {
  __typename: 'FocusArticleModelContentField';
  blocks: Array<FocusArticleModelContentBlocksField>;
  links: Array<FocusArticleModelContentLinksField>;
  value: Scalars['JsonField']['output'];
};

export type FocusArticleModelContentFieldMultiLocaleField = {
  __typename: 'FocusArticleModelContentFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<FocusArticleModelContentField>;
};

export type FocusArticleModelContentLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FileDownloadSectionRecord | FocusArticleRecord | HighlightSectionRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | PowerBiReportRecord | TermsPageRecord;

export type FocusArticleModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<FocusArticleModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<FocusArticleModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  content?: InputMaybe<StructuredTextFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  lead?: InputMaybe<StructuredTextFilter>;
  powerBiReport?: InputMaybe<LinkFilter>;
  seo?: InputMaybe<SeoFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export type FocusArticleModelLeadField = {
  __typename: 'FocusArticleModelLeadField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<FocusArticleModelLeadLinksField>;
  value: Scalars['JsonField']['output'];
};

export type FocusArticleModelLeadFieldMultiLocaleField = {
  __typename: 'FocusArticleModelLeadFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<FocusArticleModelLeadField>;
};

export type FocusArticleModelLeadLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FocusArticleRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | TermsPageRecord;

export enum FocusArticleModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type 🎯  Focus Article (focus_article) */
export type FocusArticleRecord = RecordInterface & {
  __typename: 'FocusArticleRecord';
  _allContentLocales?: Maybe<Array<FocusArticleModelContentFieldMultiLocaleField>>;
  _allLeadLocales?: Maybe<Array<FocusArticleModelLeadFieldMultiLocaleField>>;
  _allSeoLocales?: Maybe<Array<SeoFieldMultiLocaleField>>;
  _allSlugLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  content?: Maybe<FocusArticleModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  lead?: Maybe<FocusArticleModelLeadField>;
  powerBiReport?: Maybe<PowerBiReportRecord>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🎯  Focus Article (focus_article) */
export type FocusArticleRecordAllContentLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🎯  Focus Article (focus_article) */
export type FocusArticleRecordAllLeadLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🎯  Focus Article (focus_article) */
export type FocusArticleRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🎯  Focus Article (focus_article) */
export type FocusArticleRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🎯  Focus Article (focus_article) */
export type FocusArticleRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🎯  Focus Article (focus_article) */
export type FocusArticleRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🎯  Focus Article (focus_article) */
export type FocusArticleRecordContentArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🎯  Focus Article (focus_article) */
export type FocusArticleRecordLeadArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🎯  Focus Article (focus_article) */
export type FocusArticleRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🎯  Focus Article (focus_article) */
export type FocusArticleRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🎯  Focus Article (focus_article) */
export type FocusArticleRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type 🧘 Focus (focus_model) */
export type FocusModelRecord = RecordInterface & {
  __typename: 'FocusModelRecord';
  _allSlugLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🧘 Focus (focus_model) */
export type FocusModelRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧘 Focus (focus_model) */
export type FocusModelRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧘 Focus (focus_model) */
export type FocusModelRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Block of type Gallery (gallery_block) */
export type GalleryBlockRecord = RecordInterface & {
  __typename: 'GalleryBlockRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  galleryAssets: Array<FileField>;
  id: Scalars['ItemId']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


/** Block of type Gallery (gallery_block) */
export type GalleryBlockRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

export type GlobalSeoField = {
  __typename: 'GlobalSeoField';
  facebookPageUrl?: Maybe<Scalars['String']['output']>;
  fallbackSeo?: Maybe<SeoField>;
  siteName?: Maybe<Scalars['String']['output']>;
  titleSuffix?: Maybe<Scalars['String']['output']>;
  twitterAccount?: Maybe<Scalars['String']['output']>;
};

export type HighlightSectionFileModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<HighlightSectionFileModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<HighlightSectionFileModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  file?: InputMaybe<FileFilter>;
  id?: InputMaybe<ItemIdFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum HighlightSectionFileModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type 📄 Highlight Section File (highlight_section_file) */
export type HighlightSectionFileRecord = RecordInterface & {
  __typename: 'HighlightSectionFileRecord';
  _allFileLocales?: Maybe<Array<FileFieldMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  file?: Maybe<FileField>;
  id: Scalars['ItemId']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 📄 Highlight Section File (highlight_section_file) */
export type HighlightSectionFileRecordAllFileLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📄 Highlight Section File (highlight_section_file) */
export type HighlightSectionFileRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📄 Highlight Section File (highlight_section_file) */
export type HighlightSectionFileRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📄 Highlight Section File (highlight_section_file) */
export type HighlightSectionFileRecordFileArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📄 Highlight Section File (highlight_section_file) */
export type HighlightSectionFileRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type HighlightSectionLinkModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<HighlightSectionLinkModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<HighlightSectionLinkModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  link?: InputMaybe<LinkFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export type HighlightSectionLinkModelLinkField = BlogPostRecord | FocusArticleRecord | MarketArticleRecord | MethodsPageRecord;

export enum HighlightSectionLinkModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type 🔗 Highlight Section Link (highlight_section_link) */
export type HighlightSectionLinkRecord = RecordInterface & {
  __typename: 'HighlightSectionLinkRecord';
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  link?: Maybe<HighlightSectionLinkModelLinkField>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🔗 Highlight Section Link (highlight_section_link) */
export type HighlightSectionLinkRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🔗 Highlight Section Link (highlight_section_link) */
export type HighlightSectionLinkRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🔗 Highlight Section Link (highlight_section_link) */
export type HighlightSectionLinkRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type HighlightSectionModelContentField = {
  __typename: 'HighlightSectionModelContentField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<HighlightSectionModelContentLinksField>;
  value: Scalars['JsonField']['output'];
};

export type HighlightSectionModelContentFieldMultiLocaleField = {
  __typename: 'HighlightSectionModelContentFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<HighlightSectionModelContentField>;
};

export type HighlightSectionModelContentLinksField = HighlightSectionFileRecord | HighlightSectionLinkRecord;

export type HighlightSectionModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<HighlightSectionModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<HighlightSectionModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  content?: InputMaybe<StructuredTextFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  title?: InputMaybe<StringFilter>;
  titleNotShown?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum HighlightSectionModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  titleNotShown_ASC = 'titleNotShown_ASC',
  titleNotShown_DESC = 'titleNotShown_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type 👀 Highlight Section (highlight_section) */
export type HighlightSectionRecord = RecordInterface & {
  __typename: 'HighlightSectionRecord';
  _allContentLocales?: Maybe<Array<HighlightSectionModelContentFieldMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allTitleNotShownLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  content?: Maybe<HighlightSectionModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  title?: Maybe<Scalars['String']['output']>;
  titleNotShown?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 👀 Highlight Section (highlight_section) */
export type HighlightSectionRecordAllContentLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 👀 Highlight Section (highlight_section) */
export type HighlightSectionRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 👀 Highlight Section (highlight_section) */
export type HighlightSectionRecordAllTitleNotShownLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 👀 Highlight Section (highlight_section) */
export type HighlightSectionRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 👀 Highlight Section (highlight_section) */
export type HighlightSectionRecordContentArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 👀 Highlight Section (highlight_section) */
export type HighlightSectionRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 👀 Highlight Section (highlight_section) */
export type HighlightSectionRecordTitleNotShownArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type HomePageModelLeadField = {
  __typename: 'HomePageModelLeadField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<HomePageModelLeadLinksField>;
  value: Scalars['JsonField']['output'];
};

export type HomePageModelLeadFieldMultiLocaleField = {
  __typename: 'HomePageModelLeadFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<HomePageModelLeadField>;
};

export type HomePageModelLeadLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FocusArticleRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | TermsPageRecord;

/** Record of type 🏠 Home (home_page) */
export type HomePageRecord = RecordInterface & {
  __typename: 'HomePageRecord';
  _allLeadLocales?: Maybe<Array<HomePageModelLeadFieldMultiLocaleField>>;
  _allSeoLocales?: Maybe<Array<SeoFieldMultiLocaleField>>;
  _allSlugLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  focusArticles: Array<FocusArticleRecord>;
  hero?: Maybe<FileField>;
  id: Scalars['ItemId']['output'];
  lead?: Maybe<HomePageModelLeadField>;
  markets: Array<MarketArticleRecord>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🏠 Home (home_page) */
export type HomePageRecordAllLeadLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏠 Home (home_page) */
export type HomePageRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏠 Home (home_page) */
export type HomePageRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏠 Home (home_page) */
export type HomePageRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏠 Home (home_page) */
export type HomePageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏠 Home (home_page) */
export type HomePageRecordLeadArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏠 Home (home_page) */
export type HomePageRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏠 Home (home_page) */
export type HomePageRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏠 Home (home_page) */
export type HomePageRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Block of type iFrame (iframe_block) */
export type IframeBlockRecord = RecordInterface & {
  __typename: 'IframeBlockRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  caption?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  height?: Maybe<Scalars['IntType']['output']>;
  id: Scalars['ItemId']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};


/** Block of type iFrame (iframe_block) */
export type IframeBlockRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Block of type Image Teaser (image_teaser_block) */
export type ImageTeaserBlockRecord = RecordInterface & {
  __typename: 'ImageTeaserBlockRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ItemId']['output'];
  imageTeaserAsset?: Maybe<FileField>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Block of type Image Teaser (image_teaser_block) */
export type ImageTeaserBlockRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Block of type Image Teaser (image_teaser_block) */
export type ImageTeaserBlockRecordDescriptionArgs = {
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ImgixParams = {
  /**
   * Aspect Ratio
   *
   * Specifies an aspect ratio to maintain when resizing and cropping the image
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/ar)
   */
  ar?: InputMaybe<Scalars['String']['input']>;
  /**
   * Automatic
   *
   * Applies automatic enhancements to images.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/auto)
   */
  auto?: InputMaybe<Array<ImgixParamsAuto>>;
  /**
   * Background Color
   *
   * Colors the background of padded and partially-transparent images.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/bg)
   */
  bg?: InputMaybe<Scalars['String']['input']>;
  /**
   * Background Removal
   *
   * Removes background from image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/rendering/background-removal/bg-remove)
   */
  bgRemove?: InputMaybe<Scalars['BooleanType']['input']>;
  /**
   * Blend
   *
   * Specifies the location of the blend image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend)
   */
  blend?: InputMaybe<Scalars['String']['input']>;
  /**
   * Blend Align
   *
   * Changes the blend alignment relative to the parent image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-align)
   */
  blendAlign?: InputMaybe<Array<ImgixParamsBlendAlign>>;
  /**
   * Blend Alpha
   *
   * Changes the alpha of the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-alpha)
   */
  blendAlpha?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Blend Color
   *
   * Specifies a color to use when applying the blend.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-color)
   */
  blendColor?: InputMaybe<Scalars['String']['input']>;
  /**
   * Blend Crop
   *
   * Specifies the type of crop for blend images.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-crop)
   */
  blendCrop?: InputMaybe<Array<ImgixParamsBlendCrop>>;
  /**
   * Blend Fit
   *
   * Specifies the fit mode for blend images.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-fit)
   */
  blendFit?: InputMaybe<ImgixParamsBlendFit>;
  /**
   * Blend Height
   *
   * Adjusts the height of the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-h)
   */
  blendH?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Blend Mode
   *
   * Sets the blend mode for a blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-mode)
   */
  blendMode?: InputMaybe<ImgixParamsBlendMode>;
  /**
   * Blend Padding
   *
   * Applies padding to the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-pad)
   */
  blendPad?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Blend Size
   *
   * Adjusts the size of the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-size)
   */
  blendSize?: InputMaybe<ImgixParamsBlendSize>;
  /**
   * Blend Width
   *
   * Adjusts the width of the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-w)
   */
  blendW?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Blend X Position
   *
   * Adjusts the x-offset of the blend image relative to its parent.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-x)
   */
  blendX?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Blend Y Position
   *
   * Adjusts the y-offset of the blend image relative to its parent.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-y)
   */
  blendY?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Gaussian Blur
   *
   * Applies a gaussian blur to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/blur)
   */
  blur?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Border Size & Color
   *
   * Applies a border to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border)
   */
  border?: InputMaybe<Scalars['String']['input']>;
  /**
   * Border Bottom
   *
   * Sets bottom border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-bottom)
   */
  borderBottom?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Border Left
   *
   * Sets left border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-left)
   */
  borderLeft?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Outer Border Radius
   *
   * Sets the outer radius of the image's border in pixels.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-radius)
   */
  borderRadius?: InputMaybe<Scalars['String']['input']>;
  /**
   * Inner Border Radius
   *
   * Sets the inner radius of the image's border in pixels.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-radius-inner)
   */
  borderRadiusInner?: InputMaybe<Scalars['String']['input']>;
  /**
   * Border Right
   *
   * Sets right border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-right)
   */
  borderRight?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Border Top
   *
   * Sets top border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-top)
   */
  borderTop?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Brightness
   *
   * Adjusts the brightness of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/bri)
   */
  bri?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Client Hints
   *
   * Sets one or more Client-Hints headers
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/ch)
   */
  ch?: InputMaybe<Array<ImgixParamsCh>>;
  /**
   * Chroma Subsampling
   *
   * Specifies the output chroma subsampling rate.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/chromasub)
   */
  chromasub?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Color Quantization
   *
   * Limits the number of unique colors in an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/colorquant)
   */
  colorquant?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Palette Color Count
   *
   * Specifies how many colors to include in a palette-extraction response.
   *
   * Depends on: `palette`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/color-palette/colors)
   */
  colors?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Contrast
   *
   * Adjusts the contrast of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/con)
   */
  con?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Mask Corner Radius
   *
   * Specifies the radius value for a rounded corner mask.
   *
   * Depends on: `mask=corners`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask/corner-radius)
   */
  cornerRadius?: InputMaybe<Scalars['String']['input']>;
  /**
   * Crop Mode
   *
   * Specifies how to crop an image.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/crop)
   */
  crop?: InputMaybe<Array<ImgixParamsCrop>>;
  /**
   * Color Space
   *
   * Specifies the color space of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/cs)
   */
  cs?: InputMaybe<ImgixParamsCs>;
  /**
   * Download
   *
   * Forces a URL to use send-file in its response.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/dl)
   */
  dl?: InputMaybe<Scalars['String']['input']>;
  /**
   * Dots Per Inch
   *
   * Sets the DPI value in the EXIF header.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/dpi)
   */
  dpi?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Device Pixel Ratio
   *
   * Adjusts the device-pixel ratio of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/dpr)
   */
  dpr?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Duotone
   *
   * Applies a duotone effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/duotone)
   */
  duotone?: InputMaybe<Scalars['String']['input']>;
  /**
   * Duotone Alpha
   *
   * Changes the alpha of the duotone effect atop the source image.
   *
   * Depends on: `duotone`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/duotone-alpha)
   */
  duotoneAlpha?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Exposure
   *
   * Adjusts the exposure of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/exp)
   */
  exp?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Url Expiration Timestamp
   *
   * A Unix timestamp specifying a UTC time. Requests made to this URL after that time will output a 404 status code.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/expires)
   */
  expires?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Face Index
   *
   * Selects a face to crop to.
   *
   * Depends on: `fit=facearea`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/faceindex)
   */
  faceindex?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Face Padding
   *
   * Adjusts padding around a selected face.
   *
   * Depends on: `fit=facearea`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/facepad)
   */
  facepad?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Json Face Data
   *
   * Specifies that face data should be included in output when combined with `fm=json`.
   *
   * Depends on: `fm=json`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/faces)
   */
  faces?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Fill Mode
   *
   * Determines how to fill in additional space created by the fit setting
   *
   * Depends on: `fit`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/fill/fill)
   */
  fill?: InputMaybe<ImgixParamsFill>;
  /**
   * Fill Color
   *
   * Sets the fill color for images with additional space created by the fit setting
   *
   * Depends on: `fill=solid`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/fill/fill-color)
   */
  fillColor?: InputMaybe<Scalars['String']['input']>;
  /**
   * Resize Fit Mode
   *
   * Specifies how to map the source image to the output image dimensions.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/fit)
   */
  fit?: InputMaybe<ImgixParamsFit>;
  /**
   * Flip Axis
   *
   * Flips an image on a specified axis.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/rotation/flip)
   */
  flip?: InputMaybe<ImgixParamsFlip>;
  /**
   * Output Format
   *
   * Changes the format of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/fm)
   */
  fm?: InputMaybe<ImgixParamsFm>;
  /**
   * Focal Point Debug
   *
   * Displays crosshairs identifying the location of the set focal point
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-debug)
   */
  fpDebug?: InputMaybe<Scalars['BooleanType']['input']>;
  /**
   * Focal Point X Position
   *
   * Sets the relative horizontal value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-x)
   */
  fpX?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Focal Point Y Position
   *
   * Sets the relative vertical value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-y)
   */
  fpY?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Focal Point Zoom
   *
   * Sets the relative zoom value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-z)
   */
  fpZ?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Frames Per Second
   *
   * Specifies the framerate of the generated image.
   */
  fps?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Frame Selection
   *
   * Specifies the frame of an animated image to use.
   */
  frame?: InputMaybe<Scalars['String']['input']>;
  /**
   * Gamma
   *
   * Adjusts the gamma of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/gam)
   */
  gam?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Animated Gif Quality
   *
   * Depends on: `fm=gif`
   */
  gifQ?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Grid Colors
   *
   * Sets grid colors for the transparency checkerboard grid.
   *
   * Depends on: `transparency`
   */
  gridColors?: InputMaybe<Scalars['String']['input']>;
  /**
   * Grid Size
   *
   * Sets grid size for the transparency checkerboard grid.
   *
   * Depends on: `transparency`
   */
  gridSize?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Image Height
   *
   * Adjusts the height of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/h)
   */
  h?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Highlight
   *
   * Adjusts the highlights of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/high)
   */
  high?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Halftone
   *
   * Applies a half-tone effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/htn)
   */
  htn?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Hue Shift
   *
   * Adjusts the hue of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/hue)
   */
  hue?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Frame Interval
   *
   * Displays every Nth frame starting with the first frame.
   */
  interval?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Invert
   *
   * Inverts the colors on the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/invert)
   */
  invert?: InputMaybe<Scalars['BooleanType']['input']>;
  /**
   * Iptc Passthrough
   *
   * Determine if IPTC data should be passed for JPEG images.
   */
  iptc?: InputMaybe<ImgixParamsIptc>;
  /**
   * Animation Loop Count
   *
   * Specifies the number of times an animated image should repeat. A value of 0 means infinite looping.
   */
  loop?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Lossless Compression
   *
   * Specifies that the output image should be a lossless variant.
   *
   * Depends on: `fm=webp`, `fm=jxr`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/lossless)
   */
  lossless?: InputMaybe<Scalars['BooleanType']['input']>;
  /**
   * Watermark Image Url
   *
   * Specifies the location of the watermark image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark)
   */
  mark?: InputMaybe<Scalars['String']['input']>;
  /**
   * Watermark Alignment Mode
   *
   * Changes the watermark alignment relative to the parent image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-align)
   */
  markAlign?: InputMaybe<Array<ImgixParamsMarkAlign>>;
  /**
   * Watermark Alpha
   *
   * Changes the alpha of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-alpha)
   */
  markAlpha?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Watermark Base Url
   *
   * Changes base URL of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-base)
   */
  markBase?: InputMaybe<Scalars['String']['input']>;
  /**
   * Watermark Fit Mode
   *
   * Specifies the fit mode for watermark images.
   *
   * Depends on: `mark`, `markw`, `markh`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-fit)
   */
  markFit?: InputMaybe<ImgixParamsMarkFit>;
  /**
   * Watermark Height
   *
   * Adjusts the height of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-h)
   */
  markH?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Watermark Padding
   *
   * Applies padding to the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-pad)
   */
  markPad?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Watermark Rotation
   *
   * Rotates a watermark or tiled watermarks by a specified number of degrees.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-rot)
   */
  markRot?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Watermark Scale
   *
   * Adjusts the scale of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-scale)
   */
  markScale?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Watermark Tile
   *
   * Adds tiled watermark.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-tile)
   */
  markTile?: InputMaybe<ImgixParamsMarkTile>;
  /**
   * Watermark Width
   *
   * Adjusts the width of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-w)
   */
  markW?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Watermark X Position
   *
   * Adjusts the x-offset of the watermark image relative to its parent.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-x)
   */
  markX?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Watermark Y Position
   *
   * Adjusts the y-offset of the watermark image relative to its parent.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-y)
   */
  markY?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Mask Type
   *
   * Defines the type of mask and specifies the URL if that type is selected.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask)
   */
  mask?: InputMaybe<Scalars['String']['input']>;
  /**
   * Mask Background Color
   *
   * Colors the background of the transparent mask area of images
   *
   * Depends on: `mask`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask/mask-bg)
   */
  maskBg?: InputMaybe<Scalars['String']['input']>;
  /**
   * Maximum Height
   *
   * Specifies the maximum height of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/max-height)
   */
  maxH?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Maximum Width
   *
   * Specifies the maximum width of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/max-width)
   */
  maxW?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Minimum Height
   *
   * Specifies the minimum height of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/min-height)
   */
  minH?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Minimum Width
   *
   * Specifies the minimum width of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/min-width)
   */
  minW?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Monochrome
   *
   * Applies a monochrome effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/monochrome)
   */
  monochrome?: InputMaybe<Scalars['String']['input']>;
  /**
   * Noise Reduction Bound
   *
   * Reduces the noise in an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/noise-reduction/nr)
   */
  nr?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Noise Reduction Sharpen
   *
   * Provides a threshold by which to sharpen an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/noise-reduction/nrs)
   */
  nrs?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Orientation
   *
   * Changes the image orientation.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/rotation/orient)
   */
  orient?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Padding
   *
   * Pads an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad)
   */
  pad?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Padding Bottom
   *
   * Sets bottom padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-bottom)
   */
  padBottom?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Padding Left
   *
   * Sets left padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-left)
   */
  padLeft?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Padding Right
   *
   * Sets right padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-right)
   */
  padRight?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Padding Top
   *
   * Sets top padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-top)
   */
  padTop?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Pdf Page Number
   *
   * Selects a page from a PDF for display.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/pdf/page)
   */
  page?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Color Palette Extraction
   *
   * Specifies an output format for palette-extraction.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/color-palette/palette)
   */
  palette?: InputMaybe<ImgixParamsPalette>;
  /**
   * Pdf Annotation
   *
   * Enables or disables PDF annotation.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/pdf/pdf-annotation)
   */
  pdfAnnotation?: InputMaybe<Scalars['BooleanType']['input']>;
  /**
   * Css Prefix
   *
   * Specifies a CSS prefix for all classes in palette-extraction.
   *
   * Depends on: `palette=css`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/color-palette/prefix)
   */
  prefix?: InputMaybe<Scalars['String']['input']>;
  /**
   * Pixellate
   *
   * Applies a pixelation effect to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/px)
   */
  px?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Output Quality
   *
   * Adjusts the quality of an output image.
   *
   * Depends on: `fm=jpg`, `fm=pjpg`, `fm=webp`, `fm=jxr`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/q)
   */
  q?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Source Rectangle Region
   *
   * Crops an image to a specified rectangle.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/rect)
   */
  rect?: InputMaybe<Scalars['String']['input']>;
  /**
   * Reverse
   *
   * Reverses the frame order on the source animation.
   */
  reverse?: InputMaybe<Scalars['BooleanType']['input']>;
  /**
   * Rotation
   *
   * Rotates an image by a specified number of degrees.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/rotation/rot)
   */
  rot?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Saturation
   *
   * Adjusts the saturation of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/sat)
   */
  sat?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Sepia Tone
   *
   * Applies a sepia effect to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/sepia)
   */
  sepia?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Shadow
   *
   * Adjusts the highlights of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/shad)
   */
  shad?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Sharpen
   *
   * Adjusts the sharpness of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/sharp)
   */
  sharp?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Frame Skip
   *
   * Skips every Nth frame starting with the first frame.
   */
  skip?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Transparency
   *
   * Adds checkerboard behind images which support transparency.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/fill/transparency)
   */
  transparency?: InputMaybe<ImgixParamsTransparency>;
  /**
   * Trim Image
   *
   * Trims the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim)
   */
  trim?: InputMaybe<ImgixParamsTrim>;
  /**
   * Trim Color
   *
   * Specifies a trim color on a trim operation.
   *
   * Depends on: `trim=color`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-color)
   */
  trimColor?: InputMaybe<Scalars['String']['input']>;
  /**
   * Trim Mean Difference
   *
   * Specifies the mean difference on a trim operation.
   *
   * Depends on: `trim=auto`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-md)
   */
  trimMd?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Trim Padding
   *
   * Pads the area of the source image before trimming.
   *
   * Depends on: `trim`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-pad)
   */
  trimPad?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Trim Standard Deviation
   *
   * Specifies the standard deviation on a trim operation.
   *
   * Depends on: `trim=auto`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-sd)
   */
  trimSd?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Trim Tolerance
   *
   * Specifies the tolerance on a trim operation.
   *
   * Depends on: `trim=color`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-tol)
   */
  trimTol?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Text String
   *
   * Sets the text string to render.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt)
   */
  txt?: InputMaybe<Scalars['String']['input']>;
  /**
   * Text Align
   *
   * Sets the vertical and horizontal alignment of rendered text relative to the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-align)
   */
  txtAlign?: InputMaybe<Array<ImgixParamsTxtAlign>>;
  /**
   * Text Clipping Mode
   *
   * Sets the clipping properties of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-clip)
   */
  txtClip?: InputMaybe<Array<ImgixParamsTxtClip>>;
  /**
   * Text Color
   *
   * Specifies the color of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-color)
   */
  txtColor?: InputMaybe<Scalars['String']['input']>;
  /**
   * Text Fit Mode
   *
   * Specifies the fit approach for rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-fit)
   */
  txtFit?: InputMaybe<ImgixParamsTxtFit>;
  /**
   * Text Font
   *
   * Selects a font for rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-font)
   */
  txtFont?: InputMaybe<Scalars['String']['input']>;
  /**
   * Text Leading
   *
   * Sets the leading (line spacing) for rendered text. Only works on the multi-line text endpoint.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/typesetting/txt-lead)
   */
  txtLead?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text Ligatures
   *
   * Controls the level of ligature substitution
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-lig)
   */
  txtLig?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text Outline
   *
   * Outlines the rendered text with a specified color.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-line)
   */
  txtLine?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text Outline Color
   *
   * Specifies a text outline color.
   *
   * Depends on: `txt`, `txtline`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-line-color)
   */
  txtLineColor?: InputMaybe<Scalars['String']['input']>;
  /**
   * Text Padding
   *
   * Specifies the padding (in device-independent pixels) between a textbox and the edges of the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-pad)
   */
  txtPad?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text Shadow
   *
   * Applies a shadow to rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-shad)
   */
  txtShad?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Text Font Size
   *
   * Sets the font size of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-size)
   */
  txtSize?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text Tracking
   *
   * Sets the tracking (letter spacing) for rendered text. Only works on the multi-line text endpoint.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/typesetting/txt-track)
   */
  txtTrack?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text Width
   *
   * Sets the width of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-width)
   */
  txtWidth?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text X Position
   *
   * Sets the horizontal (x) position of the text in pixels relative to the left edge of the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-x)
   */
  txtX?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text Y Position
   *
   * Sets the vertical (y) position of the text in pixels relative to the top edge of the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-y)
   */
  txtY?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Unsharp Mask
   *
   * Sharpens the source image using an unsharp mask.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/usm)
   */
  usm?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Unsharp Mask Radius
   *
   * Specifies the radius for an unsharp mask operation.
   *
   * Depends on: `usm`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/usmrad)
   */
  usmrad?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Vibrance
   *
   * Adjusts the vibrance of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/vib)
   */
  vib?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Image Width
   *
   * Adjusts the width of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/w)
   */
  w?: InputMaybe<Scalars['FloatType']['input']>;
};

export enum ImgixParamsAuto {
  compress = 'compress',
  enhance = 'enhance',
  format = 'format',
  redeye = 'redeye'
}

export enum ImgixParamsBlendAlign {
  bottom = 'bottom',
  center = 'center',
  left = 'left',
  middle = 'middle',
  right = 'right',
  top = 'top'
}

export enum ImgixParamsBlendCrop {
  bottom = 'bottom',
  faces = 'faces',
  left = 'left',
  right = 'right',
  top = 'top'
}

export enum ImgixParamsBlendFit {
  clamp = 'clamp',
  clip = 'clip',
  crop = 'crop',
  max = 'max',
  scale = 'scale'
}

export enum ImgixParamsBlendMode {
  burn = 'burn',
  color = 'color',
  darken = 'darken',
  difference = 'difference',
  dodge = 'dodge',
  exclusion = 'exclusion',
  hardlight = 'hardlight',
  hue = 'hue',
  lighten = 'lighten',
  luminosity = 'luminosity',
  multiply = 'multiply',
  normal = 'normal',
  overlay = 'overlay',
  saturation = 'saturation',
  screen = 'screen',
  softlight = 'softlight'
}

export enum ImgixParamsBlendSize {
  inherit = 'inherit'
}

export enum ImgixParamsCh {
  dpr = 'dpr',
  saveData = 'saveData',
  width = 'width'
}

export enum ImgixParamsCrop {
  bottom = 'bottom',
  edges = 'edges',
  entropy = 'entropy',
  faces = 'faces',
  focalpoint = 'focalpoint',
  left = 'left',
  right = 'right',
  top = 'top'
}

export enum ImgixParamsCs {
  adobergb1998 = 'adobergb1998',
  srgb = 'srgb',
  strip = 'strip',
  tinysrgb = 'tinysrgb'
}

export enum ImgixParamsFill {
  blur = 'blur',
  solid = 'solid'
}

export enum ImgixParamsFit {
  clamp = 'clamp',
  clip = 'clip',
  crop = 'crop',
  facearea = 'facearea',
  fill = 'fill',
  fillmax = 'fillmax',
  max = 'max',
  min = 'min',
  scale = 'scale'
}

export enum ImgixParamsFlip {
  h = 'h',
  hv = 'hv',
  v = 'v'
}

export enum ImgixParamsFm {
  avif = 'avif',
  blurhash = 'blurhash',
  gif = 'gif',
  jp2 = 'jp2',
  jpg = 'jpg',
  json = 'json',
  jxr = 'jxr',
  mp4 = 'mp4',
  pjpg = 'pjpg',
  png = 'png',
  png8 = 'png8',
  png32 = 'png32',
  webm = 'webm',
  webp = 'webp'
}

export enum ImgixParamsIptc {
  allow = 'allow',
  block = 'block'
}

export enum ImgixParamsMarkAlign {
  bottom = 'bottom',
  center = 'center',
  left = 'left',
  middle = 'middle',
  right = 'right',
  top = 'top'
}

export enum ImgixParamsMarkFit {
  clip = 'clip',
  crop = 'crop',
  fill = 'fill',
  max = 'max',
  scale = 'scale'
}

export enum ImgixParamsMarkTile {
  grid = 'grid'
}

export enum ImgixParamsPalette {
  css = 'css',
  json = 'json'
}

export enum ImgixParamsTransparency {
  grid = 'grid'
}

export enum ImgixParamsTrim {
  auto = 'auto',
  color = 'color'
}

export enum ImgixParamsTxtAlign {
  bottom = 'bottom',
  center = 'center',
  left = 'left',
  middle = 'middle',
  right = 'right',
  top = 'top'
}

export enum ImgixParamsTxtClip {
  ellipsis = 'ellipsis',
  end = 'end',
  middle = 'middle',
  start = 'start'
}

export enum ImgixParamsTxtFit {
  max = 'max'
}

/** Specifies how to filter by usage */
export type InUseFilter = {
  /** Search uploads that are currently used by some record or not */
  eq?: InputMaybe<Scalars['BooleanType']['input']>;
};

export type InfoPageModelContentBlocksField = AssetLinkButtonRecord | DataButtonRecord | ExternalLinkButtonRecord | IframeBlockRecord | ImageTeaserBlockRecord | InternalLinkButtonRecord;

export type InfoPageModelContentField = {
  __typename: 'InfoPageModelContentField';
  blocks: Array<InfoPageModelContentBlocksField>;
  links: Array<InfoPageModelContentLinksField>;
  value: Scalars['JsonField']['output'];
};

export type InfoPageModelContentFieldMultiLocaleField = {
  __typename: 'InfoPageModelContentFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<InfoPageModelContentField>;
};

export type InfoPageModelContentLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FileDownloadSectionRecord | FocusArticleRecord | HighlightSectionRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | PowerBiReportRecord | TermsPageRecord;

export type InfoPageModelLeadField = {
  __typename: 'InfoPageModelLeadField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<InfoPageModelLeadLinksField>;
  value: Scalars['JsonField']['output'];
};

export type InfoPageModelLeadFieldMultiLocaleField = {
  __typename: 'InfoPageModelLeadFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<InfoPageModelLeadField>;
};

export type InfoPageModelLeadLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FocusArticleRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | TermsPageRecord;

/** Record of type ℹ️ Info Page (info_page) */
export type InfoPageRecord = RecordInterface & {
  __typename: 'InfoPageRecord';
  _allContentLocales?: Maybe<Array<InfoPageModelContentFieldMultiLocaleField>>;
  _allLeadLocales?: Maybe<Array<InfoPageModelLeadFieldMultiLocaleField>>;
  _allSeoLocales?: Maybe<Array<SeoFieldMultiLocaleField>>;
  _allSlugLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  content?: Maybe<InfoPageModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  lead?: Maybe<InfoPageModelLeadField>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type ℹ️ Info Page (info_page) */
export type InfoPageRecordAllContentLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ℹ️ Info Page (info_page) */
export type InfoPageRecordAllLeadLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ℹ️ Info Page (info_page) */
export type InfoPageRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ℹ️ Info Page (info_page) */
export type InfoPageRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ℹ️ Info Page (info_page) */
export type InfoPageRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ℹ️ Info Page (info_page) */
export type InfoPageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ℹ️ Info Page (info_page) */
export type InfoPageRecordContentArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ℹ️ Info Page (info_page) */
export type InfoPageRecordLeadArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ℹ️ Info Page (info_page) */
export type InfoPageRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ℹ️ Info Page (info_page) */
export type InfoPageRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ℹ️ Info Page (info_page) */
export type InfoPageRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type InternalLinkButtonModelPageField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FocusArticleRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | TermsPageRecord;

/** Block of type Internal Link Button (internal_link_button) */
export type InternalLinkButtonRecord = RecordInterface & {
  __typename: 'InternalLinkButtonRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  anchor?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  label?: Maybe<Scalars['String']['output']>;
  page?: Maybe<InternalLinkButtonModelPageField>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Block of type Internal Link Button (internal_link_button) */
export type InternalLinkButtonRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter by ID */
export type ItemIdFilter = {
  /** Search the record with the specified ID */
  eq?: InputMaybe<Scalars['ItemId']['input']>;
  /** Search records with the specified IDs */
  in?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
  /** Exclude the record with the specified ID */
  neq?: InputMaybe<Scalars['ItemId']['input']>;
  /** Search records that do not have the specified IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
};

export enum ItemStatus {
  draft = 'draft',
  published = 'published',
  updated = 'updated'
}

export type LegalPageModelContentBlocksField = AssetLinkButtonRecord | DataButtonRecord | ExternalLinkButtonRecord | IframeBlockRecord | ImageTeaserBlockRecord | InternalLinkButtonRecord;

export type LegalPageModelContentField = {
  __typename: 'LegalPageModelContentField';
  blocks: Array<LegalPageModelContentBlocksField>;
  links: Array<LegalPageModelContentLinksField>;
  value: Scalars['JsonField']['output'];
};

export type LegalPageModelContentFieldMultiLocaleField = {
  __typename: 'LegalPageModelContentFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<LegalPageModelContentField>;
};

export type LegalPageModelContentLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FileDownloadSectionRecord | FocusArticleRecord | HighlightSectionRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | TermsPageRecord;

export type LegalPageModelLeadField = {
  __typename: 'LegalPageModelLeadField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<LegalPageModelLeadLinksField>;
  value: Scalars['JsonField']['output'];
};

export type LegalPageModelLeadFieldMultiLocaleField = {
  __typename: 'LegalPageModelLeadFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<LegalPageModelLeadField>;
};

export type LegalPageModelLeadLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FocusArticleRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | TermsPageRecord;

/** Record of type 🧑‍⚖️ Legal Page (legal_page) */
export type LegalPageRecord = RecordInterface & {
  __typename: 'LegalPageRecord';
  _allContentLocales?: Maybe<Array<LegalPageModelContentFieldMultiLocaleField>>;
  _allLeadLocales?: Maybe<Array<LegalPageModelLeadFieldMultiLocaleField>>;
  _allSeoLocales?: Maybe<Array<SeoFieldMultiLocaleField>>;
  _allSlugLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  content?: Maybe<LegalPageModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  lead?: Maybe<LegalPageModelLeadField>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🧑‍⚖️ Legal Page (legal_page) */
export type LegalPageRecordAllContentLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Legal Page (legal_page) */
export type LegalPageRecordAllLeadLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Legal Page (legal_page) */
export type LegalPageRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Legal Page (legal_page) */
export type LegalPageRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Legal Page (legal_page) */
export type LegalPageRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Legal Page (legal_page) */
export type LegalPageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Legal Page (legal_page) */
export type LegalPageRecordContentArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Legal Page (legal_page) */
export type LegalPageRecordLeadArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Legal Page (legal_page) */
export type LegalPageRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Legal Page (legal_page) */
export type LegalPageRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Legal Page (legal_page) */
export type LegalPageRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter Single-link fields */
export type LinkFilter = {
  /** Search for records with an exact match. The specified value must be a Record ID */
  eq?: InputMaybe<Scalars['ItemId']['input']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records linked to one of the specified records */
  in?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
  /** Exclude records with an exact match. The specified value must be a Record ID */
  neq?: InputMaybe<Scalars['ItemId']['input']>;
  /** Filter records not linked to one of the specified records */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
};

/** Specifies how to filter Multiple-links fields */
export type LinksFilter = {
  /** Filter records linked to all of the specified records. The specified values must be Record IDs */
  allIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
  /** Filter records linked to at least one of the specified records. The specified values must be Record IDs */
  anyIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
  /** Search for records with an exact match. The specified values must be Record IDs */
  eq?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records not linked to any of the specified records. The specified values must be Record IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
};

/** Block of type Markdown (markdown_block) */
export type MarkdownBlockRecord = RecordInterface & {
  __typename: 'MarkdownBlockRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


/** Block of type Markdown (markdown_block) */
export type MarkdownBlockRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Block of type Markdown (markdown_block) */
export type MarkdownBlockRecordContentArgs = {
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MarketArticleModelContentBlocksField = AssetLinkButtonRecord | DataButtonRecord | ExternalLinkButtonRecord | IframeBlockRecord | ImageTeaserBlockRecord | InternalLinkButtonRecord;

export type MarketArticleModelContentField = {
  __typename: 'MarketArticleModelContentField';
  blocks: Array<MarketArticleModelContentBlocksField>;
  links: Array<MarketArticleModelContentLinksField>;
  value: Scalars['JsonField']['output'];
};

export type MarketArticleModelContentFieldMultiLocaleField = {
  __typename: 'MarketArticleModelContentFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<MarketArticleModelContentField>;
};

export type MarketArticleModelContentLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FileDownloadSectionRecord | FocusArticleRecord | HighlightSectionRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | PowerBiReportRecord | TermsPageRecord;

export type MarketArticleModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<MarketArticleModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<MarketArticleModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  content?: InputMaybe<StructuredTextFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  lead?: InputMaybe<StructuredTextFilter>;
  seo?: InputMaybe<SeoFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export type MarketArticleModelLeadField = {
  __typename: 'MarketArticleModelLeadField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<MarketArticleModelLeadLinksField>;
  value: Scalars['JsonField']['output'];
};

export type MarketArticleModelLeadFieldMultiLocaleField = {
  __typename: 'MarketArticleModelLeadFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<MarketArticleModelLeadField>;
};

export type MarketArticleModelLeadLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FocusArticleRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | TermsPageRecord;

export enum MarketArticleModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type 🐄 Market Article (market_article) */
export type MarketArticleRecord = RecordInterface & {
  __typename: 'MarketArticleRecord';
  _allContentLocales?: Maybe<Array<MarketArticleModelContentFieldMultiLocaleField>>;
  _allLeadLocales?: Maybe<Array<MarketArticleModelLeadFieldMultiLocaleField>>;
  _allSeoLocales?: Maybe<Array<SeoFieldMultiLocaleField>>;
  _allSlugLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  content?: Maybe<MarketArticleModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  lead?: Maybe<MarketArticleModelLeadField>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🐄 Market Article (market_article) */
export type MarketArticleRecordAllContentLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🐄 Market Article (market_article) */
export type MarketArticleRecordAllLeadLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🐄 Market Article (market_article) */
export type MarketArticleRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🐄 Market Article (market_article) */
export type MarketArticleRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🐄 Market Article (market_article) */
export type MarketArticleRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🐄 Market Article (market_article) */
export type MarketArticleRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🐄 Market Article (market_article) */
export type MarketArticleRecordContentArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🐄 Market Article (market_article) */
export type MarketArticleRecordLeadArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🐄 Market Article (market_article) */
export type MarketArticleRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🐄 Market Article (market_article) */
export type MarketArticleRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🐄 Market Article (market_article) */
export type MarketArticleRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type 🐐 Markets (market) */
export type MarketRecord = RecordInterface & {
  __typename: 'MarketRecord';
  _allSlugLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🐐 Markets (market) */
export type MarketRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🐐 Markets (market) */
export type MarketRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🐐 Markets (market) */
export type MarketRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type MethodsPageModelContentBlocksField = AssetLinkButtonRecord | DataButtonRecord | ExternalLinkButtonRecord | IframeBlockRecord | ImageTeaserBlockRecord | InternalLinkButtonRecord;

export type MethodsPageModelContentField = {
  __typename: 'MethodsPageModelContentField';
  blocks: Array<MethodsPageModelContentBlocksField>;
  links: Array<MethodsPageModelContentLinksField>;
  value: Scalars['JsonField']['output'];
};

export type MethodsPageModelContentFieldMultiLocaleField = {
  __typename: 'MethodsPageModelContentFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<MethodsPageModelContentField>;
};

export type MethodsPageModelContentLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FileDownloadSectionRecord | FocusArticleRecord | HighlightSectionRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | PowerBiReportRecord | TermsPageRecord;

export type MethodsPageModelLeadField = {
  __typename: 'MethodsPageModelLeadField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<MethodsPageModelLeadLinksField>;
  value: Scalars['JsonField']['output'];
};

export type MethodsPageModelLeadFieldMultiLocaleField = {
  __typename: 'MethodsPageModelLeadFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<MethodsPageModelLeadField>;
};

export type MethodsPageModelLeadLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FocusArticleRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | TermsPageRecord;

/** Record of type 🧪 Methods Page (methods_page) */
export type MethodsPageRecord = RecordInterface & {
  __typename: 'MethodsPageRecord';
  _allContentLocales?: Maybe<Array<MethodsPageModelContentFieldMultiLocaleField>>;
  _allLeadLocales?: Maybe<Array<MethodsPageModelLeadFieldMultiLocaleField>>;
  _allSeoLocales?: Maybe<Array<SeoFieldMultiLocaleField>>;
  _allSlugLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  content?: Maybe<MethodsPageModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  lead?: Maybe<MethodsPageModelLeadField>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🧪 Methods Page (methods_page) */
export type MethodsPageRecordAllContentLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧪 Methods Page (methods_page) */
export type MethodsPageRecordAllLeadLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧪 Methods Page (methods_page) */
export type MethodsPageRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧪 Methods Page (methods_page) */
export type MethodsPageRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧪 Methods Page (methods_page) */
export type MethodsPageRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧪 Methods Page (methods_page) */
export type MethodsPageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧪 Methods Page (methods_page) */
export type MethodsPageRecordContentArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧪 Methods Page (methods_page) */
export type MethodsPageRecordLeadArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧪 Methods Page (methods_page) */
export type MethodsPageRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧪 Methods Page (methods_page) */
export type MethodsPageRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧪 Methods Page (methods_page) */
export type MethodsPageRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export enum MuxThumbnailFormatType {
  gif = 'gif',
  jpg = 'jpg',
  png = 'png'
}

/** Specifies how to filter by image orientation */
export type OrientationFilter = {
  /** Search uploads with the specified orientation */
  eq?: InputMaybe<UploadOrientation>;
  /** Exclude uploads with the specified orientation */
  neq?: InputMaybe<UploadOrientation>;
};

export type PersonModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<PersonModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PersonModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<ItemIdFilter>;
  lastName?: InputMaybe<StringFilter>;
  portrait?: InputMaybe<FileFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum PersonModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  email_ASC = 'email_ASC',
  email_DESC = 'email_DESC',
  firstName_ASC = 'firstName_ASC',
  firstName_DESC = 'firstName_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  lastName_ASC = 'lastName_ASC',
  lastName_DESC = 'lastName_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type 🧑Person (person) */
export type PersonRecord = RecordInterface & {
  __typename: 'PersonRecord';
  _allFirstNameLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allLastNameLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ItemId']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  portrait?: Maybe<FileField>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🧑Person (person) */
export type PersonRecordAllFirstNameLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑Person (person) */
export type PersonRecordAllLastNameLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑Person (person) */
export type PersonRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑Person (person) */
export type PersonRecordFirstNameArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑Person (person) */
export type PersonRecordLastNameArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type PowerBiDatasetModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<PowerBiDatasetModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PowerBiDatasetModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  datasetId?: InputMaybe<StringFilter>;
  id?: InputMaybe<ItemIdFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
  workspace?: InputMaybe<LinkFilter>;
};

export enum PowerBiDatasetModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  datasetId_ASC = 'datasetId_ASC',
  datasetId_DESC = 'datasetId_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type 🗃️ Power BI Dataset (power_bi_dataset) */
export type PowerBiDatasetRecord = RecordInterface & {
  __typename: 'PowerBiDatasetRecord';
  _allDatasetIdLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  datasetId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ItemId']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  workspace?: Maybe<PowerBiWorkspaceRecord>;
};


/** Record of type 🗃️ Power BI Dataset (power_bi_dataset) */
export type PowerBiDatasetRecordAllDatasetIdLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗃️ Power BI Dataset (power_bi_dataset) */
export type PowerBiDatasetRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗃️ Power BI Dataset (power_bi_dataset) */
export type PowerBiDatasetRecordDatasetIdArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type PowerBiPageModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<PowerBiPageModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PowerBiPageModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  datocmsName?: InputMaybe<StringFilter>;
  id?: InputMaybe<ItemIdFilter>;
  name?: InputMaybe<StringFilter>;
  pageId?: InputMaybe<StringFilter>;
  report?: InputMaybe<LinkFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum PowerBiPageModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  datocmsName_ASC = 'datocmsName_ASC',
  datocmsName_DESC = 'datocmsName_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
  pageId_ASC = 'pageId_ASC',
  pageId_DESC = 'pageId_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type 🗒️ Power BI Page (power_bi_page) */
export type PowerBiPageRecord = RecordInterface & {
  __typename: 'PowerBiPageRecord';
  _allNameLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  datocmsName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ItemId']['output'];
  name?: Maybe<Scalars['String']['output']>;
  pageId?: Maybe<Scalars['String']['output']>;
  report?: Maybe<PowerBiReportRecord>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🗒️ Power BI Page (power_bi_page) */
export type PowerBiPageRecordAllNameLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗒️ Power BI Page (power_bi_page) */
export type PowerBiPageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗒️ Power BI Page (power_bi_page) */
export type PowerBiPageRecordNameArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type PowerBiReportModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<PowerBiReportModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PowerBiReportModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  dataset?: InputMaybe<LinkFilter>;
  id?: InputMaybe<ItemIdFilter>;
  name?: InputMaybe<StringFilter>;
  pages?: InputMaybe<LinksFilter>;
  reportId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
  workspace?: InputMaybe<LinkFilter>;
};

export enum PowerBiReportModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
  reportId_ASC = 'reportId_ASC',
  reportId_DESC = 'reportId_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Block of type Power BI Report Page (power_bi_report_page) */
export type PowerBiReportPageRecord = RecordInterface & {
  __typename: 'PowerBiReportPageRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  name?: Maybe<Scalars['String']['output']>;
  pageId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Block of type Power BI Report Page (power_bi_report_page) */
export type PowerBiReportPageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type 🗂️ Power BI Report (power_bi_report) */
export type PowerBiReportRecord = RecordInterface & {
  __typename: 'PowerBiReportRecord';
  _allReportIdLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  dataset?: Maybe<PowerBiDatasetRecord>;
  id: Scalars['ItemId']['output'];
  name?: Maybe<Scalars['String']['output']>;
  pages: Array<PowerBiPageRecord>;
  reportId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  workspace?: Maybe<PowerBiWorkspaceRecord>;
};


/** Record of type 🗂️ Power BI Report (power_bi_report) */
export type PowerBiReportRecordAllReportIdLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ Power BI Report (power_bi_report) */
export type PowerBiReportRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ Power BI Report (power_bi_report) */
export type PowerBiReportRecordReportIdArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type PowerBiWorkspaceModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<PowerBiWorkspaceModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PowerBiWorkspaceModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
  workspaceId?: InputMaybe<StringFilter>;
};

export enum PowerBiWorkspaceModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',
  workspaceId_ASC = 'workspaceId_ASC',
  workspaceId_DESC = 'workspaceId_DESC'
}

/** Record of type 🏡 Power BI Workspace (power_bi_workspace) */
export type PowerBiWorkspaceRecord = RecordInterface & {
  __typename: 'PowerBiWorkspaceRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  workspaceId?: Maybe<Scalars['String']['output']>;
};


/** Record of type 🏡 Power BI Workspace (power_bi_workspace) */
export type PowerBiWorkspaceRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter by publication datetime */
export type PublishedAtFilter = {
  /** Filter records with a value that's within the specified minute range. Seconds and milliseconds are truncated from the argument. */
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

/** The query root for this schema */
export type Query = {
  __typename: 'Query';
  /** Returns meta information regarding a record collection */
  _allBlogPostsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allFileDownloadItemsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allFileDownloadSectionsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allFocusArticlesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allHighlightSectionFilesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allHighlightSectionLinksMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allHighlightSectionsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allMarketArticlesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allPeopleMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allPowerBiDatasetsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allPowerBiPagesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allPowerBiReportsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allPowerBiWorkspacesMeta: CollectionMetadata;
  /** Returns meta information regarding an assets collection */
  _allUploadsMeta: CollectionMetadata;
  /** Returns the single instance record */
  _site: Site;
  /** Returns a collection of records */
  allBlogPosts: Array<BlogPostRecord>;
  /** Returns a collection of records */
  allFileDownloadItems: Array<FileDownloadItemRecord>;
  /** Returns a collection of records */
  allFileDownloadSections: Array<FileDownloadSectionRecord>;
  /** Returns a collection of records */
  allFocusArticles: Array<FocusArticleRecord>;
  /** Returns a collection of records */
  allHighlightSectionFiles: Array<HighlightSectionFileRecord>;
  /** Returns a collection of records */
  allHighlightSectionLinks: Array<HighlightSectionLinkRecord>;
  /** Returns a collection of records */
  allHighlightSections: Array<HighlightSectionRecord>;
  /** Returns a collection of records */
  allMarketArticles: Array<MarketArticleRecord>;
  /** Returns a collection of records */
  allPeople: Array<PersonRecord>;
  /** Returns a collection of records */
  allPowerBiDatasets: Array<PowerBiDatasetRecord>;
  /** Returns a collection of records */
  allPowerBiPages: Array<PowerBiPageRecord>;
  /** Returns a collection of records */
  allPowerBiReports: Array<PowerBiReportRecord>;
  /** Returns a collection of records */
  allPowerBiWorkspaces: Array<PowerBiWorkspaceRecord>;
  /** Returns a collection of assets */
  allUploads: Array<FileField>;
  /** Returns the single instance record */
  analysisPage?: Maybe<AnalysisPageRecord>;
  /** Returns a specific record */
  blogPost?: Maybe<BlogPostRecord>;
  /** Returns the single instance record */
  cookieBanner?: Maybe<CookieBannerRecord>;
  /** Returns the single instance record */
  dataPage?: Maybe<DataPageRecord>;
  /** Returns a specific record */
  fileDownloadItem?: Maybe<FileDownloadItemRecord>;
  /** Returns a specific record */
  fileDownloadSection?: Maybe<FileDownloadSectionRecord>;
  /** Returns a specific record */
  focusArticle?: Maybe<FocusArticleRecord>;
  /** Returns the single instance record */
  focusModel?: Maybe<FocusModelRecord>;
  /** Returns a specific record */
  highlightSection?: Maybe<HighlightSectionRecord>;
  /** Returns a specific record */
  highlightSectionFile?: Maybe<HighlightSectionFileRecord>;
  /** Returns a specific record */
  highlightSectionLink?: Maybe<HighlightSectionLinkRecord>;
  /** Returns the single instance record */
  homePage?: Maybe<HomePageRecord>;
  /** Returns the single instance record */
  infoPage?: Maybe<InfoPageRecord>;
  /** Returns the single instance record */
  legalPage?: Maybe<LegalPageRecord>;
  /** Returns the single instance record */
  market?: Maybe<MarketRecord>;
  /** Returns a specific record */
  marketArticle?: Maybe<MarketArticleRecord>;
  /** Returns the single instance record */
  methodsPage?: Maybe<MethodsPageRecord>;
  /** Returns a specific record */
  person?: Maybe<PersonRecord>;
  /** Returns a specific record */
  powerBiDataset?: Maybe<PowerBiDatasetRecord>;
  /** Returns a specific record */
  powerBiPage?: Maybe<PowerBiPageRecord>;
  /** Returns a specific record */
  powerBiReport?: Maybe<PowerBiReportRecord>;
  /** Returns a specific record */
  powerBiWorkspace?: Maybe<PowerBiWorkspaceRecord>;
  /** Returns the single instance record */
  termsPage?: Maybe<TermsPageRecord>;
  /** Returns a specific asset */
  upload?: Maybe<FileField>;
};


/** The query root for this schema */
export type QueryAllBlogPostsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<BlogPostModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllFileDownloadItemsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<FileDownloadItemModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllFileDownloadSectionsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<FileDownloadSectionModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllFocusArticlesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<FocusArticleModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllHighlightSectionFilesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<HighlightSectionFileModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllHighlightSectionLinksMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<HighlightSectionLinkModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllHighlightSectionsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<HighlightSectionModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllMarketArticlesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MarketArticleModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllPeopleMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PersonModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllPowerBiDatasetsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiDatasetModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllPowerBiPagesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiPageModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllPowerBiReportsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiReportModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllPowerBiWorkspacesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiWorkspaceModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllUploadsMetaArgs = {
  filter?: InputMaybe<UploadFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QuerySiteArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllBlogPostsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<BlogPostModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<BlogPostModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllFileDownloadItemsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<FileDownloadItemModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<FileDownloadItemModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllFileDownloadSectionsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<FileDownloadSectionModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<FileDownloadSectionModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllFocusArticlesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<FocusArticleModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<FocusArticleModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllHighlightSectionFilesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<HighlightSectionFileModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<HighlightSectionFileModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllHighlightSectionLinksArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<HighlightSectionLinkModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<HighlightSectionLinkModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllHighlightSectionsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<HighlightSectionModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<HighlightSectionModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllMarketArticlesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MarketArticleModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<MarketArticleModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllPeopleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PersonModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PersonModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllPowerBiDatasetsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiDatasetModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PowerBiDatasetModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllPowerBiPagesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiPageModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PowerBiPageModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllPowerBiReportsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiReportModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PowerBiReportModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllPowerBiWorkspacesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiWorkspaceModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PowerBiWorkspaceModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllUploadsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<UploadFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<UploadOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAnalysisPageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryBlogPostArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<BlogPostModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<BlogPostModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryCookieBannerArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryDataPageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryFileDownloadItemArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<FileDownloadItemModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<FileDownloadItemModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryFileDownloadSectionArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<FileDownloadSectionModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<FileDownloadSectionModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryFocusArticleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<FocusArticleModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<FocusArticleModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryFocusModelArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryHighlightSectionArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<HighlightSectionModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<HighlightSectionModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryHighlightSectionFileArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<HighlightSectionFileModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<HighlightSectionFileModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryHighlightSectionLinkArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<HighlightSectionLinkModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<HighlightSectionLinkModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryHomePageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryInfoPageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryLegalPageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryMarketArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryMarketArticleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MarketArticleModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<MarketArticleModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryMethodsPageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryPersonArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PersonModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PersonModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryPowerBiDatasetArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiDatasetModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PowerBiDatasetModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryPowerBiPageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiPageModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PowerBiPageModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryPowerBiReportArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiReportModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PowerBiReportModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryPowerBiWorkspaceArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiWorkspaceModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PowerBiWorkspaceModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryTermsPageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryUploadArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<UploadFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<UploadOrderBy>>>;
};

export type RecordInterface = {
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
};


export type RecordInterfaceSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter by upload type */
export type ResolutionFilter = {
  /** Search uploads with the specified resolution */
  eq?: InputMaybe<ResolutionType>;
  /** Search uploads with the specified resolutions */
  in?: InputMaybe<Array<InputMaybe<ResolutionType>>>;
  /** Exclude uploads with the specified resolution */
  neq?: InputMaybe<ResolutionType>;
  /** Search uploads without the specified resolutions */
  notIn?: InputMaybe<Array<InputMaybe<ResolutionType>>>;
};

export enum ResolutionType {
  icon = 'icon',
  large = 'large',
  medium = 'medium',
  small = 'small'
}

export type ResponsiveImage = {
  __typename: 'ResponsiveImage';
  alt?: Maybe<Scalars['String']['output']>;
  aspectRatio: Scalars['FloatType']['output'];
  base64?: Maybe<Scalars['String']['output']>;
  bgColor?: Maybe<Scalars['String']['output']>;
  height: Scalars['IntType']['output'];
  sizes: Scalars['String']['output'];
  src: Scalars['String']['output'];
  srcSet: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  webpSrcSet: Scalars['String']['output'];
  width: Scalars['IntType']['output'];
};

export type SeoField = {
  __typename: 'SeoField';
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<FileField>;
  noIndex?: Maybe<Scalars['BooleanType']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  twitterCard?: Maybe<Scalars['String']['output']>;
};

export type SeoFieldMultiLocaleField = {
  __typename: 'SeoFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<SeoField>;
};

/** Specifies how to filter SEO meta tags fields */
export type SeoFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
};

export type Site = {
  __typename: 'Site';
  favicon?: Maybe<FileField>;
  faviconMetaTags: Array<Tag>;
  globalSeo?: Maybe<GlobalSeoField>;
  locales: Array<SiteLocale>;
  noIndex?: Maybe<Scalars['BooleanType']['output']>;
};


export type SiteFaviconMetaTagsArgs = {
  variants?: InputMaybe<Array<InputMaybe<FaviconType>>>;
};


export type SiteGlobalSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export enum SiteLocale {
  de = 'de',
  fr = 'fr',
  it = 'it'
}

/** Specifies how to filter Slug fields */
export type SlugFilter = {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Filter records that have one of the specified slugs */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Filter records that do have one of the specified slugs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Specifies how to filter by status */
export type StatusFilter = {
  /** Search the record with the specified status */
  eq?: InputMaybe<ItemStatus>;
  /** Search records with the specified statuses */
  in?: InputMaybe<Array<InputMaybe<ItemStatus>>>;
  /** Exclude the record with the specified status */
  neq?: InputMaybe<ItemStatus>;
  /** Search records without the specified statuses */
  notIn?: InputMaybe<Array<InputMaybe<ItemStatus>>>;
};

/** Specifies how to filter Single-line string fields */
export type StringFilter = {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Filter records with the specified field defined (i.e. with any value) or not [DEPRECATED] */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records that equal one of the specified values */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter records with the specified field set as blank (null or empty string) */
  isBlank?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with the specified field present (neither null, nor empty string) */
  isPresent?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Filter records that do not equal one of the specified values */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude records based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

export type StringMatchesFilter = {
  caseSensitive?: InputMaybe<Scalars['BooleanType']['input']>;
  pattern: Scalars['String']['input'];
  regexp?: InputMaybe<Scalars['BooleanType']['input']>;
};

export type StringMultiLocaleField = {
  __typename: 'StringMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<Scalars['String']['output']>;
};

/** Specifies how to filter Structured Text fields values */
export type StructuredTextFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not [DEPRECATED] */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with the specified field set as blank (null or single empty paragraph) */
  isBlank?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with the specified field present (neither null, nor empty string) */
  isPresent?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude records based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Block of type Survey Answer (survey_answer) */
export type SurveyAnswerRecord = RecordInterface & {
  __typename: 'SurveyAnswerRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  answer?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


/** Block of type Survey Answer (survey_answer) */
export type SurveyAnswerRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Block of type Survey (survey_block) */
export type SurveyBlockRecord = RecordInterface & {
  __typename: 'SurveyBlockRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  formUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ItemId']['output'];
  question: Array<SurveyQuestionRecord>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Block of type Survey (survey_block) */
export type SurveyBlockRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Block of type Survey Question (survey_question) */
export type SurveyQuestionRecord = RecordInterface & {
  __typename: 'SurveyQuestionRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  formFieldId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ItemId']['output'];
  isMultipleChoice?: Maybe<Scalars['BooleanType']['output']>;
  possibleAnswers: Array<SurveyAnswerRecord>;
  question?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Block of type Survey Question (survey_question) */
export type SurveyQuestionRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

export type Tag = {
  __typename: 'Tag';
  attributes?: Maybe<Scalars['MetaTagAttributes']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  tag: Scalars['String']['output'];
};

export type TermsPageModelContentBlocksField = AssetLinkButtonRecord | DataButtonRecord | ExternalLinkButtonRecord | IframeBlockRecord | ImageTeaserBlockRecord | InternalLinkButtonRecord;

export type TermsPageModelContentField = {
  __typename: 'TermsPageModelContentField';
  blocks: Array<TermsPageModelContentBlocksField>;
  links: Array<TermsPageModelContentLinksField>;
  value: Scalars['JsonField']['output'];
};

export type TermsPageModelContentFieldMultiLocaleField = {
  __typename: 'TermsPageModelContentFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<TermsPageModelContentField>;
};

export type TermsPageModelContentLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FileDownloadSectionRecord | FocusArticleRecord | HighlightSectionRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | TermsPageRecord;

export type TermsPageModelLeadField = {
  __typename: 'TermsPageModelLeadField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<TermsPageModelLeadLinksField>;
  value: Scalars['JsonField']['output'];
};

export type TermsPageModelLeadFieldMultiLocaleField = {
  __typename: 'TermsPageModelLeadFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<TermsPageModelLeadField>;
};

export type TermsPageModelLeadLinksField = AnalysisPageRecord | BlogPostRecord | DataPageRecord | FocusArticleRecord | HomePageRecord | InfoPageRecord | LegalPageRecord | MarketArticleRecord | MethodsPageRecord | PowerBiPageRecord | TermsPageRecord;

/** Record of type 🧑‍⚖️ Terms and Conditions Page (terms_page) */
export type TermsPageRecord = RecordInterface & {
  __typename: 'TermsPageRecord';
  _allContentLocales?: Maybe<Array<TermsPageModelContentFieldMultiLocaleField>>;
  _allLeadLocales?: Maybe<Array<TermsPageModelLeadFieldMultiLocaleField>>;
  _allSeoLocales?: Maybe<Array<SeoFieldMultiLocaleField>>;
  _allSlugLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl?: Maybe<Scalars['String']['output']>;
  _firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  content?: Maybe<TermsPageModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  lead?: Maybe<TermsPageModelLeadField>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🧑‍⚖️ Terms and Conditions Page (terms_page) */
export type TermsPageRecordAllContentLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Terms and Conditions Page (terms_page) */
export type TermsPageRecordAllLeadLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Terms and Conditions Page (terms_page) */
export type TermsPageRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Terms and Conditions Page (terms_page) */
export type TermsPageRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Terms and Conditions Page (terms_page) */
export type TermsPageRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Terms and Conditions Page (terms_page) */
export type TermsPageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Terms and Conditions Page (terms_page) */
export type TermsPageRecordContentArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Terms and Conditions Page (terms_page) */
export type TermsPageRecordLeadArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Terms and Conditions Page (terms_page) */
export type TermsPageRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Terms and Conditions Page (terms_page) */
export type TermsPageRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🧑‍⚖️ Terms and Conditions Page (terms_page) */
export type TermsPageRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter text fields */
export type TextFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not [DEPRECATED] */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with the specified field set as blank (null or empty string) */
  isBlank?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with the specified field present (neither null, nor empty string) */
  isPresent?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude records based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by upload type */
export type TypeFilter = {
  /** Search uploads with the specified type */
  eq?: InputMaybe<UploadType>;
  /** Search uploads with the specified types */
  in?: InputMaybe<Array<InputMaybe<UploadType>>>;
  /** Exclude uploads with the specified type */
  neq?: InputMaybe<UploadType>;
  /** Search uploads without the specified types */
  notIn?: InputMaybe<Array<InputMaybe<UploadType>>>;
};

/** Specifies how to filter by update datetime */
export type UpdatedAtFilter = {
  /** Filter records with a value that's within the specified minute range. Seconds and milliseconds are truncated from the argument. */
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Specifies how to filter by default alt */
export type UploadAltFilter = {
  /** Search the uploads with the specified alt */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Filter uploads with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Search uploads with the specified values as default alt */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the uploads with the specified alt */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Search uploads that do not have the specified values as default alt */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by auhtor */
export type UploadAuthorFilter = {
  /** Filter uploads with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by basename */
export type UploadBasenameFilter = {
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by colors */
export type UploadColorsFilter = {
  /** Filter uploads that have all of the specified colors */
  allIn?: InputMaybe<Array<InputMaybe<ColorBucketType>>>;
  /** Filter uploads that have at least one of the specified colors */
  anyIn?: InputMaybe<Array<InputMaybe<ColorBucketType>>>;
  /** Filter uploads that have the specified colors */
  contains?: InputMaybe<ColorBucketType>;
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Array<InputMaybe<ColorBucketType>>>;
  /** Filter uploads that do not have any of the specified colors */
  notIn?: InputMaybe<Array<InputMaybe<ColorBucketType>>>;
};

/** Specifies how to filter by copyright */
export type UploadCopyrightFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by creation datetime */
export type UploadCreatedAtFilter = {
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Exclude uploads with an exact match */
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Specifies how to filter by filename */
export type UploadFilenameFilter = {
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

export type UploadFilter = {
  AND?: InputMaybe<Array<InputMaybe<UploadFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<UploadFilter>>>;
  _createdAt?: InputMaybe<UploadCreatedAtFilter>;
  _updatedAt?: InputMaybe<UploadUpdatedAtFilter>;
  alt?: InputMaybe<UploadAltFilter>;
  author?: InputMaybe<UploadAuthorFilter>;
  basename?: InputMaybe<UploadBasenameFilter>;
  colors?: InputMaybe<UploadColorsFilter>;
  copyright?: InputMaybe<UploadCopyrightFilter>;
  filename?: InputMaybe<UploadFilenameFilter>;
  format?: InputMaybe<UploadFormatFilter>;
  height?: InputMaybe<UploadHeightFilter>;
  id?: InputMaybe<UploadIdFilter>;
  inUse?: InputMaybe<InUseFilter>;
  md5?: InputMaybe<UploadMd5Filter>;
  mimeType?: InputMaybe<UploadMimeTypeFilter>;
  notes?: InputMaybe<UploadNotesFilter>;
  orientation?: InputMaybe<OrientationFilter>;
  resolution?: InputMaybe<ResolutionFilter>;
  size?: InputMaybe<UploadSizeFilter>;
  smartTags?: InputMaybe<UploadTagsFilter>;
  tags?: InputMaybe<UploadTagsFilter>;
  title?: InputMaybe<UploadTitleFilter>;
  type?: InputMaybe<TypeFilter>;
  width?: InputMaybe<UploadWidthFilter>;
};

/** Specifies how to filter by format */
export type UploadFormatFilter = {
  /** Search the asset with the specified format */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Search assets with the specified formats */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude the asset with the specified format */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Search assets that do not have the specified formats */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Specifies how to filter by height */
export type UploadHeightFilter = {
  /** Search assets with the specified height */
  eq?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger than the specified height */
  gt?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger or equal to the specified height */
  gte?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets smaller than the specified height */
  lt?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger or equal to the specified height */
  lte?: InputMaybe<Scalars['IntType']['input']>;
  /** Search assets that do not have the specified height */
  neq?: InputMaybe<Scalars['IntType']['input']>;
};

/** Specifies how to filter by ID */
export type UploadIdFilter = {
  /** Search the asset with the specified ID */
  eq?: InputMaybe<Scalars['UploadId']['input']>;
  /** Search assets with the specified IDs */
  in?: InputMaybe<Array<InputMaybe<Scalars['UploadId']['input']>>>;
  /** Exclude the asset with the specified ID */
  neq?: InputMaybe<Scalars['UploadId']['input']>;
  /** Search assets that do not have the specified IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['UploadId']['input']>>>;
};

/** Specifies how to filter by MD5 */
export type UploadMd5Filter = {
  /** Search the asset with the specified MD5 */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Search assets with the specified MD5s */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude the asset with the specified MD5 */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Search assets that do not have the specified MD5s */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Specifies how to filter by mime type */
export type UploadMimeTypeFilter = {
  /** Search the asset with the specified mime type */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Search assets with the specified mime types */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the asset with the specified mime type */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Search assets that do not have the specified mime types */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by notes */
export type UploadNotesFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

export enum UploadOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  basename_ASC = 'basename_ASC',
  basename_DESC = 'basename_DESC',
  filename_ASC = 'filename_ASC',
  filename_DESC = 'filename_DESC',
  format_ASC = 'format_ASC',
  format_DESC = 'format_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  mimeType_ASC = 'mimeType_ASC',
  mimeType_DESC = 'mimeType_DESC',
  resolution_ASC = 'resolution_ASC',
  resolution_DESC = 'resolution_DESC',
  size_ASC = 'size_ASC',
  size_DESC = 'size_DESC'
}

export enum UploadOrientation {
  landscape = 'landscape',
  portrait = 'portrait',
  square = 'square'
}

/** Specifies how to filter by size */
export type UploadSizeFilter = {
  /** Search assets with the specified size (in bytes) */
  eq?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger than the specified size (in bytes) */
  gt?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger or equal to the specified size (in bytes) */
  gte?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets smaller than the specified size (in bytes) */
  lt?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger or equal to the specified size (in bytes) */
  lte?: InputMaybe<Scalars['IntType']['input']>;
  /** Search assets that do not have the specified size (in bytes) */
  neq?: InputMaybe<Scalars['IntType']['input']>;
};

/** Specifies how to filter by tags */
export type UploadTagsFilter = {
  /** Filter uploads linked to all of the specified tags */
  allIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter uploads linked to at least one of the specified tags */
  anyIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter uploads linked to the specified tag */
  contains?: InputMaybe<Scalars['String']['input']>;
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter uploads not linked to any of the specified tags */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Specifies how to filter by default title */
export type UploadTitleFilter = {
  /** Search the asset with the specified title */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Filter assets with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Search assets with the specified as default title */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the asset with the specified title */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Search assets that do not have the specified as default title */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

export enum UploadType {
  archive = 'archive',
  audio = 'audio',
  image = 'image',
  pdfdocument = 'pdfdocument',
  presentation = 'presentation',
  richtext = 'richtext',
  spreadsheet = 'spreadsheet',
  video = 'video'
}

/** Specifies how to filter by update datetime */
export type UploadUpdatedAtFilter = {
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Exclude uploads with an exact match */
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UploadVideoField = {
  __typename: 'UploadVideoField';
  alt?: Maybe<Scalars['String']['output']>;
  blurUpThumb?: Maybe<Scalars['String']['output']>;
  blurhash?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  framerate?: Maybe<Scalars['Int']['output']>;
  height: Scalars['IntType']['output'];
  mp4Url?: Maybe<Scalars['String']['output']>;
  muxAssetId: Scalars['String']['output'];
  muxPlaybackId: Scalars['String']['output'];
  streamingUrl: Scalars['String']['output'];
  thumbhash?: Maybe<Scalars['String']['output']>;
  thumbnailUrl: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  width: Scalars['IntType']['output'];
};


export type UploadVideoFieldAltArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type UploadVideoFieldBlurUpThumbArgs = {
  imgixParams?: InputMaybe<ImgixParams>;
  punch?: Scalars['Float']['input'];
  quality?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
};


export type UploadVideoFieldMp4UrlArgs = {
  exactRes?: InputMaybe<VideoMp4Res>;
  res?: InputMaybe<VideoMp4Res>;
};


export type UploadVideoFieldThumbnailUrlArgs = {
  format?: InputMaybe<MuxThumbnailFormatType>;
};


export type UploadVideoFieldTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter by width */
export type UploadWidthFilter = {
  /** Search assets with the specified width */
  eq?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger than the specified width */
  gt?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger or equal to the specified width */
  gte?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets smaller than the specified width */
  lt?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger or equal to the specified width */
  lte?: InputMaybe<Scalars['IntType']['input']>;
  /** Search assets that do not have the specified width */
  neq?: InputMaybe<Scalars['IntType']['input']>;
};

export type VideoField = {
  __typename: 'VideoField';
  height: Scalars['IntType']['output'];
  provider: Scalars['String']['output'];
  providerUid: Scalars['String']['output'];
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
  width: Scalars['IntType']['output'];
};

export enum VideoMp4Res {
  high = 'high',
  low = 'low',
  medium = 'medium'
}

export type FocalPoint = {
  __typename: 'focalPoint';
  x: Scalars['FloatType']['output'];
  y: Scalars['FloatType']['output'];
};

export type HomePageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type HomePageQuery = { __typename: 'Query', homePage?: { __typename: 'HomePageRecord', id: any, title?: string | null, lead?: { __typename: 'HomePageModelLeadField', value: any, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any }> } | null, hero?: { __typename: 'FileField', id: any, url: string } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> } | null, site: { __typename: 'Site', favicon: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> }, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, topBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, leadCard?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }> };

export type DataPageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type DataPageQuery = { __typename: 'Query', dataPage?: { __typename: 'DataPageRecord', _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null, seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> } | null, site: { __typename: 'Site', favicon: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> }, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> };

export type LegalPageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type LegalPageQuery = { __typename: 'Query', legalPage?: { __typename: 'LegalPageRecord', id: any, title?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null, lead?: { __typename: 'LegalPageModelLeadField', value: any, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any }> } | null, content?: { __typename: 'LegalPageModelContentField', value: any, blocks: Array<{ __typename: 'AssetLinkButtonRecord', id: any, label?: string | null, asset?: { __typename: 'FileField', url: string } | null } | { __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ExternalLinkButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'IframeBlockRecord' } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, title?: string | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null } | { __typename: 'InternalLinkButtonRecord', id: any, label?: string | null, anchor?: string | null, page?: { __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any } | null }>, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FileDownloadSectionRecord', id: any, title?: string | null, fileDownloadItems: Array<{ __typename: 'FileDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string, filename: string } | null }> } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any }> } | null, seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> } | null, site: { __typename: 'Site', favicon: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> }, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> };

export type TermsPageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type TermsPageQuery = { __typename: 'Query', termsPage?: { __typename: 'TermsPageRecord', title?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null, lead?: { __typename: 'TermsPageModelLeadField', value: any, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any }> } | null, content?: { __typename: 'TermsPageModelContentField', value: any, blocks: Array<{ __typename: 'AssetLinkButtonRecord', id: any, label?: string | null, asset?: { __typename: 'FileField', url: string } | null } | { __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ExternalLinkButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'IframeBlockRecord' } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, title?: string | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null } | { __typename: 'InternalLinkButtonRecord', id: any, label?: string | null, anchor?: string | null, page?: { __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any } | null }>, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FileDownloadSectionRecord', id: any, title?: string | null, fileDownloadItems: Array<{ __typename: 'FileDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string, filename: string } | null }> } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any }> } | null, seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> } | null, site: { __typename: 'Site', favicon: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> }, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> };

export type MarketPageQueryVariables = Exact<{
  locale: SiteLocale;
  slug: Scalars['String']['input'];
}>;


export type MarketPageQuery = { __typename: 'Query', marketArticle?: { __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null, seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }>, lead?: { __typename: 'MarketArticleModelLeadField', value: any, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any }> } | null, content?: { __typename: 'MarketArticleModelContentField', value: any, blocks: Array<{ __typename: 'AssetLinkButtonRecord', id: any, label?: string | null, asset?: { __typename: 'FileField', url: string } | null } | { __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ExternalLinkButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'IframeBlockRecord' } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, title?: string | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null } | { __typename: 'InternalLinkButtonRecord', id: any, label?: string | null, anchor?: string | null, page?: { __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any } | null }>, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FileDownloadSectionRecord', id: any, title?: string | null, fileDownloadItems: Array<{ __typename: 'FileDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string, filename: string } | null }> } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null, pages: Array<{ __typename: 'PowerBiPageRecord', name?: string | null, id: any, pageId?: string | null }> } | { __typename: 'TermsPageRecord', id: any }> } | null } | null, site: { __typename: 'Site', favicon: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> }, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, topBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, leadCard?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }> };

export type FocusArticlePageQueryVariables = Exact<{
  locale: SiteLocale;
  slug: Scalars['String']['input'];
}>;


export type FocusArticlePageQuery = { __typename: 'Query', focusArticle?: { __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null, seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }>, lead?: { __typename: 'FocusArticleModelLeadField', value: any, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any }> } | null, content?: { __typename: 'FocusArticleModelContentField', value: any, blocks: Array<{ __typename: 'AssetLinkButtonRecord', id: any, label?: string | null, asset?: { __typename: 'FileField', url: string } | null } | { __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ExternalLinkButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'IframeBlockRecord' } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, title?: string | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null } | { __typename: 'InternalLinkButtonRecord', id: any, label?: string | null, anchor?: string | null, page?: { __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any } | null }>, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FileDownloadSectionRecord', id: any, title?: string | null, fileDownloadItems: Array<{ __typename: 'FileDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string, filename: string } | null }> } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null, pages: Array<{ __typename: 'PowerBiPageRecord', name?: string | null, id: any, pageId?: string | null }> } | { __typename: 'TermsPageRecord', id: any }> } | null } | null, site: { __typename: 'Site', favicon: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> }, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, topBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, leadCard?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }> };

export type MethodsPageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type MethodsPageQuery = { __typename: 'Query', methodsPage?: { __typename: 'MethodsPageRecord', id: any, title?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null, lead?: { __typename: 'MethodsPageModelLeadField', value: any, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any }> } | null, content?: { __typename: 'MethodsPageModelContentField', value: any, blocks: Array<{ __typename: 'AssetLinkButtonRecord', id: any, label?: string | null, asset?: { __typename: 'FileField', url: string } | null } | { __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ExternalLinkButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'IframeBlockRecord' } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, title?: string | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null } | { __typename: 'InternalLinkButtonRecord', id: any, label?: string | null, anchor?: string | null, page?: { __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any } | null }>, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FileDownloadSectionRecord', id: any, title?: string | null, fileDownloadItems: Array<{ __typename: 'FileDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string, filename: string } | null }> } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null, pages: Array<{ __typename: 'PowerBiPageRecord', name?: string | null, id: any, pageId?: string | null }> } | { __typename: 'TermsPageRecord', id: any }> } | null, seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> } | null, site: { __typename: 'Site', favicon: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> }, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, topBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, leadCard?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }> };

export type InfoPageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type InfoPageQuery = { __typename: 'Query', infoPage?: { __typename: 'InfoPageRecord', id: any, title?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null, lead?: { __typename: 'InfoPageModelLeadField', value: any, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any }> } | null, content?: { __typename: 'InfoPageModelContentField', value: any, blocks: Array<{ __typename: 'AssetLinkButtonRecord', id: any, label?: string | null, asset?: { __typename: 'FileField', url: string } | null } | { __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ExternalLinkButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'IframeBlockRecord' } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, title?: string | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null } | { __typename: 'InternalLinkButtonRecord', id: any, label?: string | null, anchor?: string | null, page?: { __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any } | null }>, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FileDownloadSectionRecord', id: any, title?: string | null, fileDownloadItems: Array<{ __typename: 'FileDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string, filename: string } | null }> } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null, pages: Array<{ __typename: 'PowerBiPageRecord', name?: string | null, id: any, pageId?: string | null }> } | { __typename: 'TermsPageRecord', id: any }> } | null, seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> } | null, site: { __typename: 'Site', favicon: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> }, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, topBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, leadCard?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }> };

export type AnalysisPageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type AnalysisPageQuery = { __typename: 'Query', analysisPage?: { __typename: 'AnalysisPageRecord', id: any, title?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null, lead?: { __typename: 'AnalysisPageModelLeadField', value: any, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any }> } | null, seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> } | null, site: { __typename: 'Site', favicon: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> }, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> };

export type PaginatedFilteredBlogpostsQueryVariables = Exact<{
  locale: SiteLocale;
  first: Scalars['IntType']['input'];
  skip: Scalars['IntType']['input'];
  marketFilter?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>> | InputMaybe<Scalars['ItemId']['input']>>;
  focusFilter?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>> | InputMaybe<Scalars['ItemId']['input']>>;
  orderBy?: InputMaybe<Array<InputMaybe<BlogPostModelOrderBy>> | InputMaybe<BlogPostModelOrderBy>>;
}>;


export type PaginatedFilteredBlogpostsQuery = { __typename: 'Query', blogposts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, leadCard?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }>, blogpostCount: { __typename: 'CollectionMetadata', count: number } };

export type BlogPostQueryVariables = Exact<{
  locale: SiteLocale;
  slug: Scalars['String']['input'];
}>;


export type BlogPostQuery = { __typename: 'Query', blogPost?: { __typename: 'BlogPostRecord', id: any, publishedDate?: string | null, title?: string | null, leadCard?: string | null, slug?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null, seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }>, lead?: { __typename: 'BlogPostModelLeadField', value: any, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any }> } | null, authors: Array<{ __typename: 'PersonRecord', id: any, firstName?: string | null, lastName?: string | null, portrait?: { __typename: 'FileField', id: any, url: string } | null }>, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, content?: { __typename: 'BlogPostModelContentField', value: any, blocks: Array<{ __typename: 'AssetLinkButtonRecord', id: any, label?: string | null, asset?: { __typename: 'FileField', url: string } | null } | { __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ExternalLinkButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'IframeBlockRecord', id: any, caption?: string | null, height?: number | null, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, title?: string | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null } | { __typename: 'InternalLinkButtonRecord', id: any, label?: string | null, anchor?: string | null, page?: { __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any } | null }>, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FileDownloadSectionRecord', id: any, title?: string | null, fileDownloadItems: Array<{ __typename: 'FileDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string, filename: string } | null }> } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null, pages: Array<{ __typename: 'PowerBiPageRecord', name?: string | null, id: any, pageId?: string | null }> } | { __typename: 'TermsPageRecord', id: any }> } | null } | null, site: { __typename: 'Site', favicon: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> }, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, topBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, leadCard?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }> };

export type AllPowerBiReportsQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type AllPowerBiReportsQuery = { __typename: 'Query', allPowerBiReports: Array<{ __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, dataset?: { __typename: 'PowerBiDatasetRecord', datasetId?: string | null } | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null } | null, pages: Array<{ __typename: 'PowerBiPageRecord', name?: string | null, pageId?: string | null }> }> };

export type ErrorPageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type ErrorPageQuery = { __typename: 'Query', allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> };

export type AllMarketArticlesSlugLocalesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMarketArticlesSlugLocalesQuery = { __typename: 'Query', allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null }> };

export type AllFocusArticlesSlugLocalesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllFocusArticlesSlugLocalesQuery = { __typename: 'Query', allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null }> };

export type SiteMapQueryVariables = Exact<{ [key: string]: never; }>;


export type SiteMapQuery = { __typename: 'Query', allBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null }>, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null }>, market?: { __typename: 'MarketRecord', _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null } | null };

export type AllBlogPostsSlugLocalesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBlogPostsSlugLocalesQuery = { __typename: 'Query', allBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null }> };

export type AllRedirectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRedirectsQuery = { __typename: 'Query', methodsPage?: { __typename: 'MethodsPageRecord', _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null } | null, termsPage?: { __typename: 'TermsPageRecord', _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null } | null, legalPage?: { __typename: 'LegalPageRecord', _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null } | null, infoPage?: { __typename: 'InfoPageRecord', _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null } | null, dataPage?: { __typename: 'DataPageRecord', _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null } | null, analysisPage?: { __typename: 'AnalysisPageRecord', _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null } | null, focusModel?: { __typename: 'FocusModelRecord', _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null } | null, market?: { __typename: 'MarketRecord', _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null } | null };

export type CookieBannerQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type CookieBannerQuery = { __typename: 'Query', cookieBanner?: { __typename: 'CookieBannerRecord', accept?: string | null, reject?: string | null, content?: { __typename: 'CookieBannerModelContentField', value: any } | null } | null };

export type SimpleMarketArticleFragment = { __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null };

export type SimpleFocusArticleFragment = { __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null };

export type FullMarketArticleFragment = { __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null, lead?: { __typename: 'MarketArticleModelLeadField', value: any, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any }> } | null, content?: { __typename: 'MarketArticleModelContentField', value: any, blocks: Array<{ __typename: 'AssetLinkButtonRecord', id: any, label?: string | null, asset?: { __typename: 'FileField', url: string } | null } | { __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ExternalLinkButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'IframeBlockRecord' } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, title?: string | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null } | { __typename: 'InternalLinkButtonRecord', id: any, label?: string | null, anchor?: string | null, page?: { __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any } | null }>, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FileDownloadSectionRecord', id: any, title?: string | null, fileDownloadItems: Array<{ __typename: 'FileDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string, filename: string } | null }> } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null, pages: Array<{ __typename: 'PowerBiPageRecord', name?: string | null, id: any, pageId?: string | null }> } | { __typename: 'TermsPageRecord', id: any }> } | null };

export type FullFocusArticleFragment = { __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null, lead?: { __typename: 'FocusArticleModelLeadField', value: any, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any }> } | null, content?: { __typename: 'FocusArticleModelContentField', value: any, blocks: Array<{ __typename: 'AssetLinkButtonRecord', id: any, label?: string | null, asset?: { __typename: 'FileField', url: string } | null } | { __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ExternalLinkButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'IframeBlockRecord' } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, title?: string | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null } | { __typename: 'InternalLinkButtonRecord', id: any, label?: string | null, anchor?: string | null, page?: { __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any } | null }>, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FileDownloadSectionRecord', id: any, title?: string | null, fileDownloadItems: Array<{ __typename: 'FileDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string, filename: string } | null }> } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null, pages: Array<{ __typename: 'PowerBiPageRecord', name?: string | null, id: any, pageId?: string | null }> } | { __typename: 'TermsPageRecord', id: any }> } | null };

export type SimpleBlogPostFragment = { __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, leadCard?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> };

export type BlogPostFragment = { __typename: 'BlogPostRecord', id: any, publishedDate?: string | null, title?: string | null, leadCard?: string | null, slug?: string | null, lead?: { __typename: 'BlogPostModelLeadField', value: any, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any }> } | null, authors: Array<{ __typename: 'PersonRecord', id: any, firstName?: string | null, lastName?: string | null, portrait?: { __typename: 'FileField', id: any, url: string } | null }>, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, content?: { __typename: 'BlogPostModelContentField', value: any, blocks: Array<{ __typename: 'AssetLinkButtonRecord', id: any, label?: string | null, asset?: { __typename: 'FileField', url: string } | null } | { __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ExternalLinkButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'IframeBlockRecord', id: any, caption?: string | null, height?: number | null, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, title?: string | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null } | { __typename: 'InternalLinkButtonRecord', id: any, label?: string | null, anchor?: string | null, page?: { __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any } | null }>, links: Array<{ __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FileDownloadSectionRecord', id: any, title?: string | null, fileDownloadItems: Array<{ __typename: 'FileDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string, filename: string } | null }> } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'PowerBiPageRecord', id: any } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null, pages: Array<{ __typename: 'PowerBiPageRecord', name?: string | null, id: any, pageId?: string | null }> } | { __typename: 'TermsPageRecord', id: any }> } | null };

export type DownloadTeaserBlockFragment = { __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> };

export type ExternalVideoBlockFragment = { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null };

export type GalleryBlockFragment = { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> };

export type IframeBlockFragment = { __typename: 'IframeBlockRecord', id: any, caption?: string | null, height?: number | null, url?: string | null };

export type MarkdownBlockFragment = { __typename: 'MarkdownBlockRecord', id: any, content?: string | null };

export type SurveyBlockFragment = { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> };

export type ImageTeaserBlockFragment = { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, title?: string | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null };

export type PowerBiFragment = { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null, pages: Array<{ __typename: 'PowerBiPageRecord', name?: string | null, id: any, pageId?: string | null }> };

export type FileDownloadSectionFragment = { __typename: 'FileDownloadSectionRecord', id: any, title?: string | null, fileDownloadItems: Array<{ __typename: 'FileDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string, filename: string } | null }> };

export type HighlightSectionFragment = { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null };

export type HighlightSectionFileRecordFragment = { __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null };

export type HighlightSectionLinkFragment = { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null };

export type DataButtonFragment = { __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null };

export type InternalLinkButtonFragment = { __typename: 'InternalLinkButtonRecord', id: any, label?: string | null, anchor?: string | null, page?: { __typename: 'AnalysisPageRecord', id: any } | { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'DataPageRecord', id: any } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'HomePageRecord', id: any } | { __typename: 'InfoPageRecord', id: any } | { __typename: 'LegalPageRecord', id: any } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any } | { __typename: 'TermsPageRecord', id: any } | null };

export type ExternalLinkButtonFragment = { __typename: 'ExternalLinkButtonRecord', id: any, url?: string | null, label?: string | null };

export type AssetLinkButtonFragment = { __typename: 'AssetLinkButtonRecord', id: any, label?: string | null, asset?: { __typename: 'FileField', url: string } | null };

type InternalLinkAnalysisPageRecordFragment = { __typename: 'AnalysisPageRecord', id: any };

type InternalLinkAssetLinkButtonRecordFragment = { __typename: 'AssetLinkButtonRecord' };

type InternalLinkBlogPostRecordFragment = { __typename: 'BlogPostRecord', id: any, slug?: string | null };

type InternalLinkCookieBannerRecordFragment = { __typename: 'CookieBannerRecord' };

type InternalLinkDataButtonRecordFragment = { __typename: 'DataButtonRecord' };

type InternalLinkDataPageRecordFragment = { __typename: 'DataPageRecord', id: any };

type InternalLinkDownloadTeaserAssetRecordFragment = { __typename: 'DownloadTeaserAssetRecord' };

type InternalLinkDownloadTeaserBlockRecordFragment = { __typename: 'DownloadTeaserBlockRecord' };

type InternalLinkExternalLinkButtonRecordFragment = { __typename: 'ExternalLinkButtonRecord' };

type InternalLinkExternalVideoBlockRecordFragment = { __typename: 'ExternalVideoBlockRecord' };

type InternalLinkFileDownloadItemRecordFragment = { __typename: 'FileDownloadItemRecord' };

type InternalLinkFileDownloadSectionRecordFragment = { __typename: 'FileDownloadSectionRecord' };

type InternalLinkFocusArticleRecordFragment = { __typename: 'FocusArticleRecord', id: any, slug?: string | null };

type InternalLinkFocusModelRecordFragment = { __typename: 'FocusModelRecord' };

type InternalLinkGalleryBlockRecordFragment = { __typename: 'GalleryBlockRecord' };

type InternalLinkHighlightSectionFileRecordFragment = { __typename: 'HighlightSectionFileRecord' };

type InternalLinkHighlightSectionLinkRecordFragment = { __typename: 'HighlightSectionLinkRecord' };

type InternalLinkHighlightSectionRecordFragment = { __typename: 'HighlightSectionRecord' };

type InternalLinkHomePageRecordFragment = { __typename: 'HomePageRecord', id: any };

type InternalLinkIframeBlockRecordFragment = { __typename: 'IframeBlockRecord' };

type InternalLinkImageTeaserBlockRecordFragment = { __typename: 'ImageTeaserBlockRecord' };

type InternalLinkInfoPageRecordFragment = { __typename: 'InfoPageRecord', id: any };

type InternalLinkInternalLinkButtonRecordFragment = { __typename: 'InternalLinkButtonRecord' };

type InternalLinkLegalPageRecordFragment = { __typename: 'LegalPageRecord', id: any };

type InternalLinkMarkdownBlockRecordFragment = { __typename: 'MarkdownBlockRecord' };

type InternalLinkMarketArticleRecordFragment = { __typename: 'MarketArticleRecord', id: any, slug?: string | null };

type InternalLinkMarketRecordFragment = { __typename: 'MarketRecord' };

type InternalLinkMethodsPageRecordFragment = { __typename: 'MethodsPageRecord', id: any };

type InternalLinkPersonRecordFragment = { __typename: 'PersonRecord' };

type InternalLinkPowerBiDatasetRecordFragment = { __typename: 'PowerBiDatasetRecord' };

type InternalLinkPowerBiPageRecordFragment = { __typename: 'PowerBiPageRecord', id: any };

type InternalLinkPowerBiReportPageRecordFragment = { __typename: 'PowerBiReportPageRecord' };

type InternalLinkPowerBiReportRecordFragment = { __typename: 'PowerBiReportRecord' };

type InternalLinkPowerBiWorkspaceRecordFragment = { __typename: 'PowerBiWorkspaceRecord' };

type InternalLinkSurveyAnswerRecordFragment = { __typename: 'SurveyAnswerRecord' };

type InternalLinkSurveyBlockRecordFragment = { __typename: 'SurveyBlockRecord' };

type InternalLinkSurveyQuestionRecordFragment = { __typename: 'SurveyQuestionRecord' };

type InternalLinkTermsPageRecordFragment = { __typename: 'TermsPageRecord', id: any };

export type InternalLinkFragment = InternalLinkAnalysisPageRecordFragment | InternalLinkAssetLinkButtonRecordFragment | InternalLinkBlogPostRecordFragment | InternalLinkCookieBannerRecordFragment | InternalLinkDataButtonRecordFragment | InternalLinkDataPageRecordFragment | InternalLinkDownloadTeaserAssetRecordFragment | InternalLinkDownloadTeaserBlockRecordFragment | InternalLinkExternalLinkButtonRecordFragment | InternalLinkExternalVideoBlockRecordFragment | InternalLinkFileDownloadItemRecordFragment | InternalLinkFileDownloadSectionRecordFragment | InternalLinkFocusArticleRecordFragment | InternalLinkFocusModelRecordFragment | InternalLinkGalleryBlockRecordFragment | InternalLinkHighlightSectionFileRecordFragment | InternalLinkHighlightSectionLinkRecordFragment | InternalLinkHighlightSectionRecordFragment | InternalLinkHomePageRecordFragment | InternalLinkIframeBlockRecordFragment | InternalLinkImageTeaserBlockRecordFragment | InternalLinkInfoPageRecordFragment | InternalLinkInternalLinkButtonRecordFragment | InternalLinkLegalPageRecordFragment | InternalLinkMarkdownBlockRecordFragment | InternalLinkMarketArticleRecordFragment | InternalLinkMarketRecordFragment | InternalLinkMethodsPageRecordFragment | InternalLinkPersonRecordFragment | InternalLinkPowerBiDatasetRecordFragment | InternalLinkPowerBiPageRecordFragment | InternalLinkPowerBiReportPageRecordFragment | InternalLinkPowerBiReportRecordFragment | InternalLinkPowerBiWorkspaceRecordFragment | InternalLinkSurveyAnswerRecordFragment | InternalLinkSurveyBlockRecordFragment | InternalLinkSurveyQuestionRecordFragment | InternalLinkTermsPageRecordFragment;

type InternalEmbedAnalysisPageRecordFragment = { __typename: 'AnalysisPageRecord' };

type InternalEmbedAssetLinkButtonRecordFragment = { __typename: 'AssetLinkButtonRecord' };

type InternalEmbedBlogPostRecordFragment = { __typename: 'BlogPostRecord' };

type InternalEmbedCookieBannerRecordFragment = { __typename: 'CookieBannerRecord' };

type InternalEmbedDataButtonRecordFragment = { __typename: 'DataButtonRecord' };

type InternalEmbedDataPageRecordFragment = { __typename: 'DataPageRecord' };

type InternalEmbedDownloadTeaserAssetRecordFragment = { __typename: 'DownloadTeaserAssetRecord' };

type InternalEmbedDownloadTeaserBlockRecordFragment = { __typename: 'DownloadTeaserBlockRecord' };

type InternalEmbedExternalLinkButtonRecordFragment = { __typename: 'ExternalLinkButtonRecord' };

type InternalEmbedExternalVideoBlockRecordFragment = { __typename: 'ExternalVideoBlockRecord' };

type InternalEmbedFileDownloadItemRecordFragment = { __typename: 'FileDownloadItemRecord' };

type InternalEmbedFileDownloadSectionRecordFragment = { __typename: 'FileDownloadSectionRecord', id: any };

type InternalEmbedFocusArticleRecordFragment = { __typename: 'FocusArticleRecord' };

type InternalEmbedFocusModelRecordFragment = { __typename: 'FocusModelRecord' };

type InternalEmbedGalleryBlockRecordFragment = { __typename: 'GalleryBlockRecord' };

type InternalEmbedHighlightSectionFileRecordFragment = { __typename: 'HighlightSectionFileRecord' };

type InternalEmbedHighlightSectionLinkRecordFragment = { __typename: 'HighlightSectionLinkRecord' };

type InternalEmbedHighlightSectionRecordFragment = { __typename: 'HighlightSectionRecord', id: any };

type InternalEmbedHomePageRecordFragment = { __typename: 'HomePageRecord' };

type InternalEmbedIframeBlockRecordFragment = { __typename: 'IframeBlockRecord' };

type InternalEmbedImageTeaserBlockRecordFragment = { __typename: 'ImageTeaserBlockRecord' };

type InternalEmbedInfoPageRecordFragment = { __typename: 'InfoPageRecord' };

type InternalEmbedInternalLinkButtonRecordFragment = { __typename: 'InternalLinkButtonRecord' };

type InternalEmbedLegalPageRecordFragment = { __typename: 'LegalPageRecord' };

type InternalEmbedMarkdownBlockRecordFragment = { __typename: 'MarkdownBlockRecord' };

type InternalEmbedMarketArticleRecordFragment = { __typename: 'MarketArticleRecord' };

type InternalEmbedMarketRecordFragment = { __typename: 'MarketRecord' };

type InternalEmbedMethodsPageRecordFragment = { __typename: 'MethodsPageRecord' };

type InternalEmbedPersonRecordFragment = { __typename: 'PersonRecord' };

type InternalEmbedPowerBiDatasetRecordFragment = { __typename: 'PowerBiDatasetRecord' };

type InternalEmbedPowerBiPageRecordFragment = { __typename: 'PowerBiPageRecord', id: any };

type InternalEmbedPowerBiReportPageRecordFragment = { __typename: 'PowerBiReportPageRecord' };

type InternalEmbedPowerBiReportRecordFragment = { __typename: 'PowerBiReportRecord', id: any };

type InternalEmbedPowerBiWorkspaceRecordFragment = { __typename: 'PowerBiWorkspaceRecord' };

type InternalEmbedSurveyAnswerRecordFragment = { __typename: 'SurveyAnswerRecord' };

type InternalEmbedSurveyBlockRecordFragment = { __typename: 'SurveyBlockRecord' };

type InternalEmbedSurveyQuestionRecordFragment = { __typename: 'SurveyQuestionRecord' };

type InternalEmbedTermsPageRecordFragment = { __typename: 'TermsPageRecord' };

export type InternalEmbedFragment = InternalEmbedAnalysisPageRecordFragment | InternalEmbedAssetLinkButtonRecordFragment | InternalEmbedBlogPostRecordFragment | InternalEmbedCookieBannerRecordFragment | InternalEmbedDataButtonRecordFragment | InternalEmbedDataPageRecordFragment | InternalEmbedDownloadTeaserAssetRecordFragment | InternalEmbedDownloadTeaserBlockRecordFragment | InternalEmbedExternalLinkButtonRecordFragment | InternalEmbedExternalVideoBlockRecordFragment | InternalEmbedFileDownloadItemRecordFragment | InternalEmbedFileDownloadSectionRecordFragment | InternalEmbedFocusArticleRecordFragment | InternalEmbedFocusModelRecordFragment | InternalEmbedGalleryBlockRecordFragment | InternalEmbedHighlightSectionFileRecordFragment | InternalEmbedHighlightSectionLinkRecordFragment | InternalEmbedHighlightSectionRecordFragment | InternalEmbedHomePageRecordFragment | InternalEmbedIframeBlockRecordFragment | InternalEmbedImageTeaserBlockRecordFragment | InternalEmbedInfoPageRecordFragment | InternalEmbedInternalLinkButtonRecordFragment | InternalEmbedLegalPageRecordFragment | InternalEmbedMarkdownBlockRecordFragment | InternalEmbedMarketArticleRecordFragment | InternalEmbedMarketRecordFragment | InternalEmbedMethodsPageRecordFragment | InternalEmbedPersonRecordFragment | InternalEmbedPowerBiDatasetRecordFragment | InternalEmbedPowerBiPageRecordFragment | InternalEmbedPowerBiReportPageRecordFragment | InternalEmbedPowerBiReportRecordFragment | InternalEmbedPowerBiWorkspaceRecordFragment | InternalEmbedSurveyAnswerRecordFragment | InternalEmbedSurveyBlockRecordFragment | InternalEmbedSurveyQuestionRecordFragment | InternalEmbedTermsPageRecordFragment;

export type MenuItemsFragment = { __typename: 'Query', allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> };

export type TopBlogPostsFragment = { __typename: 'Query', topBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, leadCard?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }> };

type SeoMetaTagsAnalysisPageRecordFragment = { __typename: 'AnalysisPageRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsAssetLinkButtonRecordFragment = { __typename: 'AssetLinkButtonRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsBlogPostRecordFragment = { __typename: 'BlogPostRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsCookieBannerRecordFragment = { __typename: 'CookieBannerRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsDataButtonRecordFragment = { __typename: 'DataButtonRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsDataPageRecordFragment = { __typename: 'DataPageRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsDownloadTeaserAssetRecordFragment = { __typename: 'DownloadTeaserAssetRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsDownloadTeaserBlockRecordFragment = { __typename: 'DownloadTeaserBlockRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsExternalLinkButtonRecordFragment = { __typename: 'ExternalLinkButtonRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsExternalVideoBlockRecordFragment = { __typename: 'ExternalVideoBlockRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsFileDownloadItemRecordFragment = { __typename: 'FileDownloadItemRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsFileDownloadSectionRecordFragment = { __typename: 'FileDownloadSectionRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsFocusArticleRecordFragment = { __typename: 'FocusArticleRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsFocusModelRecordFragment = { __typename: 'FocusModelRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsGalleryBlockRecordFragment = { __typename: 'GalleryBlockRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsHighlightSectionFileRecordFragment = { __typename: 'HighlightSectionFileRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsHighlightSectionLinkRecordFragment = { __typename: 'HighlightSectionLinkRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsHighlightSectionRecordFragment = { __typename: 'HighlightSectionRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsHomePageRecordFragment = { __typename: 'HomePageRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsIframeBlockRecordFragment = { __typename: 'IframeBlockRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsImageTeaserBlockRecordFragment = { __typename: 'ImageTeaserBlockRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsInfoPageRecordFragment = { __typename: 'InfoPageRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsInternalLinkButtonRecordFragment = { __typename: 'InternalLinkButtonRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsLegalPageRecordFragment = { __typename: 'LegalPageRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsMarkdownBlockRecordFragment = { __typename: 'MarkdownBlockRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsMarketArticleRecordFragment = { __typename: 'MarketArticleRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsMarketRecordFragment = { __typename: 'MarketRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsMethodsPageRecordFragment = { __typename: 'MethodsPageRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsPersonRecordFragment = { __typename: 'PersonRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsPowerBiDatasetRecordFragment = { __typename: 'PowerBiDatasetRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsPowerBiPageRecordFragment = { __typename: 'PowerBiPageRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsPowerBiReportPageRecordFragment = { __typename: 'PowerBiReportPageRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsPowerBiReportRecordFragment = { __typename: 'PowerBiReportRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsPowerBiWorkspaceRecordFragment = { __typename: 'PowerBiWorkspaceRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsSurveyAnswerRecordFragment = { __typename: 'SurveyAnswerRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsSurveyBlockRecordFragment = { __typename: 'SurveyBlockRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsSurveyQuestionRecordFragment = { __typename: 'SurveyQuestionRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

type SeoMetaTagsTermsPageRecordFragment = { __typename: 'TermsPageRecord', seo: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> };

export type SeoMetaTagsFragment = SeoMetaTagsAnalysisPageRecordFragment | SeoMetaTagsAssetLinkButtonRecordFragment | SeoMetaTagsBlogPostRecordFragment | SeoMetaTagsCookieBannerRecordFragment | SeoMetaTagsDataButtonRecordFragment | SeoMetaTagsDataPageRecordFragment | SeoMetaTagsDownloadTeaserAssetRecordFragment | SeoMetaTagsDownloadTeaserBlockRecordFragment | SeoMetaTagsExternalLinkButtonRecordFragment | SeoMetaTagsExternalVideoBlockRecordFragment | SeoMetaTagsFileDownloadItemRecordFragment | SeoMetaTagsFileDownloadSectionRecordFragment | SeoMetaTagsFocusArticleRecordFragment | SeoMetaTagsFocusModelRecordFragment | SeoMetaTagsGalleryBlockRecordFragment | SeoMetaTagsHighlightSectionFileRecordFragment | SeoMetaTagsHighlightSectionLinkRecordFragment | SeoMetaTagsHighlightSectionRecordFragment | SeoMetaTagsHomePageRecordFragment | SeoMetaTagsIframeBlockRecordFragment | SeoMetaTagsImageTeaserBlockRecordFragment | SeoMetaTagsInfoPageRecordFragment | SeoMetaTagsInternalLinkButtonRecordFragment | SeoMetaTagsLegalPageRecordFragment | SeoMetaTagsMarkdownBlockRecordFragment | SeoMetaTagsMarketArticleRecordFragment | SeoMetaTagsMarketRecordFragment | SeoMetaTagsMethodsPageRecordFragment | SeoMetaTagsPersonRecordFragment | SeoMetaTagsPowerBiDatasetRecordFragment | SeoMetaTagsPowerBiPageRecordFragment | SeoMetaTagsPowerBiReportPageRecordFragment | SeoMetaTagsPowerBiReportRecordFragment | SeoMetaTagsPowerBiWorkspaceRecordFragment | SeoMetaTagsSurveyAnswerRecordFragment | SeoMetaTagsSurveyBlockRecordFragment | SeoMetaTagsSurveyQuestionRecordFragment | SeoMetaTagsTermsPageRecordFragment;

export type SiteFavIconFragment = { __typename: 'Query', site: { __typename: 'Site', favicon: Array<{ __typename: 'Tag', attributes?: any | null, content?: string | null, tag: string }> } };

export const InternalLinkFragmentDoc = gql`
    fragment InternalLink on RecordInterface {
  ... on HomePageRecord {
    id
  }
  ... on AnalysisPageRecord {
    id
  }
  ... on FocusArticleRecord {
    id
    slug
  }
  ... on LegalPageRecord {
    id
  }
  ... on MarketArticleRecord {
    id
    slug
  }
  ... on MethodsPageRecord {
    id
  }
  ... on TermsPageRecord {
    id
  }
  ... on BlogPostRecord {
    id
    slug
  }
  ... on DataPageRecord {
    id
  }
  ... on InfoPageRecord {
    id
  }
  ... on PowerBiPageRecord {
    id
  }
}
    `;
export const DataButtonFragmentDoc = gql`
    fragment DataButton on DataButtonRecord {
  id
  url
  label
}
    `;
export const InternalLinkButtonFragmentDoc = gql`
    fragment InternalLinkButton on InternalLinkButtonRecord {
  id
  page {
    __typename
    ...InternalLink
  }
  label
  anchor
}
    `;
export const ExternalLinkButtonFragmentDoc = gql`
    fragment ExternalLinkButton on ExternalLinkButtonRecord {
  id
  url
  label
}
    `;
export const AssetLinkButtonFragmentDoc = gql`
    fragment AssetLinkButton on AssetLinkButtonRecord {
  id
  asset {
    url
  }
  label
}
    `;
export const ImageTeaserBlockFragmentDoc = gql`
    fragment ImageTeaserBlock on ImageTeaserBlockRecord {
  id
  description
  imageTeaserAsset {
    customData
    id
    url
    alt
    width
    height
    title
    responsiveImage(imgixParams: {fit: clip, auto: format}) {
      sizes
      src
      width
      height
      alt
      title
      base64
    }
  }
}
    `;
export const FileDownloadSectionFragmentDoc = gql`
    fragment FileDownloadSection on FileDownloadSectionRecord {
  id
  title
  fileDownloadItems {
    id
    title
    description
    date
    file {
      url
      format
      filename
    }
  }
}
    `;
export const HighlightSectionFileRecordFragmentDoc = gql`
    fragment HighlightSectionFileRecord on HighlightSectionFileRecord {
  id
  title
  file {
    url
  }
}
    `;
export const HighlightSectionLinkFragmentDoc = gql`
    fragment HighlightSectionLink on HighlightSectionLinkRecord {
  id
  title
  link {
    __typename
    ... on BlogPostRecord {
      id
      slug
    }
    ... on FocusArticleRecord {
      id
      slug
    }
    ... on MarketArticleRecord {
      id
      slug
    }
    ... on MethodsPageRecord {
      id
      slug
    }
  }
}
    `;
export const HighlightSectionFragmentDoc = gql`
    fragment HighlightSection on HighlightSectionRecord {
  id
  title
  content {
    links {
      __typename
      ...HighlightSectionFileRecord
      ...HighlightSectionLink
    }
    value
  }
}
    `;
export const PowerBiFragmentDoc = gql`
    fragment PowerBI on PowerBiReportRecord {
  id
  workspace {
    id
    name
    workspaceId
  }
  reportId
  name
  dataset {
    name
    id
    datasetId
    workspace {
      workspaceId
      name
      id
    }
  }
  pages {
    name
    id
    pageId
  }
}
    `;
export const FullMarketArticleFragmentDoc = gql`
    fragment FullMarketArticle on MarketArticleRecord {
  id
  title
  slug
  lead {
    value
    links {
      __typename
      ...InternalLink
    }
  }
  content {
    value
    blocks {
      __typename
      ...DataButton
      ...InternalLinkButton
      ...ExternalLinkButton
      ...AssetLinkButton
      ...ImageTeaserBlock
    }
    links {
      __typename
      ...FileDownloadSection
      ...HighlightSection
      ...PowerBI
      ...InternalLink
    }
  }
}
    `;
export const FullFocusArticleFragmentDoc = gql`
    fragment FullFocusArticle on FocusArticleRecord {
  id
  title
  slug
  lead {
    value
    links {
      __typename
      ...InternalLink
    }
  }
  content {
    value
    blocks {
      __typename
      ...DataButton
      ...InternalLinkButton
      ...ExternalLinkButton
      ...AssetLinkButton
      ...ImageTeaserBlock
    }
    links {
      __typename
      ...InternalLink
      ...FileDownloadSection
      ...HighlightSection
      ...PowerBI
    }
  }
}
    `;
export const IframeBlockFragmentDoc = gql`
    fragment IframeBlock on IframeBlockRecord {
  id
  caption
  height
  url
  caption
  height
}
    `;
export const BlogPostFragmentDoc = gql`
    fragment BlogPost on BlogPostRecord {
  id
  publishedDate
  title
  leadCard
  lead {
    value
    links {
      __typename
      ...InternalLink
    }
  }
  slug
  authors {
    id
    firstName
    lastName
    portrait {
      id
      url
    }
  }
  markets {
    id
    title
    slug
  }
  focusArticles {
    id
    title
    slug
  }
  content {
    value
    blocks {
      __typename
      ...IframeBlock
      ...DataButton
      ...InternalLinkButton
      ...ExternalLinkButton
      ...AssetLinkButton
      ...ImageTeaserBlock
      ...IframeBlock
    }
    links {
      __typename
      ...InternalLink
      ...FileDownloadSection
      ...HighlightSection
      ...PowerBI
    }
  }
}
    `;
export const DownloadTeaserBlockFragmentDoc = gql`
    fragment DownloadTeaserBlock on DownloadTeaserBlockRecord {
  id
  markdown
  description
  downloadTeaserAssets {
    id
    title
    file {
      id
      url
    }
  }
}
    `;
export const ExternalVideoBlockFragmentDoc = gql`
    fragment ExternalVideoBlock on ExternalVideoBlockRecord {
  id
  externalVideo {
    url
    title
  }
}
    `;
export const GalleryBlockFragmentDoc = gql`
    fragment GalleryBlock on GalleryBlockRecord {
  id
  galleryAssets {
    id
    title
    url
  }
}
    `;
export const MarkdownBlockFragmentDoc = gql`
    fragment MarkdownBlock on MarkdownBlockRecord {
  id
  content
}
    `;
export const SurveyBlockFragmentDoc = gql`
    fragment SurveyBlock on SurveyBlockRecord {
  id
  formUrl
  question {
    id
    question
    formFieldId
    isMultipleChoice
    possibleAnswers {
      id
      answer
    }
  }
}
    `;
export const InternalEmbedFragmentDoc = gql`
    fragment InternalEmbed on RecordInterface {
  ... on PowerBiPageRecord {
    id
  }
  ... on FileDownloadSectionRecord {
    id
  }
  ... on HighlightSectionRecord {
    id
  }
  ... on PowerBiReportRecord {
    id
  }
}
    `;
export const SimpleMarketArticleFragmentDoc = gql`
    fragment SimpleMarketArticle on MarketArticleRecord {
  id
  title
  slug
}
    `;
export const SimpleFocusArticleFragmentDoc = gql`
    fragment SimpleFocusArticle on FocusArticleRecord {
  id
  title
  slug
}
    `;
export const MenuItemsFragmentDoc = gql`
    fragment MenuItems on Query {
  allMarketArticles(locale: $locale) {
    ...SimpleMarketArticle
  }
  allFocusArticles(locale: $locale) {
    ...SimpleFocusArticle
  }
}
    `;
export const SimpleBlogPostFragmentDoc = gql`
    fragment SimpleBlogPost on BlogPostRecord {
  id
  title
  slug
  leadCard
  image {
    id
    alt
    url
    responsiveImage(imgixParams: {fit: fill, w: 1096, h: 556, auto: format}) {
      sizes
      src
      width
      height
      alt
      title
      base64
    }
  }
  markets {
    id
    title
    slug
  }
  focusArticles {
    id
    title
    slug
  }
  publishedDate
}
    `;
export const TopBlogPostsFragmentDoc = gql`
    fragment TopBlogPosts on Query {
  topBlogPosts: allBlogPosts(
    locale: $locale
    first: 3
    orderBy: [publishedDate_DESC]
  ) {
    ...SimpleBlogPost
  }
}
    `;
export const SeoMetaTagsFragmentDoc = gql`
    fragment SEOMetaTags on RecordInterface {
  seo: _seoMetaTags {
    attributes
    content
    tag
  }
}
    `;
export const SiteFavIconFragmentDoc = gql`
    fragment SiteFavIcon on Query {
  site: _site {
    favicon: faviconMetaTags {
      attributes
      content
      tag
    }
  }
}
    `;
export const HomePageDocument = gql`
    query HomePage($locale: SiteLocale!) {
  homePage(locale: $locale) {
    id
    title
    lead {
      value
      links {
        __typename
        ...InternalLink
      }
    }
    hero {
      id
      url
    }
    markets {
      id
      title
      slug
    }
    focusArticles {
      id
      title
      slug
    }
    ...SEOMetaTags
  }
  ...SiteFavIcon
  ...MenuItems
  ...TopBlogPosts
}
    ${InternalLinkFragmentDoc}
${SeoMetaTagsFragmentDoc}
${SiteFavIconFragmentDoc}
${MenuItemsFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}
${TopBlogPostsFragmentDoc}
${SimpleBlogPostFragmentDoc}`;

export function useHomePageQuery(options: Omit<Urql.UseQueryArgs<HomePageQueryVariables>, 'query'>) {
  return Urql.useQuery<HomePageQuery, HomePageQueryVariables>({ query: HomePageDocument, ...options });
};
export const DataPageDocument = gql`
    query DataPage($locale: SiteLocale!) {
  dataPage(locale: $locale) {
    _allSlugLocales {
      locale
      value
    }
    ...SEOMetaTags
  }
  ...SiteFavIcon
  ...MenuItems
}
    ${SeoMetaTagsFragmentDoc}
${SiteFavIconFragmentDoc}
${MenuItemsFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}`;

export function useDataPageQuery(options: Omit<Urql.UseQueryArgs<DataPageQueryVariables>, 'query'>) {
  return Urql.useQuery<DataPageQuery, DataPageQueryVariables>({ query: DataPageDocument, ...options });
};
export const LegalPageDocument = gql`
    query LegalPage($locale: SiteLocale!) {
  legalPage(locale: $locale) {
    _allSlugLocales {
      locale
      value
    }
    id
    title
    ...SEOMetaTags
    lead {
      value
      links {
        __typename
        ...InternalLink
      }
    }
    content {
      value
      blocks {
        __typename
        ...DataButton
        ...InternalLinkButton
        ...ExternalLinkButton
        ...AssetLinkButton
        ...ImageTeaserBlock
      }
      links {
        __typename
        ...InternalLink
        ...FileDownloadSection
        ...HighlightSection
      }
    }
  }
  ...SiteFavIcon
  ...MenuItems
}
    ${SeoMetaTagsFragmentDoc}
${InternalLinkFragmentDoc}
${DataButtonFragmentDoc}
${InternalLinkButtonFragmentDoc}
${ExternalLinkButtonFragmentDoc}
${AssetLinkButtonFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${FileDownloadSectionFragmentDoc}
${HighlightSectionFragmentDoc}
${HighlightSectionFileRecordFragmentDoc}
${HighlightSectionLinkFragmentDoc}
${SiteFavIconFragmentDoc}
${MenuItemsFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}`;

export function useLegalPageQuery(options: Omit<Urql.UseQueryArgs<LegalPageQueryVariables>, 'query'>) {
  return Urql.useQuery<LegalPageQuery, LegalPageQueryVariables>({ query: LegalPageDocument, ...options });
};
export const TermsPageDocument = gql`
    query TermsPage($locale: SiteLocale!) {
  termsPage(locale: $locale) {
    _allSlugLocales {
      locale
      value
    }
    title
    ...SEOMetaTags
    lead {
      value
      links {
        __typename
        ...InternalLink
      }
    }
    content {
      value
      blocks {
        __typename
        ...DataButton
        ...InternalLinkButton
        ...ExternalLinkButton
        ...AssetLinkButton
        ...ImageTeaserBlock
      }
      links {
        __typename
        ...InternalLink
        ...FileDownloadSection
        ...HighlightSection
      }
    }
  }
  ...SiteFavIcon
  ...MenuItems
}
    ${SeoMetaTagsFragmentDoc}
${InternalLinkFragmentDoc}
${DataButtonFragmentDoc}
${InternalLinkButtonFragmentDoc}
${ExternalLinkButtonFragmentDoc}
${AssetLinkButtonFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${FileDownloadSectionFragmentDoc}
${HighlightSectionFragmentDoc}
${HighlightSectionFileRecordFragmentDoc}
${HighlightSectionLinkFragmentDoc}
${SiteFavIconFragmentDoc}
${MenuItemsFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}`;

export function useTermsPageQuery(options: Omit<Urql.UseQueryArgs<TermsPageQueryVariables>, 'query'>) {
  return Urql.useQuery<TermsPageQuery, TermsPageQueryVariables>({ query: TermsPageDocument, ...options });
};
export const MarketPageDocument = gql`
    query MarketPage($locale: SiteLocale!, $slug: String!) {
  marketArticle(locale: $locale, filter: {slug: {eq: $slug}}) {
    _allSlugLocales {
      locale
      value
    }
    ...SEOMetaTags
    ...FullMarketArticle
  }
  ...SiteFavIcon
  ...MenuItems
  ...TopBlogPosts
}
    ${SeoMetaTagsFragmentDoc}
${FullMarketArticleFragmentDoc}
${InternalLinkFragmentDoc}
${DataButtonFragmentDoc}
${InternalLinkButtonFragmentDoc}
${ExternalLinkButtonFragmentDoc}
${AssetLinkButtonFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${FileDownloadSectionFragmentDoc}
${HighlightSectionFragmentDoc}
${HighlightSectionFileRecordFragmentDoc}
${HighlightSectionLinkFragmentDoc}
${PowerBiFragmentDoc}
${SiteFavIconFragmentDoc}
${MenuItemsFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}
${TopBlogPostsFragmentDoc}
${SimpleBlogPostFragmentDoc}`;

export function useMarketPageQuery(options: Omit<Urql.UseQueryArgs<MarketPageQueryVariables>, 'query'>) {
  return Urql.useQuery<MarketPageQuery, MarketPageQueryVariables>({ query: MarketPageDocument, ...options });
};
export const FocusArticlePageDocument = gql`
    query FocusArticlePage($locale: SiteLocale!, $slug: String!) {
  focusArticle(locale: $locale, filter: {slug: {eq: $slug}}) {
    _allSlugLocales {
      locale
      value
    }
    ...SEOMetaTags
    ...FullFocusArticle
  }
  ...SiteFavIcon
  ...MenuItems
  ...TopBlogPosts
}
    ${SeoMetaTagsFragmentDoc}
${FullFocusArticleFragmentDoc}
${InternalLinkFragmentDoc}
${DataButtonFragmentDoc}
${InternalLinkButtonFragmentDoc}
${ExternalLinkButtonFragmentDoc}
${AssetLinkButtonFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${FileDownloadSectionFragmentDoc}
${HighlightSectionFragmentDoc}
${HighlightSectionFileRecordFragmentDoc}
${HighlightSectionLinkFragmentDoc}
${PowerBiFragmentDoc}
${SiteFavIconFragmentDoc}
${MenuItemsFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}
${TopBlogPostsFragmentDoc}
${SimpleBlogPostFragmentDoc}`;

export function useFocusArticlePageQuery(options: Omit<Urql.UseQueryArgs<FocusArticlePageQueryVariables>, 'query'>) {
  return Urql.useQuery<FocusArticlePageQuery, FocusArticlePageQueryVariables>({ query: FocusArticlePageDocument, ...options });
};
export const MethodsPageDocument = gql`
    query MethodsPage($locale: SiteLocale!) {
  methodsPage(locale: $locale) {
    _allSlugLocales {
      locale
      value
    }
    id
    title
    lead {
      value
      links {
        __typename
        ...InternalLink
      }
    }
    ...SEOMetaTags
    content {
      value
      blocks {
        __typename
        ...DataButton
        ...InternalLinkButton
        ...ExternalLinkButton
        ...AssetLinkButton
        ...ImageTeaserBlock
      }
      links {
        __typename
        ...InternalLink
        ...FileDownloadSection
        ...HighlightSection
        ...PowerBI
      }
    }
  }
  ...SiteFavIcon
  ...MenuItems
  ...TopBlogPosts
}
    ${InternalLinkFragmentDoc}
${SeoMetaTagsFragmentDoc}
${DataButtonFragmentDoc}
${InternalLinkButtonFragmentDoc}
${ExternalLinkButtonFragmentDoc}
${AssetLinkButtonFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${FileDownloadSectionFragmentDoc}
${HighlightSectionFragmentDoc}
${HighlightSectionFileRecordFragmentDoc}
${HighlightSectionLinkFragmentDoc}
${PowerBiFragmentDoc}
${SiteFavIconFragmentDoc}
${MenuItemsFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}
${TopBlogPostsFragmentDoc}
${SimpleBlogPostFragmentDoc}`;

export function useMethodsPageQuery(options: Omit<Urql.UseQueryArgs<MethodsPageQueryVariables>, 'query'>) {
  return Urql.useQuery<MethodsPageQuery, MethodsPageQueryVariables>({ query: MethodsPageDocument, ...options });
};
export const InfoPageDocument = gql`
    query InfoPage($locale: SiteLocale!) {
  infoPage(locale: $locale) {
    _allSlugLocales {
      locale
      value
    }
    id
    title
    lead {
      value
      links {
        __typename
        ...InternalLink
      }
    }
    ...SEOMetaTags
    content {
      value
      blocks {
        __typename
        ...DataButton
        ...InternalLinkButton
        ...ExternalLinkButton
        ...AssetLinkButton
        ...ImageTeaserBlock
      }
      links {
        __typename
        ...InternalLink
        ...FileDownloadSection
        ...HighlightSection
        ...PowerBI
      }
    }
  }
  ...SiteFavIcon
  ...MenuItems
  ...TopBlogPosts
}
    ${InternalLinkFragmentDoc}
${SeoMetaTagsFragmentDoc}
${DataButtonFragmentDoc}
${InternalLinkButtonFragmentDoc}
${ExternalLinkButtonFragmentDoc}
${AssetLinkButtonFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${FileDownloadSectionFragmentDoc}
${HighlightSectionFragmentDoc}
${HighlightSectionFileRecordFragmentDoc}
${HighlightSectionLinkFragmentDoc}
${PowerBiFragmentDoc}
${SiteFavIconFragmentDoc}
${MenuItemsFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}
${TopBlogPostsFragmentDoc}
${SimpleBlogPostFragmentDoc}`;

export function useInfoPageQuery(options: Omit<Urql.UseQueryArgs<InfoPageQueryVariables>, 'query'>) {
  return Urql.useQuery<InfoPageQuery, InfoPageQueryVariables>({ query: InfoPageDocument, ...options });
};
export const AnalysisPageDocument = gql`
    query AnalysisPage($locale: SiteLocale!) {
  analysisPage(locale: $locale) {
    _allSlugLocales {
      locale
      value
    }
    id
    title
    lead {
      value
      links {
        __typename
        ...InternalLink
      }
    }
    ...SEOMetaTags
  }
  ...SiteFavIcon
  ...MenuItems
}
    ${InternalLinkFragmentDoc}
${SeoMetaTagsFragmentDoc}
${SiteFavIconFragmentDoc}
${MenuItemsFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}`;

export function useAnalysisPageQuery(options: Omit<Urql.UseQueryArgs<AnalysisPageQueryVariables>, 'query'>) {
  return Urql.useQuery<AnalysisPageQuery, AnalysisPageQueryVariables>({ query: AnalysisPageDocument, ...options });
};
export const PaginatedFilteredBlogpostsDocument = gql`
    query paginatedFilteredBlogposts($locale: SiteLocale!, $first: IntType!, $skip: IntType!, $marketFilter: [ItemId], $focusFilter: [ItemId], $orderBy: [BlogPostModelOrderBy]) {
  blogposts: allBlogPosts(
    locale: $locale
    first: $first
    skip: $skip
    filter: {OR: [{markets: {anyIn: $marketFilter}}, {focusArticles: {anyIn: $focusFilter}}]}
    orderBy: $orderBy
  ) {
    ...SimpleBlogPost
  }
  blogpostCount: _allBlogPostsMeta(
    locale: $locale
    filter: {OR: [{markets: {anyIn: $marketFilter}}, {focusArticles: {anyIn: $focusFilter}}]}
  ) {
    count
  }
}
    ${SimpleBlogPostFragmentDoc}`;

export function usePaginatedFilteredBlogpostsQuery(options: Omit<Urql.UseQueryArgs<PaginatedFilteredBlogpostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PaginatedFilteredBlogpostsQuery, PaginatedFilteredBlogpostsQueryVariables>({ query: PaginatedFilteredBlogpostsDocument, ...options });
};
export const BlogPostDocument = gql`
    query BlogPost($locale: SiteLocale!, $slug: String!) {
  blogPost(locale: $locale, filter: {slug: {eq: $slug}}) {
    _allSlugLocales {
      locale
      value
    }
    ...SEOMetaTags
    id
    ...BlogPost
  }
  ...SiteFavIcon
  ...MenuItems
  ...TopBlogPosts
}
    ${SeoMetaTagsFragmentDoc}
${BlogPostFragmentDoc}
${InternalLinkFragmentDoc}
${IframeBlockFragmentDoc}
${DataButtonFragmentDoc}
${InternalLinkButtonFragmentDoc}
${ExternalLinkButtonFragmentDoc}
${AssetLinkButtonFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${FileDownloadSectionFragmentDoc}
${HighlightSectionFragmentDoc}
${HighlightSectionFileRecordFragmentDoc}
${HighlightSectionLinkFragmentDoc}
${PowerBiFragmentDoc}
${SiteFavIconFragmentDoc}
${MenuItemsFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}
${TopBlogPostsFragmentDoc}
${SimpleBlogPostFragmentDoc}`;

export function useBlogPostQuery(options: Omit<Urql.UseQueryArgs<BlogPostQueryVariables>, 'query'>) {
  return Urql.useQuery<BlogPostQuery, BlogPostQueryVariables>({ query: BlogPostDocument, ...options });
};
export const AllPowerBiReportsDocument = gql`
    query AllPowerBIReports($locale: SiteLocale!) {
  allPowerBiReports(locale: $locale) {
    id
    reportId
    dataset {
      datasetId
    }
    workspace {
      workspaceId
    }
    pages {
      name
      pageId
    }
  }
}
    `;

export function useAllPowerBiReportsQuery(options: Omit<Urql.UseQueryArgs<AllPowerBiReportsQueryVariables>, 'query'>) {
  return Urql.useQuery<AllPowerBiReportsQuery, AllPowerBiReportsQueryVariables>({ query: AllPowerBiReportsDocument, ...options });
};
export const ErrorPageDocument = gql`
    query ErrorPage($locale: SiteLocale!) {
  ...MenuItems
}
    ${MenuItemsFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}`;

export function useErrorPageQuery(options: Omit<Urql.UseQueryArgs<ErrorPageQueryVariables>, 'query'>) {
  return Urql.useQuery<ErrorPageQuery, ErrorPageQueryVariables>({ query: ErrorPageDocument, ...options });
};
export const AllMarketArticlesSlugLocalesDocument = gql`
    query AllMarketArticlesSlugLocales {
  allMarketArticles {
    id
    _allSlugLocales {
      locale
      value
    }
  }
}
    `;

export function useAllMarketArticlesSlugLocalesQuery(options?: Omit<Urql.UseQueryArgs<AllMarketArticlesSlugLocalesQueryVariables>, 'query'>) {
  return Urql.useQuery<AllMarketArticlesSlugLocalesQuery, AllMarketArticlesSlugLocalesQueryVariables>({ query: AllMarketArticlesSlugLocalesDocument, ...options });
};
export const AllFocusArticlesSlugLocalesDocument = gql`
    query AllFocusArticlesSlugLocales {
  allFocusArticles {
    id
    _allSlugLocales {
      locale
      value
    }
  }
}
    `;

export function useAllFocusArticlesSlugLocalesQuery(options?: Omit<Urql.UseQueryArgs<AllFocusArticlesSlugLocalesQueryVariables>, 'query'>) {
  return Urql.useQuery<AllFocusArticlesSlugLocalesQuery, AllFocusArticlesSlugLocalesQueryVariables>({ query: AllFocusArticlesSlugLocalesDocument, ...options });
};
export const SiteMapDocument = gql`
    query SiteMap {
  allBlogPosts {
    id
    _allSlugLocales {
      locale
      value
    }
  }
  allMarketArticles {
    id
    _allSlugLocales {
      locale
      value
    }
  }
  market {
    _allSlugLocales {
      locale
      value
    }
  }
}
    `;

export function useSiteMapQuery(options?: Omit<Urql.UseQueryArgs<SiteMapQueryVariables>, 'query'>) {
  return Urql.useQuery<SiteMapQuery, SiteMapQueryVariables>({ query: SiteMapDocument, ...options });
};
export const AllBlogPostsSlugLocalesDocument = gql`
    query AllBlogPostsSlugLocales {
  allBlogPosts {
    id
    _allSlugLocales {
      locale
      value
    }
  }
}
    `;

export function useAllBlogPostsSlugLocalesQuery(options?: Omit<Urql.UseQueryArgs<AllBlogPostsSlugLocalesQueryVariables>, 'query'>) {
  return Urql.useQuery<AllBlogPostsSlugLocalesQuery, AllBlogPostsSlugLocalesQueryVariables>({ query: AllBlogPostsSlugLocalesDocument, ...options });
};
export const AllRedirectsDocument = gql`
    query AllRedirects {
  methodsPage {
    _allSlugLocales {
      locale
      value
    }
  }
  termsPage {
    _allSlugLocales {
      locale
      value
    }
  }
  legalPage {
    _allSlugLocales {
      locale
      value
    }
  }
  infoPage {
    _allSlugLocales {
      locale
      value
    }
  }
  dataPage {
    _allSlugLocales {
      locale
      value
    }
  }
  analysisPage {
    _allSlugLocales {
      locale
      value
    }
  }
  focusModel {
    _allSlugLocales {
      locale
      value
    }
  }
  market {
    _allSlugLocales {
      locale
      value
    }
  }
}
    `;

export function useAllRedirectsQuery(options?: Omit<Urql.UseQueryArgs<AllRedirectsQueryVariables>, 'query'>) {
  return Urql.useQuery<AllRedirectsQuery, AllRedirectsQueryVariables>({ query: AllRedirectsDocument, ...options });
};
export const CookieBannerDocument = gql`
    query CookieBanner($locale: SiteLocale!) {
  cookieBanner(locale: $locale) {
    content {
      value
    }
    accept
    reject
  }
}
    `;

export function useCookieBannerQuery(options: Omit<Urql.UseQueryArgs<CookieBannerQueryVariables>, 'query'>) {
  return Urql.useQuery<CookieBannerQuery, CookieBannerQueryVariables>({ query: CookieBannerDocument, ...options });
};