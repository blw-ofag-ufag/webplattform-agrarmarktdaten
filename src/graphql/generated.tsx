import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents `true` or `false` values. */
  BooleanType: boolean;
  CustomData: any;
  /** A ISO 8601 compliant date value */
  Date: string;
  /** A ISO 8601 compliant datetime value */
  DateTime: string;
  /** Represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). */
  FloatType: number;
  /** Represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  IntType: number;
  ItemId: any;
  MetaTagAttributes: any;
  UploadId: any;
};

/** Record of type 🌐 About (about_page) */
export type AboutPageRecord = {
  __typename: 'AboutPageRecord';
  _allLeadLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _allSeoLocales?: Maybe<Array<Maybe<SeoFieldMultiLocaleField>>>;
  _allSlugLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _allTitleLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  lead?: Maybe<Scalars['String']>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type 🌐 About (about_page) */
export type AboutPageRecordAllLeadLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']>;
};


/** Record of type 🌐 About (about_page) */
export type AboutPageRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 About (about_page) */
export type AboutPageRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 About (about_page) */
export type AboutPageRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 About (about_page) */
export type AboutPageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 About (about_page) */
export type AboutPageRecordLeadArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']>;
};


/** Record of type 🌐 About (about_page) */
export type AboutPageRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 About (about_page) */
export type AboutPageRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 About (about_page) */
export type AboutPageRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type 🌐 Blog (blog_page) */
export type BlogPageRecord = {
  __typename: 'BlogPageRecord';
  _allLeadLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _allSeoLocales?: Maybe<Array<Maybe<SeoFieldMultiLocaleField>>>;
  _allSlugLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _allTitleLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  lead?: Maybe<Scalars['String']>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type 🌐 Blog (blog_page) */
export type BlogPageRecordAllLeadLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']>;
};


/** Record of type 🌐 Blog (blog_page) */
export type BlogPageRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 Blog (blog_page) */
export type BlogPageRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 Blog (blog_page) */
export type BlogPageRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 Blog (blog_page) */
export type BlogPageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 Blog (blog_page) */
export type BlogPageRecordLeadArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']>;
};


/** Record of type 🌐 Blog (blog_page) */
export type BlogPageRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 Blog (blog_page) */
export type BlogPageRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 Blog (blog_page) */
export type BlogPageRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type BlogPostModelBlocksField = DownloadTeaserBlockRecord | ExternalVideoBlockRecord | GalleryBlockRecord | IframeBlockRecord | ImageTeaserBlockRecord | MarkdownBlockRecord | SurveyBlockRecord;

export type BlogPostModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<BlogPostModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  author?: InputMaybe<LinkFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  image?: InputMaybe<FileFilter>;
  lead?: InputMaybe<TextFilter>;
  markets?: InputMaybe<LinksFilter>;
  seo?: InputMaybe<SeoFilter>;
  slug?: InputMaybe<SlugFilter>;
  themes?: InputMaybe<LinksFilter>;
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
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Blog Post (blog_post) */
export type BlogPostRecord = {
  __typename: 'BlogPostRecord';
  _allLeadLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _allSeoLocales?: Maybe<Array<Maybe<SeoFieldMultiLocaleField>>>;
  _allSlugLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _allTitleLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  author?: Maybe<PersonRecord>;
  blocks: Array<BlogPostModelBlocksField>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  image?: Maybe<FileField>;
  lead?: Maybe<Scalars['String']>;
  markets: Array<MarketRecord>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']>;
  themes: Array<ThemeRecord>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Blog Post (blog_post) */
export type BlogPostRecordAllLeadLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']>;
};


/** Record of type Blog Post (blog_post) */
export type BlogPostRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Blog Post (blog_post) */
export type BlogPostRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Blog Post (blog_post) */
export type BlogPostRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Blog Post (blog_post) */
export type BlogPostRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Blog Post (blog_post) */
export type BlogPostRecordLeadArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']>;
};


/** Record of type Blog Post (blog_post) */
export type BlogPostRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Blog Post (blog_post) */
export type BlogPostRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Blog Post (blog_post) */
export type BlogPostRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter Boolean fields */
export type BooleanFilter = {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['BooleanType']>;
};

export type CollectionMetadata = {
  __typename: 'CollectionMetadata';
  count: Scalars['IntType'];
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
  alpha: Scalars['IntType'];
  blue: Scalars['IntType'];
  green: Scalars['IntType'];
  hex: Scalars['String'];
  red: Scalars['IntType'];
};

/** Specifies how to filter by creation datetime */
export type CreatedAtFilter = {
  /** Filter records with a value that's within the specified minute range. Seconds and milliseconds are truncated from the argument. */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']>;
};

