import { client } from "@/graphql/api";
import * as GQL from "@/graphql";
import { ErrorPage } from "@/components/ErrorPage";

export default function Custom500(props: GQL.ErrorPageQuery) {
  return <ErrorPage {...props} />;
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.ErrorPageQuery>(
      GQL.ErrorPageDocument,
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
