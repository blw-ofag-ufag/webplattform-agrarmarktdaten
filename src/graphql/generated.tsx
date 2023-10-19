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

/** Record of type 🏛️ About Page (about_page) */
export type AboutPageRecord = RecordInterface & {
  __typename: 'AboutPageRecord';
  _allContentLocales?: Maybe<Array<MarkdownBlockRecordListListNonNullMultiLocaleField>>;
  _allLeadLocales?: Maybe<Array<StringMultiLocaleField>>;
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
  content: Array<MarkdownBlockRecord>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  lead?: Maybe<Scalars['String']['output']>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🏛️ About Page (about_page) */
export type AboutPageRecordAllContentLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏛️ About Page (about_page) */
export type AboutPageRecordAllLeadLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Record of type 🏛️ About Page (about_page) */
export type AboutPageRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏛️ About Page (about_page) */
export type AboutPageRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏛️ About Page (about_page) */
export type AboutPageRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏛️ About Page (about_page) */
export type AboutPageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏛️ About Page (about_page) */
export type AboutPageRecordContentArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏛️ About Page (about_page) */
export type AboutPageRecordLeadArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Record of type 🏛️ About Page (about_page) */
export type AboutPageRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏛️ About Page (about_page) */
export type AboutPageRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🏛️ About Page (about_page) */
export type AboutPageRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type 📊 Analysis Page (analysis_page) */
export type AnalysisPageRecord = RecordInterface & {
  __typename: 'AnalysisPageRecord';
  _allLeadLocales?: Maybe<Array<StringMultiLocaleField>>;
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
  lead?: Maybe<Scalars['String']['output']>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 📊 Analysis Page (analysis_page) */
export type AnalysisPageRecordAllLeadLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
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
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
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

export type BlogPostModelContentBlocksField = DataButtonRecord | ImageTeaserBlockRecord;

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

export type BlogPostModelContentLinksField = DataDownloadSectionRecord | HighlightSectionRecord | PowerBiReportRecord;

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
  lead?: InputMaybe<TextFilter>;
  markets?: InputMaybe<LinksFilter>;
  publishedDate?: InputMaybe<DateFilter>;
  seo?: InputMaybe<SeoFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

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
  _allLeadLocales?: Maybe<Array<StringMultiLocaleField>>;
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
  lead?: Maybe<Scalars['String']['output']>;
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
export type BlogPostRecordAllLeadLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
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

export type DataDownloadItemModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<DataDownloadItemModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DataDownloadItemModelFilter>>>;
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

export enum DataDownloadItemModelOrderBy {
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

/** Record of type 📁 Data Download Item (data_download_item) */
export type DataDownloadItemRecord = RecordInterface & {
  __typename: 'DataDownloadItemRecord';
  _allDescriptionLocales?: Maybe<Array<StringMultiLocaleField>>;
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


/** Record of type 📁 Data Download Item (data_download_item) */
export type DataDownloadItemRecordAllDescriptionLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Record of type 📁 Data Download Item (data_download_item) */
export type DataDownloadItemRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📁 Data Download Item (data_download_item) */
export type DataDownloadItemRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 📁 Data Download Item (data_download_item) */
export type DataDownloadItemRecordDescriptionArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Record of type 📁 Data Download Item (data_download_item) */
export type DataDownloadItemRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type DataDownloadItemRecordListListNonNullMultiLocaleField = {
  __typename: 'DataDownloadItemRecordListListNonNullMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value: Array<DataDownloadItemRecord>;
};

export type DataDownloadSectionModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<DataDownloadSectionModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DataDownloadSectionModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  dataDownloadItems?: InputMaybe<LinksFilter>;
  id?: InputMaybe<ItemIdFilter>;
  title?: InputMaybe<StringFilter>;
  titleNowShown?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum DataDownloadSectionModelOrderBy {
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
  titleNowShown_ASC = 'titleNowShown_ASC',
  titleNowShown_DESC = 'titleNowShown_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type 🗂️ Data Download Section (data_download_section) */
export type DataDownloadSectionRecord = RecordInterface & {
  __typename: 'DataDownloadSectionRecord';
  _allDataDownloadItemsLocales?: Maybe<Array<DataDownloadItemRecordListListNonNullMultiLocaleField>>;
  _allTitleLocales?: Maybe<Array<StringMultiLocaleField>>;
  _allTitleNowShownLocales?: Maybe<Array<StringMultiLocaleField>>;
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
  dataDownloadItems: Array<DataDownloadItemRecord>;
  id: Scalars['ItemId']['output'];
  title?: Maybe<Scalars['String']['output']>;
  titleNowShown?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🗂️ Data Download Section (data_download_section) */
export type DataDownloadSectionRecordAllDataDownloadItemsLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ Data Download Section (data_download_section) */
export type DataDownloadSectionRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ Data Download Section (data_download_section) */
export type DataDownloadSectionRecordAllTitleNowShownLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ Data Download Section (data_download_section) */
export type DataDownloadSectionRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ Data Download Section (data_download_section) */
export type DataDownloadSectionRecordDataDownloadItemsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ Data Download Section (data_download_section) */
export type DataDownloadSectionRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ Data Download Section (data_download_section) */
export type DataDownloadSectionRecordTitleNowShownArgs = {
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

export type FocusArticleModelContentBlocksField = DataButtonRecord | ImageTeaserBlockRecord;

export type FocusArticleModelContentField = {
  __typename: 'FocusArticleModelContentField';
  blocks: Array<FocusArticleModelContentBlocksField>;
  links: Array<FocusArticleModelContentLinksField>;
  value: Scalars['JsonField']['output'];
};

export type FocusArticleModelContentLinksField = DataDownloadSectionRecord | HighlightSectionRecord | PowerBiReportRecord;

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
  lead?: InputMaybe<TextFilter>;
  powerBiReport?: InputMaybe<LinkFilter>;
  seo?: InputMaybe<SeoFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

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
  _allLeadLocales?: Maybe<Array<StringMultiLocaleField>>;
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
  lead?: Maybe<Scalars['String']['output']>;
  powerBiReport?: Maybe<PowerBiReportRecord>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🎯  Focus Article (focus_article) */
export type FocusArticleRecordAllLeadLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
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
export type FocusArticleRecordLeadArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
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

export type HomeModelContentField = {
  __typename: 'HomeModelContentField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<Scalars['String']['output']>;
  value: Scalars['JsonField']['output'];
};

export type HomeModelContentFieldMultiLocaleField = {
  __typename: 'HomeModelContentFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<HomeModelContentField>;
};

/** Record of type 🏠 Home (home_page) */
export type HomePageRecord = RecordInterface & {
  __typename: 'HomePageRecord';
  _allLeadLocales?: Maybe<Array<StringMultiLocaleField>>;
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
  lead?: Maybe<Scalars['String']['output']>;
  markets: Array<MarketArticleRecord>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🏠 Home (home_page) */
export type HomePageRecordAllLeadLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
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
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
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

/** Record of type Ξ home (home) */
export type HomeRecord = RecordInterface & {
  __typename: 'HomeRecord';
  _allContentLocales?: Maybe<Array<HomeModelContentFieldMultiLocaleField>>;
  _allImageLocales?: Maybe<Array<FileFieldMultiLocaleField>>;
  _allSeoLocales?: Maybe<Array<SeoFieldMultiLocaleField>>;
  _allSubtitleLocales?: Maybe<Array<StringMultiLocaleField>>;
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
  content?: Maybe<HomeModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  image?: Maybe<FileField>;
  link?: Maybe<Scalars['String']['output']>;
  seo?: Maybe<SeoField>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type Ξ home (home) */
export type HomeRecordAllContentLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ home (home) */
export type HomeRecordAllImageLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ home (home) */
export type HomeRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ home (home) */
export type HomeRecordAllSubtitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ home (home) */
export type HomeRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ home (home) */
export type HomeRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ home (home) */
export type HomeRecordContentArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ home (home) */
export type HomeRecordImageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ home (home) */
export type HomeRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ home (home) */
export type HomeRecordSubtitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ home (home) */
export type HomeRecordTitleArgs = {
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
  createdAt: Scalars['DateTime']['output'];
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

export type LegalPageModelContentField = {
  __typename: 'LegalPageModelContentField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<Scalars['String']['output']>;
  value: Scalars['JsonField']['output'];
};

/** Record of type 🧑‍⚖️ Legal Page (legal_page) */
export type LegalPageRecord = RecordInterface & {
  __typename: 'LegalPageRecord';
  _allLeadLocales?: Maybe<Array<StringMultiLocaleField>>;
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
  lead?: Maybe<Scalars['String']['output']>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🧑‍⚖️ Legal Page (legal_page) */
export type LegalPageRecordAllLeadLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
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
export type LegalPageRecordLeadArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
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

export type MarkdownBlockRecordListListNonNullMultiLocaleField = {
  __typename: 'MarkdownBlockRecordListListNonNullMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value: Array<MarkdownBlockRecord>;
};

export type MarketArticleModelContentBlocksField = DataButtonRecord | ImageTeaserBlockRecord;

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

export type MarketArticleModelContentLinksField = DataDownloadSectionRecord | HighlightSectionRecord | PowerBiReportRecord;

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
  dataDownloadSection?: InputMaybe<LinkFilter>;
  id?: InputMaybe<ItemIdFilter>;
  lead?: InputMaybe<TextFilter>;
  powerBiReport?: InputMaybe<LinkFilter>;
  seo?: InputMaybe<SeoFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

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
  _allLeadLocales?: Maybe<Array<StringMultiLocaleField>>;
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
  dataDownloadSection?: Maybe<DataDownloadSectionRecord>;
  id: Scalars['ItemId']['output'];
  lead?: Maybe<Scalars['String']['output']>;
  powerBiReport?: Maybe<PowerBiReportRecord>;
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
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
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
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
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

export type MethodsPageModelContentBlocksField = DataButtonRecord | ImageTeaserBlockRecord;

export type MethodsPageModelContentField = {
  __typename: 'MethodsPageModelContentField';
  blocks: Array<MethodsPageModelContentBlocksField>;
  links: Array<MethodsPageModelContentLinksField>;
  value: Scalars['JsonField']['output'];
};

export type MethodsPageModelContentLinksField = DataDownloadSectionRecord | HighlightSectionRecord | PowerBiReportRecord;

/** Record of type 🧪 Methods Page (methods_page) */
export type MethodsPageRecord = RecordInterface & {
  __typename: 'MethodsPageRecord';
  _allLeadLocales?: Maybe<Array<StringMultiLocaleField>>;
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
  lead?: Maybe<Scalars['String']['output']>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
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

export type NewsfeedModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<NewsfeedModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<NewsfeedModelFilter>>>;
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
  publicationDate?: InputMaybe<DateFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum NewsfeedModelOrderBy {
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
  publicationDate_ASC = 'publicationDate_ASC',
  publicationDate_DESC = 'publicationDate_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Ξ Newsfeed (newsfeed) */
export type NewsfeedRecord = RecordInterface & {
  __typename: 'NewsfeedRecord';
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
  publicationDate?: Maybe<Scalars['Date']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type Ξ Newsfeed (newsfeed) */
export type NewsfeedRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ Newsfeed (newsfeed) */
export type NewsfeedRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ Newsfeed (newsfeed) */
export type NewsfeedRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

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
export type PersonRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type Ξ Potato Infographic (potato_infographic) */
export type PotatoInfographicRecord = RecordInterface & {
  __typename: 'PotatoInfographicRecord';
  _allDataProduktionBetriebsstrukturLocales?: Maybe<Array<FileFieldMultiLocaleField>>;
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
  dataProduktionBetriebsstruktur?: Maybe<FileField>;
  id: Scalars['ItemId']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  year?: Maybe<Scalars['String']['output']>;
};


/** Record of type Ξ Potato Infographic (potato_infographic) */
export type PotatoInfographicRecordAllDataProduktionBetriebsstrukturLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ Potato Infographic (potato_infographic) */
export type PotatoInfographicRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ Potato Infographic (potato_infographic) */
export type PotatoInfographicRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ Potato Infographic (potato_infographic) */
export type PotatoInfographicRecordDataProduktionBetriebsstrukturArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ Potato Infographic (potato_infographic) */
export type PotatoInfographicRecordTitleArgs = {
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

export type PowerBiDatasetRecordMultiLocaleField = {
  __typename: 'PowerBiDatasetRecordMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<PowerBiDatasetRecord>;
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

/** Record of type 🗂️ Power BI Report (power_bi_report) */
export type PowerBiReportRecord = RecordInterface & {
  __typename: 'PowerBiReportRecord';
  _allDatasetLocales?: Maybe<Array<PowerBiDatasetRecordMultiLocaleField>>;
  _allNameLocales?: Maybe<Array<StringMultiLocaleField>>;
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
  reportId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  workspace?: Maybe<PowerBiWorkspaceRecord>;
};


/** Record of type 🗂️ Power BI Report (power_bi_report) */
export type PowerBiReportRecordAllDatasetLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ Power BI Report (power_bi_report) */
export type PowerBiReportRecordAllNameLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
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
export type PowerBiReportRecordDatasetArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🗂️ Power BI Report (power_bi_report) */
export type PowerBiReportRecordNameArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
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
  _allDataDownloadItemsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allDataDownloadSectionsMeta: CollectionMetadata;
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
  _allNewsfeedsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allPeopleMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allPowerBiDatasetsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allPowerBiReportsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allPowerBiWorkspacesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allSimplePagesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allThemesMeta: CollectionMetadata;
  /** Returns meta information regarding an assets collection */
  _allUploadsMeta: CollectionMetadata;
  /** Returns the single instance record */
  _site: Site;
  /** Returns the single instance record */
  aboutPage?: Maybe<AboutPageRecord>;
  /** Returns a collection of records */
  allBlogPosts: Array<BlogPostRecord>;
  /** Returns a collection of records */
  allDataDownloadItems: Array<DataDownloadItemRecord>;
  /** Returns a collection of records */
  allDataDownloadSections: Array<DataDownloadSectionRecord>;
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
  allNewsfeeds: Array<NewsfeedRecord>;
  /** Returns a collection of records */
  allPeople: Array<PersonRecord>;
  /** Returns a collection of records */
  allPowerBiDatasets: Array<PowerBiDatasetRecord>;
  /** Returns a collection of records */
  allPowerBiReports: Array<PowerBiReportRecord>;
  /** Returns a collection of records */
  allPowerBiWorkspaces: Array<PowerBiWorkspaceRecord>;
  /** Returns a collection of records */
  allSimplePages: Array<SimplePageRecord>;
  /** Returns a collection of records */
  allThemes: Array<ThemeRecord>;
  /** Returns a collection of assets */
  allUploads: Array<FileField>;
  /** Returns the single instance record */
  analysisPage?: Maybe<AnalysisPageRecord>;
  /** Returns a specific record */
  blogPost?: Maybe<BlogPostRecord>;
  /** Returns a specific record */
  dataDownloadItem?: Maybe<DataDownloadItemRecord>;
  /** Returns a specific record */
  dataDownloadSection?: Maybe<DataDownloadSectionRecord>;
  /** Returns a specific record */
  focusArticle?: Maybe<FocusArticleRecord>;
  /** Returns a specific record */
  highlightSection?: Maybe<HighlightSectionRecord>;
  /** Returns a specific record */
  highlightSectionFile?: Maybe<HighlightSectionFileRecord>;
  /** Returns a specific record */
  highlightSectionLink?: Maybe<HighlightSectionLinkRecord>;
  /** Returns the single instance record */
  home?: Maybe<HomeRecord>;
  /** Returns the single instance record */
  homePage?: Maybe<HomePageRecord>;
  /** Returns the single instance record */
  legalPage?: Maybe<LegalPageRecord>;
  /** Returns a specific record */
  marketArticle?: Maybe<MarketArticleRecord>;
  /** Returns the single instance record */
  methodsPage?: Maybe<MethodsPageRecord>;
  /** Returns a specific record */
  newsfeed?: Maybe<NewsfeedRecord>;
  /** Returns a specific record */
  person?: Maybe<PersonRecord>;
  /** Returns the single instance record */
  potatoInfographic?: Maybe<PotatoInfographicRecord>;
  /** Returns a specific record */
  powerBiDataset?: Maybe<PowerBiDatasetRecord>;
  /** Returns a specific record */
  powerBiReport?: Maybe<PowerBiReportRecord>;
  /** Returns a specific record */
  powerBiWorkspace?: Maybe<PowerBiWorkspaceRecord>;
  /** Returns a specific record */
  simplePage?: Maybe<SimplePageRecord>;
  /** Returns the single instance record */
  termsPage?: Maybe<TermsPageRecord>;
  /** Returns a specific record */
  theme?: Maybe<ThemeRecord>;
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
export type QueryAllDataDownloadItemsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<DataDownloadItemModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllDataDownloadSectionsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<DataDownloadSectionModelFilter>;
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
export type QueryAllNewsfeedsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<NewsfeedModelFilter>;
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
export type QueryAllSimplePagesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<SimplePageModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllThemesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ThemeModelFilter>;
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
export type QueryAboutPageArgs = {
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
export type QueryAllDataDownloadItemsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<DataDownloadItemModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<DataDownloadItemModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllDataDownloadSectionsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<DataDownloadSectionModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<DataDownloadSectionModelOrderBy>>>;
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
export type QueryAllNewsfeedsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<NewsfeedModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<NewsfeedModelOrderBy>>>;
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
export type QueryAllSimplePagesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<SimplePageModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<SimplePageModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
};


/** The query root for this schema */
export type QueryAllThemesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ThemeModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ThemeModelOrderBy>>>;
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
export type QueryDataDownloadItemArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<DataDownloadItemModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<DataDownloadItemModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryDataDownloadSectionArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<DataDownloadSectionModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<DataDownloadSectionModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryFocusArticleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<FocusArticleModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<FocusArticleModelOrderBy>>>;
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
export type QueryHomeArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryHomePageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryLegalPageArgs = {
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
export type QueryNewsfeedArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<NewsfeedModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<NewsfeedModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryPersonArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PersonModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PersonModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryPotatoInfographicArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryPowerBiDatasetArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiDatasetModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PowerBiDatasetModelOrderBy>>>;
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
export type QuerySimplePageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<SimplePageModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<SimplePageModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryTermsPageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryThemeArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ThemeModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ThemeModelOrderBy>>>;
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

export type SimplePageModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<SimplePageModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SimplePageModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  author?: InputMaybe<LinkFilter>;
  body?: InputMaybe<TextFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum SimplePageModelOrderBy {
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

/** Record of type Ξ Simple Page (simple_page) */
export type SimplePageRecord = RecordInterface & {
  __typename: 'SimplePageRecord';
  _allBodyLocales?: Maybe<Array<StringMultiLocaleField>>;
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
  author: Scalars['String']['output'];
  body?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type Ξ Simple Page (simple_page) */
export type SimplePageRecordAllBodyLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Record of type Ξ Simple Page (simple_page) */
export type SimplePageRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ Simple Page (simple_page) */
export type SimplePageRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ Simple Page (simple_page) */
export type SimplePageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ Simple Page (simple_page) */
export type SimplePageRecordBodyArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Record of type Ξ Simple Page (simple_page) */
export type SimplePageRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ξ Simple Page (simple_page) */
export type SimplePageRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type Site = {
  __typename: 'Site';
  favicon?: Maybe<FileField>;
  faviconMetaTags: Array<Tag>;
  globalSeo?: Maybe<GlobalSeoField>;
  locales: Array<SiteLocale>;
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
  en = 'en',
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

export type TermsPageModelContentField = {
  __typename: 'TermsPageModelContentField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<Scalars['String']['output']>;
  value: Scalars['JsonField']['output'];
};

/** Record of type 🧑‍⚖️ Terms and Conditions Page (terms_page) */
export type TermsPageRecord = RecordInterface & {
  __typename: 'TermsPageRecord';
  _allLeadLocales?: Maybe<Array<StringMultiLocaleField>>;
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
  lead?: Maybe<Scalars['String']['output']>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type 🧑‍⚖️ Terms and Conditions Page (terms_page) */
export type TermsPageRecordAllLeadLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
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
export type TermsPageRecordLeadArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
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

export type ThemeModelBlocksField = DownloadTeaserBlockRecord | ExternalVideoBlockRecord | GalleryBlockRecord | IframeBlockRecord | ImageTeaserBlockRecord | MarkdownBlockRecord | SurveyBlockRecord;

export type ThemeModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<ThemeModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ThemeModelFilter>>>;
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
  lead?: InputMaybe<TextFilter>;
  seo?: InputMaybe<SeoFilter>;
  slug?: InputMaybe<SlugFilter>;
  tile?: InputMaybe<FileFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum ThemeModelOrderBy {
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

/** Record of type ΞTheme (theme) */
export type ThemeRecord = RecordInterface & {
  __typename: 'ThemeRecord';
  _allLeadLocales?: Maybe<Array<StringMultiLocaleField>>;
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
  blocks: Array<ThemeModelBlocksField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  lead?: Maybe<Scalars['String']['output']>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']['output']>;
  tile?: Maybe<FileField>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


/** Record of type ΞTheme (theme) */
export type ThemeRecordAllLeadLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Record of type ΞTheme (theme) */
export type ThemeRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ΞTheme (theme) */
export type ThemeRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ΞTheme (theme) */
export type ThemeRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ΞTheme (theme) */
export type ThemeRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ΞTheme (theme) */
export type ThemeRecordLeadArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Record of type ΞTheme (theme) */
export type ThemeRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ΞTheme (theme) */
export type ThemeRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type ΞTheme (theme) */
export type ThemeRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
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
  duration?: Maybe<Scalars['Int']['output']>;
  framerate?: Maybe<Scalars['Int']['output']>;
  mp4Url?: Maybe<Scalars['String']['output']>;
  muxAssetId: Scalars['String']['output'];
  muxPlaybackId: Scalars['String']['output'];
  streamingUrl: Scalars['String']['output'];
  thumbnailUrl: Scalars['String']['output'];
};


export type UploadVideoFieldMp4UrlArgs = {
  exactRes?: InputMaybe<VideoMp4Res>;
  res?: InputMaybe<VideoMp4Res>;
};


export type UploadVideoFieldThumbnailUrlArgs = {
  format?: InputMaybe<MuxThumbnailFormatType>;
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


export type HomePageQuery = { __typename: 'Query', homePage?: { __typename: 'HomePageRecord', id: any, title?: string | null, lead?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null, hero?: { __typename: 'FileField', id: any, url: string } | null, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> } | null, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, topBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, lead?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }> };

export type LegalPageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type LegalPageQuery = { __typename: 'Query', legalPage?: { __typename: 'LegalPageRecord', id: any, title?: string | null, slug?: string | null, lead?: string | null, content?: { __typename: 'LegalPageModelContentField', value: any } | null } | null, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> };

export type TermsPageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type TermsPageQuery = { __typename: 'Query', termsPage?: { __typename: 'TermsPageRecord', title?: string | null, slug?: string | null, lead?: string | null, content?: { __typename: 'TermsPageModelContentField', value: any } | null } | null, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> };

export type MarketPageQueryVariables = Exact<{
  locale: SiteLocale;
  slug: Scalars['String']['input'];
}>;


export type MarketPageQuery = { __typename: 'Query', marketArticle?: { __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null, lead?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null, content?: { __typename: 'MarketArticleModelContentField', value: any, blocks: Array<{ __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null }>, links: Array<{ __typename: 'DataDownloadSectionRecord', id: any, title?: string | null, dataDownloadItems: Array<{ __typename: 'DataDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string } | null }> } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null }> } | null, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null } | null, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, topBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, lead?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }> };

export type FocusArticlePageQueryVariables = Exact<{
  locale: SiteLocale;
  slug: Scalars['String']['input'];
}>;


export type FocusArticlePageQuery = { __typename: 'Query', focusArticle?: { __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null, lead?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null, content?: { __typename: 'FocusArticleModelContentField', value: any, blocks: Array<{ __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null }>, links: Array<{ __typename: 'DataDownloadSectionRecord', id: any, title?: string | null, dataDownloadItems: Array<{ __typename: 'DataDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string } | null }> } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null }> } | null, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null } | null, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, topBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, lead?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }> };

export type MethodsPageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type MethodsPageQuery = { __typename: 'Query', methodsPage?: { __typename: 'MethodsPageRecord', id: any, title?: string | null, lead?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null, content?: { __typename: 'MethodsPageModelContentField', value: any, blocks: Array<{ __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null }>, links: Array<{ __typename: 'DataDownloadSectionRecord', id: any, title?: string | null, dataDownloadItems: Array<{ __typename: 'DataDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string } | null }> } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null }> } | null } | null, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, topBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, lead?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }> };

export type AnalysisPageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type AnalysisPageQuery = { __typename: 'Query', analysisPage?: { __typename: 'AnalysisPageRecord', id: any, title?: string | null, lead?: string | null, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null } | null, _allBlogPostsMeta: { __typename: 'CollectionMetadata', count: number }, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, allBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, lead?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }> };

export type PaginatedBlogpostsQueryVariables = Exact<{
  locale: SiteLocale;
  first: Scalars['IntType']['input'];
  skip: Scalars['IntType']['input'];
}>;


export type PaginatedBlogpostsQuery = { __typename: 'Query', allBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, lead?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }> };

export type BlogPostQueryVariables = Exact<{
  locale: SiteLocale;
  slug: Scalars['String']['input'];
}>;


export type BlogPostQuery = { __typename: 'Query', blogPost?: { __typename: 'BlogPostRecord', id: any, publishedDate?: string | null, title?: string | null, lead?: string | null, slug?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null, authors: Array<{ __typename: 'PersonRecord', id: any, firstName?: string | null, lastName?: string | null, portrait?: { __typename: 'FileField', id: any, url: string } | null }>, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, content?: { __typename: 'BlogPostModelContentField', value: any, blocks: Array<{ __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null }>, links: Array<{ __typename: 'DataDownloadSectionRecord', id: any, title?: string | null, dataDownloadItems: Array<{ __typename: 'DataDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string } | null }> } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null }> } | null } | null, allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, topBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, lead?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> }> };

export type AllPowerBiReportsQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type AllPowerBiReportsQuery = { __typename: 'Query', allPowerBiReports: Array<{ __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, dataset?: { __typename: 'PowerBiDatasetRecord', datasetId?: string | null } | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null } | null }> };

export type AllMarketArticlesSlugLocalesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMarketArticlesSlugLocalesQuery = { __typename: 'Query', allMarketArticles: Array<{ __typename: 'MarketArticleRecord', id: any, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null }> };

export type AllFocusArticlesSlugLocalesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllFocusArticlesSlugLocalesQuery = { __typename: 'Query', allFocusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null }> };

export type AllBlogPostsSlugLocalesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBlogPostsSlugLocalesQuery = { __typename: 'Query', allBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null }> | null }> };

export type FullSeoFragment = { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null };

export type SimpleMarketArticleFragment = { __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null };

export type SimpleFocusArticleFragment = { __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null };

export type FullMarketArticleFragment = { __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null, lead?: string | null, content?: { __typename: 'MarketArticleModelContentField', value: any, blocks: Array<{ __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null }>, links: Array<{ __typename: 'DataDownloadSectionRecord', id: any, title?: string | null, dataDownloadItems: Array<{ __typename: 'DataDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string } | null }> } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null }> } | null, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null };

export type FullFocusArticleFragment = { __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null, lead?: string | null, content?: { __typename: 'FocusArticleModelContentField', value: any, blocks: Array<{ __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null }>, links: Array<{ __typename: 'DataDownloadSectionRecord', id: any, title?: string | null, dataDownloadItems: Array<{ __typename: 'DataDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string } | null }> } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null }> } | null, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null };

export type SimpleBlogPostFragment = { __typename: 'BlogPostRecord', id: any, title?: string | null, slug?: string | null, lead?: string | null, publishedDate?: string | null, image?: { __typename: 'FileField', id: any, alt?: string | null, url: string, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }> };

export type BlogPostFragment = { __typename: 'BlogPostRecord', id: any, publishedDate?: string | null, title?: string | null, lead?: string | null, slug?: string | null, authors: Array<{ __typename: 'PersonRecord', id: any, firstName?: string | null, lastName?: string | null, portrait?: { __typename: 'FileField', id: any, url: string } | null }>, markets: Array<{ __typename: 'MarketArticleRecord', id: any, title?: string | null, slug?: string | null }>, focusArticles: Array<{ __typename: 'FocusArticleRecord', id: any, title?: string | null, slug?: string | null }>, content?: { __typename: 'BlogPostModelContentField', value: any, blocks: Array<{ __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null }>, links: Array<{ __typename: 'DataDownloadSectionRecord', id: any, title?: string | null, dataDownloadItems: Array<{ __typename: 'DataDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string } | null }> } | { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null } | { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null }> } | null };

export type DownloadTeaserBlockFragment = { __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> };

export type ExternalVideoBlockFragment = { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null };

export type GalleryBlockFragment = { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> };

export type IframeBlockFragment = { __typename: 'IframeBlockRecord', id: any, url?: string | null };

export type MarkdownBlockFragment = { __typename: 'MarkdownBlockRecord', id: any, content?: string | null };

export type SurveyBlockFragment = { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> };

export type ImageTeaserBlockFragment = { __typename: 'ImageTeaserBlockRecord', id: any, imageTeaserAsset?: { __typename: 'FileField', customData: any, id: any, url: string, alt?: string | null, width?: number | null, height?: number | null, responsiveImage?: { __typename: 'ResponsiveImage', sizes: string, src: string, width: number, height: number, alt?: string | null, title?: string | null, base64?: string | null } | null } | null };

export type PowerBiFragment = { __typename: 'PowerBiReportRecord', id: any, reportId?: string | null, name?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', id: any, name?: string | null, workspaceId?: string | null } | null, dataset?: { __typename: 'PowerBiDatasetRecord', name?: string | null, id: any, datasetId?: string | null, workspace?: { __typename: 'PowerBiWorkspaceRecord', workspaceId?: string | null, name?: string | null, id: any } | null } | null };

export type DataDownloadSectionFragment = { __typename: 'DataDownloadSectionRecord', id: any, title?: string | null, dataDownloadItems: Array<{ __typename: 'DataDownloadItemRecord', id: any, title?: string | null, description?: string | null, date?: string | null, file?: { __typename: 'FileField', url: string, format: string } | null }> };

export type HighlightSectionFragment = { __typename: 'HighlightSectionRecord', id: any, title?: string | null, content?: { __typename: 'HighlightSectionModelContentField', value: any, links: Array<{ __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null } | { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null }> } | null };

export type HighlightSectionFileRecordFragment = { __typename: 'HighlightSectionFileRecord', id: any, title?: string | null, file?: { __typename: 'FileField', url: string } | null };

export type HighlightSectionLinkFragment = { __typename: 'HighlightSectionLinkRecord', id: any, title?: string | null, link?: { __typename: 'BlogPostRecord', id: any, slug?: string | null } | { __typename: 'FocusArticleRecord', id: any, slug?: string | null } | { __typename: 'MarketArticleRecord', id: any, slug?: string | null } | { __typename: 'MethodsPageRecord', id: any, slug?: string | null } | null };

export type DataButtonFragment = { __typename: 'DataButtonRecord', id: any, url?: string | null, label?: string | null };

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
export const DataButtonFragmentDoc = gql`
    fragment DataButton on DataButtonRecord {
  id
  url
  label
}
    `;
export const ImageTeaserBlockFragmentDoc = gql`
    fragment ImageTeaserBlock on ImageTeaserBlockRecord {
  id
  imageTeaserAsset {
    customData
    id
    url
    alt
    width
    height
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
}
    `;
export const DataDownloadSectionFragmentDoc = gql`
    fragment DataDownloadSection on DataDownloadSectionRecord {
  id
  title
  dataDownloadItems {
    id
    title
    description
    date
    file {
      url
      format
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
}
    `;
export const FullSeoFragmentDoc = gql`
    fragment FullSEO on SeoField {
  title
  description
  image {
    id
    url
  }
  twitterCard
}
    `;
export const FullMarketArticleFragmentDoc = gql`
    fragment FullMarketArticle on MarketArticleRecord {
  id
  title
  slug
  lead
  content {
    value
    blocks {
      __typename
      ...DataButton
      ...ImageTeaserBlock
    }
    links {
      __typename
      ...DataDownloadSection
      ...HighlightSection
      ...PowerBI
    }
  }
  seo {
    ...FullSEO
  }
}
    `;
export const FullFocusArticleFragmentDoc = gql`
    fragment FullFocusArticle on FocusArticleRecord {
  id
  title
  slug
  lead
  content {
    value
    blocks {
      __typename
      ...DataButton
      ...ImageTeaserBlock
    }
    links {
      __typename
      ...DataDownloadSection
      ...HighlightSection
      ...PowerBI
    }
  }
  seo {
    ...FullSEO
  }
}
    `;
export const SimpleBlogPostFragmentDoc = gql`
    fragment SimpleBlogPost on BlogPostRecord {
  id
  title
  slug
  lead
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
export const BlogPostFragmentDoc = gql`
    fragment BlogPost on BlogPostRecord {
  id
  publishedDate
  title
  lead
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
      ...DataButton
      ...ImageTeaserBlock
    }
    links {
      __typename
      ...DataDownloadSection
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
export const IframeBlockFragmentDoc = gql`
    fragment IframeBlock on IframeBlockRecord {
  id
  url
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
export const HomePageDocument = gql`
    query HomePage($locale: SiteLocale!) {
  homePage(locale: $locale) {
    _allSlugLocales {
      locale
      value
    }
    id
    title
    lead
    hero {
      id
      url
    }
    seo {
      ...FullSEO
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
  }
  allMarketArticles(locale: $locale) {
    ...SimpleMarketArticle
  }
  allFocusArticles(locale: $locale) {
    ...SimpleFocusArticle
  }
  topBlogPosts: allBlogPosts(locale: $locale, first: 3) {
    ...SimpleBlogPost
  }
}
    ${FullSeoFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}
${SimpleBlogPostFragmentDoc}`;

export function useHomePageQuery(options: Omit<Urql.UseQueryArgs<HomePageQueryVariables>, 'query'>) {
  return Urql.useQuery<HomePageQuery, HomePageQueryVariables>({ query: HomePageDocument, ...options });
};
export const LegalPageDocument = gql`
    query LegalPage($locale: SiteLocale!) {
  legalPage(locale: $locale) {
    id
    title
    slug
    lead
    content {
      value
    }
  }
  allMarketArticles(locale: $locale) {
    ...SimpleMarketArticle
  }
  allFocusArticles(locale: $locale) {
    ...SimpleFocusArticle
  }
}
    ${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}`;

export function useLegalPageQuery(options: Omit<Urql.UseQueryArgs<LegalPageQueryVariables>, 'query'>) {
  return Urql.useQuery<LegalPageQuery, LegalPageQueryVariables>({ query: LegalPageDocument, ...options });
};
export const TermsPageDocument = gql`
    query TermsPage($locale: SiteLocale!) {
  termsPage(locale: $locale) {
    title
    slug
    lead
    content {
      value
    }
  }
  allMarketArticles(locale: $locale) {
    ...SimpleMarketArticle
  }
  allFocusArticles(locale: $locale) {
    ...SimpleFocusArticle
  }
}
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
    ...FullMarketArticle
  }
  allMarketArticles(locale: $locale) {
    ...SimpleMarketArticle
  }
  allFocusArticles(locale: $locale) {
    ...SimpleFocusArticle
  }
  topBlogPosts: allBlogPosts(locale: $locale, first: 3) {
    ...SimpleBlogPost
  }
}
    ${FullMarketArticleFragmentDoc}
${DataButtonFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${DataDownloadSectionFragmentDoc}
${HighlightSectionFragmentDoc}
${HighlightSectionFileRecordFragmentDoc}
${HighlightSectionLinkFragmentDoc}
${PowerBiFragmentDoc}
${FullSeoFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}
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
    ...FullFocusArticle
  }
  allMarketArticles(locale: $locale) {
    ...SimpleMarketArticle
  }
  allFocusArticles(locale: $locale) {
    ...SimpleFocusArticle
  }
  topBlogPosts: allBlogPosts(locale: $locale, first: 3) {
    ...SimpleBlogPost
  }
}
    ${FullFocusArticleFragmentDoc}
${DataButtonFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${DataDownloadSectionFragmentDoc}
${HighlightSectionFragmentDoc}
${HighlightSectionFileRecordFragmentDoc}
${HighlightSectionLinkFragmentDoc}
${PowerBiFragmentDoc}
${FullSeoFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}
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
    lead
    seo {
      ...FullSEO
    }
    content {
      value
      blocks {
        __typename
        ...DataButton
        ...ImageTeaserBlock
      }
      links {
        __typename
        ...DataDownloadSection
        ...HighlightSection
        ...PowerBI
      }
    }
  }
  allMarketArticles(locale: $locale) {
    ...SimpleMarketArticle
  }
  allFocusArticles(locale: $locale) {
    ...SimpleFocusArticle
  }
  topBlogPosts: allBlogPosts(locale: $locale, first: 3) {
    ...SimpleBlogPost
  }
}
    ${FullSeoFragmentDoc}
${DataButtonFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${DataDownloadSectionFragmentDoc}
${HighlightSectionFragmentDoc}
${HighlightSectionFileRecordFragmentDoc}
${HighlightSectionLinkFragmentDoc}
${PowerBiFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}
${SimpleBlogPostFragmentDoc}`;

export function useMethodsPageQuery(options: Omit<Urql.UseQueryArgs<MethodsPageQueryVariables>, 'query'>) {
  return Urql.useQuery<MethodsPageQuery, MethodsPageQueryVariables>({ query: MethodsPageDocument, ...options });
};
export const AnalysisPageDocument = gql`
    query AnalysisPage($locale: SiteLocale!) {
  analysisPage(locale: $locale) {
    id
    title
    lead
    seo {
      ...FullSEO
    }
  }
  _allBlogPostsMeta {
    count
  }
  allMarketArticles(locale: $locale) {
    ...SimpleMarketArticle
  }
  allFocusArticles(locale: $locale) {
    ...SimpleFocusArticle
  }
  allBlogPosts(locale: $locale, first: 7) {
    ...SimpleBlogPost
  }
}
    ${FullSeoFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}
${SimpleBlogPostFragmentDoc}`;

export function useAnalysisPageQuery(options: Omit<Urql.UseQueryArgs<AnalysisPageQueryVariables>, 'query'>) {
  return Urql.useQuery<AnalysisPageQuery, AnalysisPageQueryVariables>({ query: AnalysisPageDocument, ...options });
};
export const PaginatedBlogpostsDocument = gql`
    query paginatedBlogposts($locale: SiteLocale!, $first: IntType!, $skip: IntType!) {
  allBlogPosts(locale: $locale, first: $first, skip: $skip) {
    ...SimpleBlogPost
  }
}
    ${SimpleBlogPostFragmentDoc}`;

export function usePaginatedBlogpostsQuery(options: Omit<Urql.UseQueryArgs<PaginatedBlogpostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PaginatedBlogpostsQuery, PaginatedBlogpostsQueryVariables>({ query: PaginatedBlogpostsDocument, ...options });
};
export const BlogPostDocument = gql`
    query BlogPost($locale: SiteLocale!, $slug: String!) {
  blogPost(locale: $locale, filter: {slug: {eq: $slug}}) {
    ...BlogPost
    id
    _allSlugLocales {
      locale
      value
    }
  }
  allMarketArticles(locale: $locale) {
    ...SimpleMarketArticle
  }
  allFocusArticles(locale: $locale) {
    ...SimpleFocusArticle
  }
  topBlogPosts: allBlogPosts(locale: $locale, first: 3) {
    ...SimpleBlogPost
  }
}
    ${BlogPostFragmentDoc}
${DataButtonFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${DataDownloadSectionFragmentDoc}
${HighlightSectionFragmentDoc}
${HighlightSectionFileRecordFragmentDoc}
${HighlightSectionLinkFragmentDoc}
${PowerBiFragmentDoc}
${SimpleMarketArticleFragmentDoc}
${SimpleFocusArticleFragmentDoc}
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
  }
}
    `;

export function useAllPowerBiReportsQuery(options: Omit<Urql.UseQueryArgs<AllPowerBiReportsQueryVariables>, 'query'>) {
  return Urql.useQuery<AllPowerBiReportsQuery, AllPowerBiReportsQueryVariables>({ query: AllPowerBiReportsDocument, ...options });
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