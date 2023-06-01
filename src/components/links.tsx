import * as qs from "querystring";

import NextLink, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { useLocale } from "@/lib/use-locale";

const createDynamicRouteProps = ({
  pathname,
  query,
}: {
  pathname: string;
  query: qs.ParsedUrlQuery;
}) => {
  let asPath = pathname;
  let regularQueryParams: qs.ParsedUrlQuery = {};

  // Get dynamic route params from pathname
  const dynamicParamRe = /\[(\w+)\]/g;
  let dynamicParams: Set<string> = new Set();
  let match: RegExpExecArray | null;
  while ((match = dynamicParamRe.exec(pathname))) {
    dynamicParams.add(match[1]);
  }

  // Replace dynamic route params in `asPath`
  for (const [k, v] of Object.entries(query)) {
    if (dynamicParams.has(k) && v !== undefined) {
      asPath = asPath.replace(`[${k}]`, v.toString());
    } else {
      regularQueryParams[k] = v;
    }
  }

  // Add query params that aren't part of the route as search to `asPath`
  if (Object.keys(regularQueryParams).length > 0) {
    asPath = `${asPath}?${qs.stringify(regularQueryParams)}`;
  }

  return {
    href: { pathname, query },
    as: asPath,
  };
};

export const LocalizedLink = ({
  pathname,
  query,
  ...rest
}: Omit<LinkProps, "href" | "as"> & {
  pathname: string;
  query?: qs.ParsedUrlQuery;
  children?: React.ReactNode;
}) => {
  const locale = useLocale();
  return (
    <NextLink
      {...rest}
      {...createDynamicRouteProps({
        pathname,
        query: query || {},
      })}
      locale={locale}
      legacyBehavior
    />
  );
};

export const HomeLink = (
  props: Omit<LinkProps, "href" | "as"> & {
    children?: React.ReactNode;
  }
) => {
  const locale = useLocale();
  return (
    <NextLink {...props} href="/" locale={locale} legacyBehavior>
      {props.children}
    </NextLink>
  );
};

export const CurrentPageLink = ({
  locale,
  ...rest
}: {
  locale: string;
  passHref?: boolean;
  children: React.ReactNode;
}) => {
  const { pathname, query } = useRouter();
  return (
    <NextLink
      {...rest}
      href={{ pathname, query }}
      locale={locale}
      legacyBehavior
    />
  );
};
