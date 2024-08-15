import { client } from "@/graphql/api";
import * as GQL from "@/graphql";
import { NotFoundError } from "@/components/NotFoundError";

export default function Custom404(props: GQL.ErrorPageQuery) {
  return <NotFoundError {...props} />;
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