/** Specifies how to filter Date fields */
export type DateFilter = {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['Date']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['Date']>;
  /** Filter records with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['Date']>;
  /** Filter records with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['Date']>;
  /** Filter records with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['Date']>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['Date']>;
};

/** Record of type Download Teaser Asset (download_teaser_asset) */
export type DownloadTeaserAssetRecord = {
  __typename: 'DownloadTeaserAssetRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  file?: Maybe<FileField>;
  id: Scalars['ItemId'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Download Teaser Asset (download_teaser_asset) */
export type DownloadTeaserAssetRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type Download Teaser (download_teaser_block) */
export type DownloadTeaserBlockRecord = {
  __typename: 'DownloadTeaserBlockRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  downloadTeaserAssets: Array<DownloadTeaserAssetRecord>;
  id: Scalars['ItemId'];
  markdown?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Download Teaser (download_teaser_block) */
export type DownloadTeaserBlockRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Download Teaser (download_teaser_block) */
export type DownloadTeaserBlockRecordDescriptionArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};


/** Record of type Download Teaser (download_teaser_block) */
export type DownloadTeaserBlockRecordMarkdownArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

/** Record of type External Video (external_video_block) */
export type ExternalVideoBlockRecord = {
  __typename: 'ExternalVideoBlockRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  externalVideo?: Maybe<VideoField>;
  id: Scalars['ItemId'];
  updatedAt: Scalars['DateTime'];
};


/** Record of type External Video (external_video_block) */
export type ExternalVideoBlockRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

export enum FaviconType {
  appleTouchIcon = 'appleTouchIcon',
  icon = 'icon',
  msApplication = 'msApplication'
}

export type FileField = {
  __typename: 'FileField';
  _createdAt: Scalars['DateTime'];
  _updatedAt: Scalars['DateTime'];
  alt?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  basename: Scalars['String'];
  blurUpThumb?: Maybe<Scalars['String']>;
  blurhash?: Maybe<Scalars['String']>;
  colors: Array<ColorField>;
  copyright?: Maybe<Scalars['String']>;
  customData: Scalars['CustomData'];
  exifInfo: Scalars['CustomData'];
  filename: Scalars['String'];
  focalPoint?: Maybe<FocalPoint>;
  format: Scalars['String'];
  height?: Maybe<Scalars['IntType']>;
  id: Scalars['UploadId'];
  md5: Scalars['String'];
  mimeType: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  responsiveImage?: Maybe<ResponsiveImage>;
  size: Scalars['IntType'];
  smartTags: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  video?: Maybe<UploadVideoField>;
  width?: Maybe<Scalars['IntType']>;
};


export type FileFieldAltArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldBlurUpThumbArgs = {
  imgixParams?: InputMaybe<ImgixParams>;
  punch?: InputMaybe<Scalars['Float']>;
  quality?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
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
  sizes?: InputMaybe<Scalars['String']>;
};


export type FileFieldTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldUrlArgs = {
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
  eq?: InputMaybe<Scalars['UploadId']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records that have one of the specified uploads */
  in?: InputMaybe<Array<InputMaybe<Scalars['UploadId']>>>;
  /** Exclude records with an exact match. The specified value must be an Upload ID */
  neq?: InputMaybe<Scalars['UploadId']>;
  /** Filter records that do not have one of the specified uploads */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['UploadId']>>>;
};

/** Record of type Gallery (gallery_block) */
export type GalleryBlockRecord = {
  __typename: 'GalleryBlockRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  galleryAssets: Array<FileField>;
  id: Scalars['ItemId'];
  updatedAt: Scalars['DateTime'];
};


/** Record of type Gallery (gallery_block) */
export type GalleryBlockRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

export type GlobalSeoField = {
  __typename: 'GlobalSeoField';
  facebookPageUrl?: Maybe<Scalars['String']>;
  fallbackSeo?: Maybe<SeoField>;
  siteName?: Maybe<Scalars['String']>;
  titleSuffix?: Maybe<Scalars['String']>;
  twitterAccount?: Maybe<Scalars['String']>;
};

/** Record of type 🌐 Home (home_page) */
export type HomePageRecord = {
  __typename: 'HomePageRecord';
  _allLeadLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _allSeoLocales?: Maybe<Array<Maybe<SeoFieldMultiLocaleField>>>;
  _allTitleLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  lead?: Maybe<Scalars['String']>;
  seo?: Maybe<SeoField>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type 🌐 Home (home_page) */
export type HomePageRecordAllLeadLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']>;
};


/** Record of type 🌐 Home (home_page) */
export type HomePageRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 Home (home_page) */
export type HomePageRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 Home (home_page) */
export type HomePageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 Home (home_page) */
export type HomePageRecordLeadArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']>;
};


/** Record of type 🌐 Home (home_page) */
export type HomePageRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type 🌐 Home (home_page) */
export type HomePageRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type iFrame (iframe_block) */
export type IframeBlockRecord = {
  __typename: 'IframeBlockRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};


/** Record of type iFrame (iframe_block) */
export type IframeBlockRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type Image Teaser (image_teaser_block) */
export type ImageTeaserBlockRecord = {
  __typename: 'ImageTeaserBlockRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ItemId'];
  imageTeaserAsset?: Maybe<FileField>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Image Teaser (image_teaser_block) */
export type ImageTeaserBlockRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Image Teaser (image_teaser_block) */
export type ImageTeaserBlockRecordDescriptionArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
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
  ar?: InputMaybe<Scalars['String']>;
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
  bg?: InputMaybe<Scalars['String']>;
  /**
   * Blend
   *
   * Specifies the location of the blend image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend)
   */
  blend?: InputMaybe<Scalars['String']>;
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
  blendAlpha?: InputMaybe<Scalars['IntType']>;
  /**
   * Blend Color
   *
   * Specifies a color to use when applying the blend.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-color)
   */
  blendColor?: InputMaybe<Scalars['String']>;
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
  blendH?: InputMaybe<Scalars['FloatType']>;
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
  blendPad?: InputMaybe<Scalars['IntType']>;
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
  blendW?: InputMaybe<Scalars['FloatType']>;
  /**
   * Blend X Position
   *
   * Adjusts the x-offset of the blend image relative to its parent.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-x)
   */
  blendX?: InputMaybe<Scalars['IntType']>;
  /**
   * Blend Y Position
   *
   * Adjusts the y-offset of the blend image relative to its parent.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-y)
   */
  blendY?: InputMaybe<Scalars['IntType']>;
  /**
   * Gaussian Blur
   *
   * Applies a gaussian blur to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/blur)
   */
  blur?: InputMaybe<Scalars['IntType']>;
  /**
   * Border Size & Color
   *
   * Applies a border to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border)
   */
  border?: InputMaybe<Scalars['String']>;
  /**
   * Border Bottom
   *
   * Sets bottom border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-bottom)
   */
  borderBottom?: InputMaybe<Scalars['IntType']>;
  /**
   * Border Left
   *
   * Sets left border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-left)
   */
  borderLeft?: InputMaybe<Scalars['IntType']>;
  /**
   * Outer Border Radius
   *
   * Sets the outer radius of the image's border in pixels.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-radius)
   */
  borderRadius?: InputMaybe<Scalars['String']>;
  /**
   * Inner Border Radius
   *
   * Sets the inner radius of the image's border in pixels.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-radius-inner)
   */
  borderRadiusInner?: InputMaybe<Scalars['String']>;
  /**
   * Border Right
   *
   * Sets right border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-right)
   */
  borderRight?: InputMaybe<Scalars['IntType']>;
  /**
   * Border Top
   *
   * Sets top border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-top)
   */
  borderTop?: InputMaybe<Scalars['IntType']>;
  /**
   * Brightness
   *
   * Adjusts the brightness of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/bri)
   */
  bri?: InputMaybe<Scalars['IntType']>;
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
  chromasub?: InputMaybe<Scalars['IntType']>;
  /**
   * Color Quantization
   *
   * Limits the number of unique colors in an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/colorquant)
   */
  colorquant?: InputMaybe<Scalars['IntType']>;
  /**
   * Palette Color Count
   *
   * Specifies how many colors to include in a palette-extraction response.
   *
   * Depends on: `palette`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/color-palette/colors)
   */
  colors?: InputMaybe<Scalars['IntType']>;
  /**
   * Contrast
   *
   * Adjusts the contrast of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/con)
   */
  con?: InputMaybe<Scalars['IntType']>;
  /**
   * Mask Corner Radius
   *
   * Specifies the radius value for a rounded corner mask.
   *
   * Depends on: `mask=corners`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask/corner-radius)
   */
  cornerRadius?: InputMaybe<Scalars['String']>;
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
  dl?: InputMaybe<Scalars['String']>;
  /**
   * Dots Per Inch
   *
   * Sets the DPI value in the EXIF header.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/dpi)
   */
  dpi?: InputMaybe<Scalars['IntType']>;
  /**
   * Device Pixel Ratio
   *
   * Adjusts the device-pixel ratio of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/dpr)
   */
  dpr?: InputMaybe<Scalars['FloatType']>;
  /**
   * Duotone
   *
   * Applies a duotone effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/duotone)
   */
  duotone?: InputMaybe<Scalars['String']>;
  /**
   * Duotone Alpha
   *
   * Changes the alpha of the duotone effect atop the source image.
   *
   * Depends on: `duotone`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/duotone-alpha)
   */
  duotoneAlpha?: InputMaybe<Scalars['IntType']>;
  /**
   * Exposure
   *
   * Adjusts the exposure of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/exp)
   */
  exp?: InputMaybe<Scalars['IntType']>;
  /**
   * Url Expiration Timestamp
   *
   * A Unix timestamp specifying a UTC time. Requests made to this URL after that time will output a 404 status code.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/expires)
   */
  expires?: InputMaybe<Scalars['IntType']>;
  /**
   * Face Index
   *
   * Selects a face to crop to.
   *
   * Depends on: `fit=facearea`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/faceindex)
   */
  faceindex?: InputMaybe<Scalars['IntType']>;
  /**
   * Face Padding
   *
   * Adjusts padding around a selected face.
   *
   * Depends on: `fit=facearea`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/facepad)
   */
  facepad?: InputMaybe<Scalars['FloatType']>;
  /**
   * Json Face Data
   *
   * Specifies that face data should be included in output when combined with `fm=json`.
   *
   * Depends on: `fm=json`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/faces)
   */
  faces?: InputMaybe<Scalars['IntType']>;
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
  fillColor?: InputMaybe<Scalars['String']>;
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
  fpDebug?: InputMaybe<Scalars['BooleanType']>;
  /**
   * Focal Point X Position
   *
   * Sets the relative horizontal value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-x)
   */
  fpX?: InputMaybe<Scalars['FloatType']>;
  /**
   * Focal Point Y Position
   *
   * Sets the relative vertical value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-y)
   */
  fpY?: InputMaybe<Scalars['FloatType']>;
  /**
   * Focal Point Zoom
   *
   * Sets the relative zoom value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-z)
   */
  fpZ?: InputMaybe<Scalars['FloatType']>;
  /**
   * Gamma
   *
   * Adjusts the gamma of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/gam)
   */
  gam?: InputMaybe<Scalars['IntType']>;
  /**
   * Grid Colors
   *
   * Sets grid colors for the transparency checkerboard grid.
   *
   * Depends on: `transparency`
   */
  gridColors?: InputMaybe<Scalars['String']>;
  /**
   * Grid Size
   *
   * Sets grid size for the transparency checkerboard grid.
   *
   * Depends on: `transparency`
   */
  gridSize?: InputMaybe<Scalars['IntType']>;
  /**
   * Image Height
   *
   * Adjusts the height of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/h)
   */
  h?: InputMaybe<Scalars['FloatType']>;
  /**
   * Highlight
   *
   * Adjusts the highlights of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/high)
   */
  high?: InputMaybe<Scalars['IntType']>;
  /**
   * Halftone
   *
   * Applies a half-tone effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/htn)
   */
  htn?: InputMaybe<Scalars['IntType']>;
  /**
   * Hue Shift
   *
   * Adjusts the hue of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/hue)
   */
  hue?: InputMaybe<Scalars['IntType']>;
  /**
   * Invert
   *
   * Inverts the colors on the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/invert)
   */
  invert?: InputMaybe<Scalars['BooleanType']>;
  /**
   * Iptc Passthrough
   *
   * Determine if IPTC data should be passed for JPEG images.
   */
  iptc?: InputMaybe<ImgixParamsIptc>;
  /**
   * Lossless Compression
   *
   * Specifies that the output image should be a lossless variant.
   *
   * Depends on: `fm=webp`, `fm=jxr`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/lossless)
   */
  lossless?: InputMaybe<Scalars['BooleanType']>;
  /**
   * Watermark Image Url
   *
   * Specifies the location of the watermark image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark)
   */
  mark?: InputMaybe<Scalars['String']>;
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
  markAlpha?: InputMaybe<Scalars['IntType']>;
  /**
   * Watermark Base Url
   *
   * Changes base URL of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-base)
   */
  markBase?: InputMaybe<Scalars['String']>;
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
  markH?: InputMaybe<Scalars['FloatType']>;
  /**
   * Watermark Padding
   *
   * Applies padding to the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-pad)
   */
  markPad?: InputMaybe<Scalars['IntType']>;
  /**
   * Watermark Rotation
   *
   * Rotates a watermark or tiled watermarks by a specified number of degrees.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-rot)
   */
  markRot?: InputMaybe<Scalars['FloatType']>;
  /**
   * Watermark Scale
   *
   * Adjusts the scale of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-scale)
   */
  markScale?: InputMaybe<Scalars['IntType']>;
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
  markW?: InputMaybe<Scalars['FloatType']>;
  /**
   * Watermark X Position
   *
   * Adjusts the x-offset of the watermark image relative to its parent.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-x)
   */
  markX?: InputMaybe<Scalars['IntType']>;
  /**
   * Watermark Y Position
   *
   * Adjusts the y-offset of the watermark image relative to its parent.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-y)
   */
  markY?: InputMaybe<Scalars['IntType']>;
  /**
   * Mask Type
   *
   * Defines the type of mask and specifies the URL if that type is selected.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask)
   */
  mask?: InputMaybe<Scalars['String']>;
  /**
   * Mask Background Color
   *
   * Colors the background of the transparent mask area of images
   *
   * Depends on: `mask`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask/mask-bg)
   */
  maskBg?: InputMaybe<Scalars['String']>;
  /**
   * Maximum Height
   *
   * Specifies the maximum height of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/max-height)
   */
  maxH?: InputMaybe<Scalars['IntType']>;
  /**
   * Maximum Width
   *
   * Specifies the maximum width of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/max-width)
   */
  maxW?: InputMaybe<Scalars['IntType']>;
  /**
   * Minimum Height
   *
   * Specifies the minimum height of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/min-height)
   */
  minH?: InputMaybe<Scalars['IntType']>;
  /**
   * Minimum Width
   *
   * Specifies the minimum width of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/min-width)
   */
  minW?: InputMaybe<Scalars['IntType']>;
  /**
   * Monochrome
   *
   * Applies a monochrome effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/monochrome)
   */
  monochrome?: InputMaybe<Scalars['String']>;
  /**
   * Noise Reduction Bound
   *
   * Reduces the noise in an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/noise-reduction/nr)
   */
  nr?: InputMaybe<Scalars['IntType']>;
  /**
   * Noise Reduction Sharpen
   *
   * Provides a threshold by which to sharpen an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/noise-reduction/nrs)
   */
  nrs?: InputMaybe<Scalars['IntType']>;
  /**
   * Orientation
   *
   * Changes the image orientation.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/rotation/orient)
   */
  orient?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding
   *
   * Pads an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad)
   */
  pad?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding Bottom
   *
   * Sets bottom padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-bottom)
   */
  padBottom?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding Left
   *
   * Sets left padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-left)
   */
  padLeft?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding Right
   *
   * Sets right padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-right)
   */
  padRight?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding Top
   *
   * Sets top padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-top)
   */
  padTop?: InputMaybe<Scalars['IntType']>;
  /**
   * Pdf Page Number
   *
   * Selects a page from a PDF for display.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/pdf/page)
   */
  page?: InputMaybe<Scalars['IntType']>;
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
  pdfAnnotation?: InputMaybe<Scalars['BooleanType']>;
  /**
   * Css Prefix
   *
   * Specifies a CSS prefix for all classes in palette-extraction.
   *
   * Depends on: `palette=css`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/color-palette/prefix)
   */
  prefix?: InputMaybe<Scalars['String']>;
  /**
   * Pixellate
   *
   * Applies a pixelation effect to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/px)
   */
  px?: InputMaybe<Scalars['IntType']>;
  /**
   * Output Quality
   *
   * Adjusts the quality of an output image.
   *
   * Depends on: `fm=jpg`, `fm=pjpg`, `fm=webp`, `fm=jxr`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/q)
   */
  q?: InputMaybe<Scalars['IntType']>;
  /**
   * Source Rectangle Region
   *
   * Crops an image to a specified rectangle.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/rect)
   */
  rect?: InputMaybe<Scalars['String']>;
  /**
   * Rotation
   *
   * Rotates an image by a specified number of degrees.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/rotation/rot)
   */
  rot?: InputMaybe<Scalars['FloatType']>;
  /**
   * Saturation
   *
   * Adjusts the saturation of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/sat)
   */
  sat?: InputMaybe<Scalars['IntType']>;
  /**
   * Sepia Tone
   *
   * Applies a sepia effect to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/sepia)
   */
  sepia?: InputMaybe<Scalars['IntType']>;
  /**
   * Shadow
   *
   * Adjusts the highlights of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/shad)
   */
  shad?: InputMaybe<Scalars['FloatType']>;
  /**
   * Sharpen
   *
   * Adjusts the sharpness of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/sharp)
   */
  sharp?: InputMaybe<Scalars['FloatType']>;
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
  trimColor?: InputMaybe<Scalars['String']>;
  /**
   * Trim Mean Difference
   *
   * Specifies the mean difference on a trim operation.
   *
   * Depends on: `trim=auto`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-md)
   */
  trimMd?: InputMaybe<Scalars['FloatType']>;
  /**
   * Trim Padding
   *
   * Pads the area of the source image before trimming.
   *
   * Depends on: `trim`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-pad)
   */
  trimPad?: InputMaybe<Scalars['IntType']>;
  /**
   * Trim Standard Deviation
   *
   * Specifies the standard deviation on a trim operation.
   *
   * Depends on: `trim=auto`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-sd)
   */
  trimSd?: InputMaybe<Scalars['FloatType']>;
  /**
   * Trim Tolerance
   *
   * Specifies the tolerance on a trim operation.
   *
   * Depends on: `trim=color`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-tol)
   */
  trimTol?: InputMaybe<Scalars['FloatType']>;
  /**
   * Text String
   *
   * Sets the text string to render.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt)
   */
  txt?: InputMaybe<Scalars['String']>;
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
  txtColor?: InputMaybe<Scalars['String']>;
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
  txtFont?: InputMaybe<Scalars['String']>;
  /**
   * Text Leading
   *
   * Sets the leading (line spacing) for rendered text. Only works on the multi-line text endpoint.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/typesetting/txt-lead)
   */
  txtLead?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Ligatures
   *
   * Controls the level of ligature substitution
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-lig)
   */
  txtLig?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Outline
   *
   * Outlines the rendered text with a specified color.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-line)
   */
  txtLine?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Outline Color
   *
   * Specifies a text outline color.
   *
   * Depends on: `txt`, `txtline`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-line-color)
   */
  txtLineColor?: InputMaybe<Scalars['String']>;
  /**
   * Text Padding
   *
   * Specifies the padding (in device-independent pixels) between a textbox and the edges of the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-pad)
   */
  txtPad?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Shadow
   *
   * Applies a shadow to rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-shad)
   */
  txtShad?: InputMaybe<Scalars['FloatType']>;
  /**
   * Text Font Size
   *
   * Sets the font size of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-size)
   */
  txtSize?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Tracking
   *
   * Sets the tracking (letter spacing) for rendered text. Only works on the multi-line text endpoint.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/typesetting/txt-track)
   */
  txtTrack?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Width
   *
   * Sets the width of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-width)
   */
  txtWidth?: InputMaybe<Scalars['IntType']>;
  /**
   * Unsharp Mask
   *
   * Sharpens the source image using an unsharp mask.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/usm)
   */
  usm?: InputMaybe<Scalars['IntType']>;
  /**
   * Unsharp Mask Radius
   *
   * Specifies the radius for an unsharp mask operation.
   *
   * Depends on: `usm`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/usmrad)
   */
  usmrad?: InputMaybe<Scalars['FloatType']>;
  /**
   * Vibrance
   *
   * Adjusts the vibrance of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/vib)
   */
  vib?: InputMaybe<Scalars['IntType']>;
  /**
   * Image Width
   *
   * Adjusts the width of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/w)
   */
  w?: InputMaybe<Scalars['FloatType']>;
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
  eq?: InputMaybe<Scalars['BooleanType']>;
};

