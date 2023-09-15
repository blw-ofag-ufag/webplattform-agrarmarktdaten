import { PowerBIReport } from "@/components/powerbi-report";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import { GetStaticProps } from "next";

type Props = GQL.AllPowerBiReportsQuery;

const Page = (props: Props) => {
  const { allPowerBiReports } = props;

  return allPowerBiReports.map((d) => {
    const datasetId = d.dataset?.datasetId ?? "";
    const reportId = d.reportId ?? "";
    const reportWorkspaceId = d.workspace?.workspaceId ?? "";

    return (
      <PowerBIReport
        key={reportId}
        datasetId={datasetId}
        reportId={reportId}
        reportWorkspaceId={reportWorkspaceId}
      />
    );
  });
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const result = await client
    .query<GQL.AllPowerBiReportsQuery>(GQL.AllPowerBiReportsDocument, {
      locale: ctx.locale,
    })
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data };
};

export default Page;
