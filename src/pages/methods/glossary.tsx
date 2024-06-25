import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { AppLayout } from "@/components/layout";
import { Hero } from "@/components/hero";
import { GridContainer } from "@/components/Grid";
import { useLayoutStyles } from "@/components/useLayoutStyles";
import Head from "next/head";
import { renderMetaTags } from "react-datocms";
import { GlossaryItem } from "@/components/GlossaryItem";
import { TextField, InputAdornment, Typography, CircularProgress, Stack } from "@mui/material";
import { makeStyles } from "@/components/style-utils";
import SearchIcon from "@/icons/icons-jsx/control/IcSearch";
import CloseIcon from "@/icons/icons-jsx/control/IcControlClose";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as React from "react";
import { useQueryState, parseAsInteger } from "next-usequerystate";
import { Pagination } from "@/components/Pagination";
import { Trans, plural, t } from "@lingui/macro";
import { useDebounceQueryStateString } from "@/lib/useDebounce";

const PAGE_SIZE = 100;

export default function GlossaryPage(props: GQL.GlossaryPageQuery) {
  const { glossaryPage, method, allMarketArticles, allFocusArticles, allMethodsPages, site } =
    props;
  const { classes } = useLayoutStyles();
  const { classes: styles, cx } = useStyles();

  const [searchString, debouncedSearchString, setSearchString] = useDebounceQueryStateString(
    "",
    300
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { locale } = useRouter();

  const { data, isFetching } = useQuery({
    queryKey: ["glossary", debouncedSearchString, page],
    queryFn: async () => {
      const result = await client
        .query<GQL.PaginatedGlossaryItemsQuery>(GQL.PaginatedGlossaryItemsDocument, {
          locale,
          first: PAGE_SIZE,
          skip: (page - 1) * PAGE_SIZE,
          matches: debouncedSearchString,
        })
        .toPromise();

      if (!result.data) {
        console.error(result.error?.toString());
        throw new Error("Failed to fetch API");
      }

      return result.data;
    },
    placeholderData: keepPreviousData,
  });

  if (!glossaryPage?.title || !method?._allSlugLocales) {
    return null;
  }

  const alternates = glossaryPage?._allSlugLocales?.map((loc) => {
    const methodLocale = method?._allSlugLocales?.find((l) => l.locale === loc.locale);
    return {
      href: "/methods/glossary",
      as: `/${methodLocale?.value}/${loc.value}`,
      locale: loc.locale as string,
    };
  });

  return (
    <>
      <Head>{renderMetaTags([...glossaryPage.seo, ...site?.favicon])}</Head>
      <AppLayout
        alternates={alternates}
        allMarkets={allMarketArticles}
        allFocusArticles={allFocusArticles}
        allMethodsPages={allMethodsPages}
        glossaryPage={glossaryPage}
        showBackButton
      >
        <Hero title={glossaryPage.title} shiftedLeft />
        <GridContainer sx={{ mt: 4, position: "relative" }}>
          <div className={classes.aside}></div>
          <div className={cx(classes.content, styles.content)}>
            <GridContainer className={styles.searchContainer}>
              <TextField
                placeholder={t({
                  id: "search.glossary.placeholder",
                  message: "Search in glossary",
                })}
                className={styles.searchInput}
                variant="outlined"
                value={searchString}
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {isFetching && <CircularProgress size={24} />}
                      {searchString.length > 0 ? (
                        <CloseIcon
                          className={styles.closeIcon}
                          onClick={() => {
                            setSearchString("");
                            setPage(1);
                          }}
                          width={20}
                          height={20}
                          color={"#596978"}
                        />
                      ) : (
                        <SearchIcon width={24} height={24} color={"#596978"} />
                      )}
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setSearchString(e.target.value);
                  setPage(1);
                }}
              />
            </GridContainer>
            {!!data?.count?.count && data?.count?.count > 0 && (
              <Typography variant="h4" className={styles.resultCount}>
                {data?.count?.count}&nbsp;
                {t({
                  id: "data.filters.results",
                  message: plural(data?.count?.count ?? 2, { one: "result", other: "results" }),
                })}
              </Typography>
            )}
            <div className={styles.items}>
              {data?.glossaryItems.length === 0 && <EmptyGlossary searchString={searchString} />}
              {data?.glossaryItems?.map((item) => (
                <GlossaryItem key={item.title} {...item} highlight={debouncedSearchString} />
              ))}
            </div>
            {data?.glossaryItems && data?.count.count / PAGE_SIZE > 1 && (
              <div className={styles.paginationWrapper}>
                <Pagination
                  total={Math.ceil(data?.count.count / PAGE_SIZE) ?? 1}
                  current={page}
                  onChange={(_, page) => setPage(page)}
                />
              </div>
            )}
          </div>
        </GridContainer>
      </AppLayout>
    </>
  );
}

interface EmptyGlossaryProps {
  searchString: string;
}

const EmptyGlossary = ({ searchString }: EmptyGlossaryProps) => {
  const { classes } = useStyles();
  return (
    <Stack gap={6}>
      <Typography variant="h2" className={classes.emptyTitle}>
        <Trans id="search.results.message">
          No matches for «{searchString}» on the Glossary page
        </Trans>
      </Typography>
      <Stack>
        <Typography variant="h3">
          <Trans id="search.results.tips">Search tips</Trans>
        </Typography>
        <ul>
          <li>
            <Trans id="search.results.tips.one">Check the spelling of your search term</Trans>
          </li>
          <li>
            <Trans id="search.results.tips.two">Use a different or more general term</Trans>
          </li>
          <li>
            <Trans id="search.results.tips.three">Use fewer search terms</Trans>
          </li>
        </ul>
      </Stack>
      <Stack>
        <Typography variant="h3">
          <Trans id="search.results.warning.header">Notice</Trans>
        </Typography>
        <Typography variant="body1">
          <Trans id="search.results.warning.message">
            The search is currently limited to the Glossary page of
          </Trans>
          &quot;{window.location.hostname}
          &quot;.
        </Typography>
      </Stack>
    </Stack>
  );
};

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.GlossaryPageQuery>(
      GQL.GlossaryPageDocument,
      { locale: context.locale },
      { requestPolicy: "network-only" }
    )
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data, revalidate: 10 };
};

const useStyles = makeStyles()(({ palette, spacing, breakpoints }) => ({
  resultCount: {
    height: "60px",
    display: "flex",
    alignItems: "center",
    fontWeight: 400,
    borderBottom: `1px solid ${palette.monochrome[300]}`,
    marginBottom: "40px",
  },
  closeIcon: {
    cursor: "pointer",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 124,
  },
  items: {
    display: "flex",
    flexDirection: "column",
    gap: 64,
  },
  searchInput: {
    maxHeight: "44px",
    width: "100%",
    marginBottom: 80,
    input: {
      height: "28px",
      paddingBlock: spacing(2),
    },
  },
  paginationWrapper: {
    display: "flex",
    justifyContent: "end",
  },
  emptyTitle: {
    fontWeight: 400,
  },
  searchContainer: {
    padding: 0,
    marginLeft: 0,
    [breakpoints.up("xl")]: {
      width: `calc(var(--BLWGrid-columnWidth) * 6 + var(--BLWGrid-columnGutterWidth) * 5)`,
    },
  },
}));