/** Specifies how to filter by ID */
export type ItemIdFilter = {
  /** Search the record with the specified ID */
  eq?: InputMaybe<Scalars['ItemId']>;
  /** Search records with the specified IDs */
  in?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Exclude the record with the specified ID */
  neq?: InputMaybe<Scalars['ItemId']>;
  /** Search records that do not have the specified IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
};

export enum ItemStatus {
  draft = 'draft',
  published = 'published',
  updated = 'updated'
}

/** Specifies how to filter Single-link fields */
export type LinkFilter = {
  /** Search for records with an exact match. The specified value must be a Record ID */
  eq?: InputMaybe<Scalars['ItemId']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records linked to one of the specified records */
  in?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Exclude records with an exact match. The specified value must be a Record ID */
  neq?: InputMaybe<Scalars['ItemId']>;
  /** Filter records not linked to one of the specified records */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
};

/** Specifies how to filter Multiple-links fields */
export type LinksFilter = {
  /** Filter records linked to all of the specified records. The specified values must be Record IDs */
  allIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Filter records linked to at least one of the specified records. The specified values must be Record IDs */
  anyIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Search for records with an exact match. The specified values must be Record IDs */
  eq?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records not linked to any of the specified records. The specified values must be Record IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
};

/** Specifies how to filter by locale */
export type LocalesFilter = {
  /** Filter records that are localized in all the specified locales */
  allIn?: InputMaybe<Array<SiteLocale>>;
  /** Filter records that are localized in at least one of the specified locales */
  anyIn?: InputMaybe<Array<SiteLocale>>;
  /** Filter records that are not localized in any of the specified locales */
  notIn?: InputMaybe<Array<SiteLocale>>;
};

/** Record of type Markdown (markdown_block) */
export type MarkdownBlockRecord = {
  __typename: 'MarkdownBlockRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  updatedAt: Scalars['DateTime'];
};


/** Record of type Markdown (markdown_block) */
export type MarkdownBlockRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Markdown (markdown_block) */
export type MarkdownBlockRecordContentArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

export type MarketModelBlocksField = DownloadTeaserBlockRecord | ExternalVideoBlockRecord | GalleryBlockRecord | IframeBlockRecord | ImageTeaserBlockRecord | MarkdownBlockRecord | SurveyBlockRecord;

export type MarketModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<MarketModelFilter>>>;
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
  powerBiReport?: InputMaybe<LinkFilter>;
  seo?: InputMaybe<SeoFilter>;
  slug?: InputMaybe<SlugFilter>;
  tile?: InputMaybe<FileFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum MarketModelOrderBy {
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

/** Record of type Market (market) */
export type MarketRecord = {
  __typename: 'MarketRecord';
  _allLeadLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _allSeoLocales?: Maybe<Array<Maybe<SeoFieldMultiLocaleField>>>;
  _allSlugLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _allTitleLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  blocks: Array<MarketModelBlocksField>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  lead?: Maybe<Scalars['String']>;
  powerBiReport?: Maybe<PowerBiReportRecord>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']>;
  tile?: Maybe<FileField>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Market (market) */
export type MarketRecordAllLeadLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']>;
};


/** Record of type Market (market) */
export type MarketRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Market (market) */
export type MarketRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Market (market) */
export type MarketRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Market (market) */
export type MarketRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Market (market) */
export type MarketRecordLeadArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']>;
};


/** Record of type Market (market) */
export type MarketRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Market (market) */
export type MarketRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Market (market) */
export type MarketRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export enum MuxThumbnailFormatType {
  gif = 'gif',
  jpg = 'jpg',
  png = 'png'
}

export type NewsfeedModelFilter = {
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
export type NewsfeedRecord = {
  __typename: 'NewsfeedRecord';
  _allTitleLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  publicationDate?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
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
  role?: InputMaybe<LinkFilter>;
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

/** Record of type Person (person) */
export type PersonRecord = {
  __typename: 'PersonRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ItemId'];
  lastName?: Maybe<Scalars['String']>;
  portrait?: Maybe<FileField>;
  role?: Maybe<RoleRecord>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Person (person) */
export type PersonRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type Ξ Potato Infographic (potato_infographic) */
export type PotatoInfographicRecord = {
  __typename: 'PotatoInfographicRecord';
  _allDataProduktionBetriebsstrukturLocales?: Maybe<Array<Maybe<FileFieldMultiLocaleField>>>;
  _allTitleLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  dataProduktionBetriebsstruktur?: Maybe<FileField>;
  id: Scalars['ItemId'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  year?: Maybe<Scalars['String']>;
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

export type PowerBiReportModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<PowerBiReportModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _locales?: InputMaybe<LocalesFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
  url?: InputMaybe<StringFilter>;
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
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',
  url_ASC = 'url_ASC',
  url_DESC = 'url_DESC'
}

/** Record of type Power BI Report (power_bi_report) */
export type PowerBiReportRecord = {
  __typename: 'PowerBiReportRecord';
  _allTitleLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _locales: Array<SiteLocale>;
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};


/** Record of type Power BI Report (power_bi_report) */
export type PowerBiReportRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Power BI Report (power_bi_report) */
export type PowerBiReportRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Power BI Report (power_bi_report) */
export type PowerBiReportRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter by publication datetime */
export type PublishedAtFilter = {
  /** Filter records with a value that's within the specified minute range. Seconds and milliseconds are truncated from the argument. */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']>;
};

/** The query root for this schema */
export type Query = {
  __typename: 'Query';
  /** Returns meta information regarding a record collection */
  _allBlogPostsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allMarketsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allNewsfeedsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allPeopleMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allPowerBiReportsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allRolesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allSimplePagesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allThemesMeta: CollectionMetadata;
  /** Returns meta information regarding an assets collection */
  _allUploadsMeta?: Maybe<CollectionMetadata>;
  /** Returns the single instance record */
  _site: Site;
  /** Returns the single instance record */
  aboutPage?: Maybe<AboutPageRecord>;
  /** Returns a collection of records */
  allBlogPosts: Array<BlogPostRecord>;
  /** Returns a collection of records */
  allMarkets: Array<MarketRecord>;
  /** Returns a collection of records */
  allNewsfeeds: Array<NewsfeedRecord>;
  /** Returns a collection of records */
  allPeople: Array<PersonRecord>;
  /** Returns a collection of records */
  allPowerBiReports: Array<PowerBiReportRecord>;
  /** Returns a collection of records */
  allRoles: Array<RoleRecord>;
  /** Returns a collection of records */
  allSimplePages: Array<SimplePageRecord>;
  /** Returns a collection of records */
  allThemes: Array<ThemeRecord>;
  /** Returns a collection of assets */
  allUploads: Array<FileField>;
  /** Returns the single instance record */
  blogPage?: Maybe<BlogPageRecord>;
  /** Returns a specific record */
  blogPost?: Maybe<BlogPostRecord>;
  /** Returns the single instance record */
  homePage?: Maybe<HomePageRecord>;
  /** Returns a specific record */
  market?: Maybe<MarketRecord>;
  /** Returns a specific record */
  newsfeed?: Maybe<NewsfeedRecord>;
  /** Returns a specific record */
  person?: Maybe<PersonRecord>;
  /** Returns the single instance record */
  potatoInfographic?: Maybe<PotatoInfographicRecord>;
  /** Returns a specific record */
  powerBiReport?: Maybe<PowerBiReportRecord>;
  /** Returns a specific record */
  role?: Maybe<RoleRecord>;
  /** Returns a specific record */
  simplePage?: Maybe<SimplePageRecord>;
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
export type QueryAllMarketsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MarketModelFilter>;
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
export type QueryAllPowerBiReportsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiReportModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryAllRolesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<RoleModelFilter>;
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
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<BlogPostModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
export type QueryAllMarketsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MarketModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<MarketModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
export type QueryAllNewsfeedsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<NewsfeedModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<NewsfeedModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
export type QueryAllPeopleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PersonModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PersonModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
export type QueryAllPowerBiReportsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiReportModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PowerBiReportModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
export type QueryAllRolesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<RoleModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<RoleModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
export type QueryAllSimplePagesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<SimplePageModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<SimplePageModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
export type QueryAllThemesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ThemeModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ThemeModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
export type QueryAllUploadsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<UploadFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<UploadOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
export type QueryBlogPageArgs = {
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
export type QueryHomePageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
export type QueryMarketArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MarketModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<MarketModelOrderBy>>>;
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
export type QueryPowerBiReportArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<PowerBiReportModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<PowerBiReportModelOrderBy>>>;
};


/** The query root for this schema */
export type QueryRoleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<RoleModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<RoleModelOrderBy>>>;
};


/** The query root for this schema */
export type QuerySimplePageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<SimplePageModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<SimplePageModelOrderBy>>>;
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
  alt?: Maybe<Scalars['String']>;
  aspectRatio: Scalars['FloatType'];
  base64?: Maybe<Scalars['String']>;
  bgColor?: Maybe<Scalars['String']>;
  height: Scalars['IntType'];
  sizes: Scalars['String'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  webpSrcSet: Scalars['String'];
  width: Scalars['IntType'];
};

export type RoleModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<RoleModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<ItemIdFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum RoleModelOrderBy {
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
  description_ASC = 'description_ASC',
  description_DESC = 'description_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Role (role) */
export type RoleRecord = {
  __typename: 'RoleRecord';
  _allDescriptionLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _allTitleLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ItemId'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Role (role) */
export type RoleRecordAllDescriptionLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Role (role) */
export type RoleRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Role (role) */
export type RoleRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Role (role) */
export type RoleRecordDescriptionArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Role (role) */
export type RoleRecordTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

export type SeoField = {
  __typename: 'SeoField';
  description?: Maybe<Scalars['String']>;
  image?: Maybe<FileField>;
  title?: Maybe<Scalars['String']>;
  twitterCard?: Maybe<Scalars['String']>;
};

export type SeoFieldMultiLocaleField = {
  __typename: 'SeoFieldMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<SeoField>;
};

/** Specifies how to filter SEO meta tags fields */
export type SeoFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
};

export type SimplePageModelFilter = {
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
export type SimplePageRecord = {
  __typename: 'SimplePageRecord';
  _allBodyLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _allSlugLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _allTitleLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  author: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Ξ Simple Page (simple_page) */
export type SimplePageRecordAllBodyLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']>;
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
  markdown?: InputMaybe<Scalars['Boolean']>;
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
  eq?: InputMaybe<Scalars['String']>;
  /** Filter records that have one of the specified slugs */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['String']>;
  /** Filter records that do have one of the specified slugs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
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
  eq?: InputMaybe<Scalars['String']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records that equal one of the specified values */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Filter records with the specified field set as blank (null or empty string) */
  isBlank?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['String']>;
  /** Filter records that do not equal one of the specified values */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude records based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

export type StringMatchesFilter = {
  caseSensitive?: InputMaybe<Scalars['BooleanType']>;
  pattern: Scalars['String'];
  regexp?: InputMaybe<Scalars['BooleanType']>;
};

export type StringMultiLocaleField = {
  __typename: 'StringMultiLocaleField';
  locale?: Maybe<SiteLocale>;
  value?: Maybe<Scalars['String']>;
};

/** Record of type Survey Answer (survey_answer) */
export type SurveyAnswerRecord = {
  __typename: 'SurveyAnswerRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  answer?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  updatedAt: Scalars['DateTime'];
};


/** Record of type Survey Answer (survey_answer) */
export type SurveyAnswerRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type Survey (survey_block) */
export type SurveyBlockRecord = {
  __typename: 'SurveyBlockRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  formUrl?: Maybe<Scalars['String']>;
  id: Scalars['ItemId'];
  question: Array<SurveyQuestionRecord>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Survey (survey_block) */
export type SurveyBlockRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type Survey Question (survey_question) */
export type SurveyQuestionRecord = {
  __typename: 'SurveyQuestionRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  formFieldId?: Maybe<Scalars['String']>;
  id: Scalars['ItemId'];
  isMultipleChoice?: Maybe<Scalars['BooleanType']>;
  possibleAnswers: Array<SurveyAnswerRecord>;
  question?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Survey Question (survey_question) */
export type SurveyQuestionRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

export type Tag = {
  __typename: 'Tag';
  attributes?: Maybe<Scalars['MetaTagAttributes']>;
  content?: Maybe<Scalars['String']>;
  tag: Scalars['String'];
};

/** Specifies how to filter text fields */
export type TextFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with the specified field set as blank (null or empty string) */
  isBlank?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude records based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

export type ThemeModelBlocksField = DownloadTeaserBlockRecord | ExternalVideoBlockRecord | GalleryBlockRecord | IframeBlockRecord | ImageTeaserBlockRecord | MarkdownBlockRecord | SurveyBlockRecord;

export type ThemeModelFilter = {
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

/** Record of type Theme (theme) */
export type ThemeRecord = {
  __typename: 'ThemeRecord';
  _allLeadLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _allSeoLocales?: Maybe<Array<Maybe<SeoFieldMultiLocaleField>>>;
  _allSlugLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _allTitleLocales?: Maybe<Array<Maybe<StringMultiLocaleField>>>;
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  blocks: Array<ThemeModelBlocksField>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  lead?: Maybe<Scalars['String']>;
  seo?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']>;
  tile?: Maybe<FileField>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Theme (theme) */
export type ThemeRecordAllLeadLocalesArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']>;
};


/** Record of type Theme (theme) */
export type ThemeRecordAllSeoLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Theme (theme) */
export type ThemeRecordAllSlugLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Theme (theme) */
export type ThemeRecordAllTitleLocalesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Theme (theme) */
export type ThemeRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Theme (theme) */
export type ThemeRecordLeadArgs = {
  locale?: InputMaybe<SiteLocale>;
  markdown?: InputMaybe<Scalars['Boolean']>;
};


/** Record of type Theme (theme) */
export type ThemeRecordSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Theme (theme) */
export type ThemeRecordSlugArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Theme (theme) */
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
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']>;
};

/** Specifies how to filter by default alt */
export type UploadAltFilter = {
  /** Search the uploads with the specified alt */
  eq?: InputMaybe<Scalars['String']>;
  /** Filter uploads with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Search uploads with the specified values as default alt */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the uploads with the specified alt */
  neq?: InputMaybe<Scalars['String']>;
  /** Search uploads that do not have the specified values as default alt */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by auhtor */
export type UploadAuthorFilter = {
  /** Filter uploads with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
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
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by creation datetime */
export type UploadCreatedAtFilter = {
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Exclude uploads with an exact match */
  neq?: InputMaybe<Scalars['DateTime']>;
};

/** Specifies how to filter by filename */
export type UploadFilenameFilter = {
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

export type UploadFilter = {
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
  eq?: InputMaybe<Scalars['String']>;
  /** Search assets with the specified formats */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude the asset with the specified format */
  neq?: InputMaybe<Scalars['String']>;
  /** Search assets that do not have the specified formats */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** Specifies how to filter by height */
export type UploadHeightFilter = {
  /** Search assets with the specified height */
  eq?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger than the specified height */
  gt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified height */
  gte?: InputMaybe<Scalars['IntType']>;
  /** Search all assets smaller than the specified height */
  lt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified height */
  lte?: InputMaybe<Scalars['IntType']>;
  /** Search assets that do not have the specified height */
  neq?: InputMaybe<Scalars['IntType']>;
};

/** Specifies how to filter by ID */
export type UploadIdFilter = {
  /** Search the asset with the specified ID */
  eq?: InputMaybe<Scalars['UploadId']>;
  /** Search assets with the specified IDs */
  in?: InputMaybe<Array<InputMaybe<Scalars['UploadId']>>>;
  /** Exclude the asset with the specified ID */
  neq?: InputMaybe<Scalars['UploadId']>;
  /** Search assets that do not have the specified IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['UploadId']>>>;
};

/** Specifies how to filter by MD5 */
export type UploadMd5Filter = {
  /** Search the asset with the specified MD5 */
  eq?: InputMaybe<Scalars['String']>;
  /** Search assets with the specified MD5s */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude the asset with the specified MD5 */
  neq?: InputMaybe<Scalars['String']>;
  /** Search assets that do not have the specified MD5s */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** Specifies how to filter by mime type */
export type UploadMimeTypeFilter = {
  /** Search the asset with the specified mime type */
  eq?: InputMaybe<Scalars['String']>;
  /** Search assets with the specified mime types */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the asset with the specified mime type */
  neq?: InputMaybe<Scalars['String']>;
  /** Search assets that do not have the specified mime types */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by notes */
export type UploadNotesFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
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
  eq?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger than the specified size (in bytes) */
  gt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified size (in bytes) */
  gte?: InputMaybe<Scalars['IntType']>;
  /** Search all assets smaller than the specified size (in bytes) */
  lt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified size (in bytes) */
  lte?: InputMaybe<Scalars['IntType']>;
  /** Search assets that do not have the specified size (in bytes) */
  neq?: InputMaybe<Scalars['IntType']>;
};

/** Specifies how to filter by tags */
export type UploadTagsFilter = {
  /** Filter uploads linked to all of the specified tags */
  allIn?: InputMaybe<Array<Scalars['String']>>;
  /** Filter uploads linked to at least one of the specified tags */
  anyIn?: InputMaybe<Array<Scalars['String']>>;
  /** Filter uploads linked to the specified tag */
  contains?: InputMaybe<Scalars['String']>;
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Array<Scalars['String']>>;
  /** Filter uploads not linked to any of the specified tags */
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

/** Specifies how to filter by default title */
export type UploadTitleFilter = {
  /** Search the asset with the specified title */
  eq?: InputMaybe<Scalars['String']>;
  /** Filter assets with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Search assets with the specified as default title */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the asset with the specified title */
  neq?: InputMaybe<Scalars['String']>;
  /** Search assets that do not have the specified as default title */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
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
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Exclude uploads with an exact match */
  neq?: InputMaybe<Scalars['DateTime']>;
};

export type UploadVideoField = {
  __typename: 'UploadVideoField';
  duration: Scalars['Int'];
  framerate: Scalars['Int'];
  mp4Url?: Maybe<Scalars['String']>;
  muxAssetId: Scalars['String'];
  muxPlaybackId: Scalars['String'];
  streamingUrl: Scalars['String'];
  thumbnailUrl: Scalars['String'];
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
  eq?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger than the specified width */
  gt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified width */
  gte?: InputMaybe<Scalars['IntType']>;
  /** Search all assets smaller than the specified width */
  lt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified width */
  lte?: InputMaybe<Scalars['IntType']>;
  /** Search assets that do not have the specified width */
  neq?: InputMaybe<Scalars['IntType']>;
};

export type VideoField = {
  __typename: 'VideoField';
  height: Scalars['IntType'];
  provider: Scalars['String'];
  providerUid: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
  width: Scalars['IntType'];
};

export enum VideoMp4Res {
  high = 'high',
  low = 'low',
  medium = 'medium'
}

export type FocalPoint = {
  __typename: 'focalPoint';
  x: Scalars['FloatType'];
  y: Scalars['FloatType'];
};

export type HomePageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type HomePageQuery = { __typename: 'Query', homePage?: { __typename: 'HomePageRecord', id: any, title?: string | null, lead?: string | null, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null } | null, allMarkets: Array<{ __typename: 'MarketRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, tile?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null }>, allThemes: Array<{ __typename: 'ThemeRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, tile?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null }>, allBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, _firstPublishedAt?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, markets: Array<{ __typename: 'MarketRecord', id: any, title?: string | null }>, themes: Array<{ __typename: 'ThemeRecord', id: any, title?: string | null }> }> };

export type MarketPageQueryVariables = Exact<{
  locale: SiteLocale;
  slug: Scalars['String'];
}>;


export type MarketPageQuery = { __typename: 'Query', market?: { __typename: 'MarketRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null } | null> | null, tile?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null } | null, allMarkets: Array<{ __typename: 'MarketRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, tile?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null }>, allBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, _firstPublishedAt?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, markets: Array<{ __typename: 'MarketRecord', id: any, title?: string | null }>, themes: Array<{ __typename: 'ThemeRecord', id: any, title?: string | null }> }> };

export type ThemePageQueryVariables = Exact<{
  locale: SiteLocale;
  slug: Scalars['String'];
}>;


export type ThemePageQuery = { __typename: 'Query', theme?: { __typename: 'ThemeRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null } | null> | null, tile?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null } | null, allThemes: Array<{ __typename: 'ThemeRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, tile?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null }>, allBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, _firstPublishedAt?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, markets: Array<{ __typename: 'MarketRecord', id: any, title?: string | null }>, themes: Array<{ __typename: 'ThemeRecord', id: any, title?: string | null }> }> };

export type BlogPageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type BlogPageQuery = { __typename: 'Query', blogPage?: { __typename: 'BlogPageRecord', id: any, title?: string | null, lead?: string | null, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null } | null, allMarkets: Array<{ __typename: 'MarketRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, tile?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null }>, allBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, _firstPublishedAt?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, markets: Array<{ __typename: 'MarketRecord', id: any, title?: string | null }>, themes: Array<{ __typename: 'ThemeRecord', id: any, title?: string | null }> }> };

export type BlogPostQueryVariables = Exact<{
  locale: SiteLocale;
  slug: Scalars['String'];
}>;


export type BlogPostQuery = { __typename: 'Query', blogPost?: { __typename: 'BlogPostRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, _firstPublishedAt?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, markets: Array<{ __typename: 'MarketRecord', id: any, title?: string | null }>, themes: Array<{ __typename: 'ThemeRecord', id: any, title?: string | null }> } | null };

export type AboutPageQueryVariables = Exact<{
  locale: SiteLocale;
}>;


export type AboutPageQuery = { __typename: 'Query', aboutPage?: { __typename: 'AboutPageRecord', id: any, title?: string | null, lead?: string | null } | null, allMarkets: Array<{ __typename: 'MarketRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, tile?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null }> };

export type AllMarketsSlugLocalesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMarketsSlugLocalesQuery = { __typename: 'Query', allMarkets: Array<{ __typename: 'MarketRecord', id: any, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null } | null> | null }> };

export type AllThemesSlugLocalesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllThemesSlugLocalesQuery = { __typename: 'Query', allThemes: Array<{ __typename: 'ThemeRecord', id: any, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null } | null> | null }> };

export type AllBlogPostsSlugLocalesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBlogPostsSlugLocalesQuery = { __typename: 'Query', allBlogPosts: Array<{ __typename: 'BlogPostRecord', id: any, _allSlugLocales?: Array<{ __typename: 'StringMultiLocaleField', locale?: SiteLocale | null, value?: string | null } | null> | null }> };

export type FullSeoFragment = { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null };

export type FullMarketFragment = { __typename: 'MarketRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, tile?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null };

export type FullThemeFragment = { __typename: 'ThemeRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, tile?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, seo?: { __typename: 'SeoField', title?: string | null, description?: string | null, twitterCard?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null } | null };

export type FullBlogPostFragment = { __typename: 'BlogPostRecord', id: any, title?: string | null, lead?: string | null, slug?: string | null, _firstPublishedAt?: string | null, image?: { __typename: 'FileField', id: any, url: string } | null, blocks: Array<{ __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> } | { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null } | { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> } | { __typename: 'IframeBlockRecord', id: any, url?: string | null } | { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null } | { __typename: 'MarkdownBlockRecord', id: any, content?: string | null } | { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> }>, markets: Array<{ __typename: 'MarketRecord', id: any, title?: string | null }>, themes: Array<{ __typename: 'ThemeRecord', id: any, title?: string | null }> };

export type DownloadTeaserBlockFragment = { __typename: 'DownloadTeaserBlockRecord', id: any, markdown?: string | null, description?: string | null, downloadTeaserAssets: Array<{ __typename: 'DownloadTeaserAssetRecord', id: any, title?: string | null, file?: { __typename: 'FileField', id: any, url: string } | null }> };

export type ExternalVideoBlockFragment = { __typename: 'ExternalVideoBlockRecord', id: any, externalVideo?: { __typename: 'VideoField', url: string, title: string } | null };

export type GalleryBlockFragment = { __typename: 'GalleryBlockRecord', id: any, galleryAssets: Array<{ __typename: 'FileField', id: any, title?: string | null, url: string }> };

export type IframeBlockFragment = { __typename: 'IframeBlockRecord', id: any, url?: string | null };

export type ImageTeaserBlockFragment = { __typename: 'ImageTeaserBlockRecord', id: any, description?: string | null, imageTeaserAsset?: { __typename: 'FileField', id: any, title?: string | null, alt?: string | null, url: string } | null };

export type MarkdownBlockFragment = { __typename: 'MarkdownBlockRecord', id: any, content?: string | null };

export type SurveyBlockFragment = { __typename: 'SurveyBlockRecord', id: any, formUrl?: string | null, question: Array<{ __typename: 'SurveyQuestionRecord', id: any, question?: string | null, formFieldId?: string | null, isMultipleChoice?: boolean | null, possibleAnswers: Array<{ __typename: 'SurveyAnswerRecord', id: any, answer?: string | null }> }> };

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
export const ImageTeaserBlockFragmentDoc = gql`
    fragment ImageTeaserBlock on ImageTeaserBlockRecord {
  id
  description
  imageTeaserAsset {
    id
    title
    alt
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
export const FullMarketFragmentDoc = gql`
    fragment FullMarket on MarketRecord {
  id
  title
  lead
  slug
  tile {
    id
    url
  }
  blocks {
    ...DownloadTeaserBlock
    ...ExternalVideoBlock
    ...GalleryBlock
    ...IframeBlock
    ...ImageTeaserBlock
    ...MarkdownBlock
    ...SurveyBlock
  }
  seo {
    ...FullSEO
  }
}
    `;
export const FullThemeFragmentDoc = gql`
    fragment FullTheme on ThemeRecord {
  id
  title
  lead
  slug
  tile {
    id
    url
  }
  blocks {
    ...DownloadTeaserBlock
    ...ExternalVideoBlock
    ...GalleryBlock
    ...IframeBlock
    ...ImageTeaserBlock
    ...MarkdownBlock
    ...SurveyBlock
  }
  seo {
    ...FullSEO
  }
}
    `;
export const FullBlogPostFragmentDoc = gql`
    fragment FullBlogPost on BlogPostRecord {
  id
  title
  lead
  slug
  image {
    id
    url
  }
  blocks {
    ...DownloadTeaserBlock
    ...ExternalVideoBlock
    ...GalleryBlock
    ...IframeBlock
    ...ImageTeaserBlock
    ...MarkdownBlock
    ...SurveyBlock
  }
  markets {
    id
    title
  }
  themes {
    id
    title
  }
  _firstPublishedAt
}
    `;
export const HomePageDocument = gql`
    query HomePage($locale: SiteLocale!) {
  homePage(locale: $locale) {
    id
    title
    lead
    seo {
      ...FullSEO
    }
  }
  allMarkets(locale: $locale) {
    ...FullMarket
  }
  allThemes(locale: $locale) {
    ...FullTheme
  }
  allBlogPosts(locale: $locale, first: 3) {
    ...FullBlogPost
  }
}
    ${FullSeoFragmentDoc}
${FullMarketFragmentDoc}
${DownloadTeaserBlockFragmentDoc}
${ExternalVideoBlockFragmentDoc}
${GalleryBlockFragmentDoc}
${IframeBlockFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${MarkdownBlockFragmentDoc}
${SurveyBlockFragmentDoc}
${FullThemeFragmentDoc}
${FullBlogPostFragmentDoc}`;

export function useHomePageQuery(options: Omit<Urql.UseQueryArgs<HomePageQueryVariables>, 'query'>) {
  return Urql.useQuery<HomePageQuery>({ query: HomePageDocument, ...options });
};
export const MarketPageDocument = gql`
    query MarketPage($locale: SiteLocale!, $slug: String!) {
  market(locale: $locale, filter: {slug: {eq: $slug}}) {
    ...FullMarket
    _allSlugLocales {
      locale
      value
    }
  }
  allMarkets(locale: $locale) {
    ...FullMarket
  }
  allBlogPosts(locale: $locale, first: 3) {
    ...FullBlogPost
  }
}
    ${FullMarketFragmentDoc}
${DownloadTeaserBlockFragmentDoc}
${ExternalVideoBlockFragmentDoc}
${GalleryBlockFragmentDoc}
${IframeBlockFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${MarkdownBlockFragmentDoc}
${SurveyBlockFragmentDoc}
${FullSeoFragmentDoc}
${FullBlogPostFragmentDoc}`;

export function useMarketPageQuery(options: Omit<Urql.UseQueryArgs<MarketPageQueryVariables>, 'query'>) {
  return Urql.useQuery<MarketPageQuery>({ query: MarketPageDocument, ...options });
};
export const ThemePageDocument = gql`
    query ThemePage($locale: SiteLocale!, $slug: String!) {
  theme(locale: $locale, filter: {slug: {eq: $slug}}) {
    ...FullTheme
    _allSlugLocales {
      locale
      value
    }
  }
  allThemes(locale: $locale) {
    ...FullTheme
  }
  allBlogPosts(locale: $locale, first: 3) {
    ...FullBlogPost
  }
}
    ${FullThemeFragmentDoc}
${DownloadTeaserBlockFragmentDoc}
${ExternalVideoBlockFragmentDoc}
${GalleryBlockFragmentDoc}
${IframeBlockFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${MarkdownBlockFragmentDoc}
${SurveyBlockFragmentDoc}
${FullSeoFragmentDoc}
${FullBlogPostFragmentDoc}`;

export function useThemePageQuery(options: Omit<Urql.UseQueryArgs<ThemePageQueryVariables>, 'query'>) {
  return Urql.useQuery<ThemePageQuery>({ query: ThemePageDocument, ...options });
};
export const BlogPageDocument = gql`
    query BlogPage($locale: SiteLocale!) {
  blogPage(locale: $locale) {
    id
    title
    lead
    seo {
      ...FullSEO
    }
  }
  allMarkets(locale: $locale) {
    ...FullMarket
  }
  allBlogPosts(locale: $locale) {
    ...FullBlogPost
  }
}
    ${FullSeoFragmentDoc}
${FullMarketFragmentDoc}
${DownloadTeaserBlockFragmentDoc}
${ExternalVideoBlockFragmentDoc}
${GalleryBlockFragmentDoc}
${IframeBlockFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${MarkdownBlockFragmentDoc}
${SurveyBlockFragmentDoc}
${FullBlogPostFragmentDoc}`;

export function useBlogPageQuery(options: Omit<Urql.UseQueryArgs<BlogPageQueryVariables>, 'query'>) {
  return Urql.useQuery<BlogPageQuery>({ query: BlogPageDocument, ...options });
};
export const BlogPostDocument = gql`
    query BlogPost($locale: SiteLocale!, $slug: String!) {
  blogPost(locale: $locale, filter: {slug: {eq: $slug}}) {
    ...FullBlogPost
  }
}
    ${FullBlogPostFragmentDoc}
${DownloadTeaserBlockFragmentDoc}
${ExternalVideoBlockFragmentDoc}
${GalleryBlockFragmentDoc}
${IframeBlockFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${MarkdownBlockFragmentDoc}
${SurveyBlockFragmentDoc}`;

export function useBlogPostQuery(options: Omit<Urql.UseQueryArgs<BlogPostQueryVariables>, 'query'>) {
  return Urql.useQuery<BlogPostQuery>({ query: BlogPostDocument, ...options });
};
export const AboutPageDocument = gql`
    query AboutPage($locale: SiteLocale!) {
  aboutPage(locale: $locale) {
    id
    title
    lead
  }
  allMarkets(locale: $locale) {
    ...FullMarket
  }
}
    ${FullMarketFragmentDoc}
${DownloadTeaserBlockFragmentDoc}
${ExternalVideoBlockFragmentDoc}
${GalleryBlockFragmentDoc}
${IframeBlockFragmentDoc}
${ImageTeaserBlockFragmentDoc}
${MarkdownBlockFragmentDoc}
${SurveyBlockFragmentDoc}
${FullSeoFragmentDoc}`;

export function useAboutPageQuery(options: Omit<Urql.UseQueryArgs<AboutPageQueryVariables>, 'query'>) {
  return Urql.useQuery<AboutPageQuery>({ query: AboutPageDocument, ...options });
};
export const AllMarketsSlugLocalesDocument = gql`
    query AllMarketsSlugLocales {
  allMarkets {
    id
    _allSlugLocales {
      locale
      value
    }
  }
}
    `;

export function useAllMarketsSlugLocalesQuery(options?: Omit<Urql.UseQueryArgs<AllMarketsSlugLocalesQueryVariables>, 'query'>) {
  return Urql.useQuery<AllMarketsSlugLocalesQuery>({ query: AllMarketsSlugLocalesDocument, ...options });
};
export const AllThemesSlugLocalesDocument = gql`
    query AllThemesSlugLocales {
  allThemes {
    id
    _allSlugLocales {
      locale
      value
    }
  }
}
    `;

export function useAllThemesSlugLocalesQuery(options?: Omit<Urql.UseQueryArgs<AllThemesSlugLocalesQueryVariables>, 'query'>) {
  return Urql.useQuery<AllThemesSlugLocalesQuery>({ query: AllThemesSlugLocalesDocument, ...options });
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
  return Urql.useQuery<AllBlogPostsSlugLocalesQuery>({ query: AllBlogPostsSlugLocalesDocument, ...options });
};