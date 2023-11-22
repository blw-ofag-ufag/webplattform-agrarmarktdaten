import { PowerBIReport } from "@/components/powerbi-report";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import { GetStaticProps } from "next";
import { atom } from "jotai";

type Props = GQL.AllPowerBiReportsQuery;

const Page = (props: Props) => {
  const { allPowerBiReports } = props;

  return allPowerBiReports.map((d) => {
    const datasetId = d.dataset?.datasetId ?? "";
    const reportId = d.reportId ?? "";
    const reportWorkspaceId = d.workspace?.workspaceId ?? "";
    const pages = d.pages.map((d) => ({ name: d.name!, id: d.pageId! })) ?? [];
    const currentPageAtom = atom<{ name: string; id: string }>(pages[0]);

    return (
      <PowerBIReport
        key={reportId}
        datasetId={datasetId}
        reportId={reportId}
        reportWorkspaceId={reportWorkspaceId}
        pages={pages}
        currentPage={currentPageAtom}
      />
    );
  });
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const result = await client
    .query<GQL.AllPowerBiReportsQuery>(
      GQL.AllPowerBiReportsDocument,
      { locale: ctx.locale },
      { requestPolicy: "network-only" }
    )
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data };
};

export default Page;
