import { FileDownloadItemRecord, FileField, HighlightSectionModelContentField } from "@/graphql";
import FileDownloadSectionComponent from "./FileDownloadSection/FileDownloadSection";
import { HighlightSection } from "@/components/HighlightSection";
import { Stack, Typography } from "@mui/material";

const sampleStructuredText = {
  value: {
    schema: "dast",
    document: {
      type: "root",
      children: [
        {
          type: "heading",
          level: 1,
          children: [
            {
              type: "span",
              marks: ["strong"],
              value: "Erhebungen entlang der Wertschöpfungskette",
            },
          ],
        },
        { type: "heading", level: 6, children: [{ type: "span", value: "Methoden" }] },
        {
          type: "paragraph",
          children: [
            { type: "span", value: "Gemäss gesetzlichem Auftrag " },
            {
              url: "https://www.fedlex.admin.ch/eli/cc/1998/3033_3033_3033/de#tit_2/chap_1/sec_5",
              meta: [{ id: "target", value: "_blank" }],
              type: "link",
              children: [{ type: "span", value: "(LwG Art. 27; SR910.1)" }],
            },
            {
              type: "span",
              value:
                " erhebt der Fachbereich Marktanalysen des Bundesamtes für Landwirtschaft Preise und weitere preisbestimmende Indikatoren (z.B. Mengen) entlang den Lebensmittel-Wertschöpfungsketten von der landwirtschaftlichen Produktion bis zum Konsum. Dabei erfolgen Erhebungen zu nachfolgenden Märkten (vgl. ",
            },
            {
              url: "https://www.fedlex.admin.ch/eli/cc/1999/71/de?manifestation=https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1999/71/20170101/de/html/fedlex-data-admin-ch-eli-cc-1999-71-20170101-de-html-4.html",
              meta: [{ id: "target", value: "_blank" }],
              type: "link",
              children: [
                {
                  type: "span",
                  value:
                    "Verordnung über die Marktbeobachtung im Landwirtschaftsbereich; SR 942.31",
                },
              ],
            },
            { type: "span", value: "): " },
          ],
        },
      ],
    },
  },
};

export const NamedSection = () => {
  return (
    <Stack spacing={5}>
      <Stack spacing={4}>
        <Typography variant="h5">FileDownloadSection</Typography>
        <FileDownloadSectionComponent
          data={{
            title: "Additional material",
            fileDownloadItems: [
              {
                id: 1337,
                date: "2023-11-20T12:00",
                title: "Downloaded file title",
                file: {
                  basename: "A file",
                  format: "png",
                  url: "http://example.com",
                } as FileField,
                description: "A description",
              } as FileDownloadItemRecord,
              {
                id: 1337,
                date: "2023-11-20T12:00",
                title: "Downloaded file title",
                file: {
                  basename: "A file",
                  format: "png",
                  url: "http://example.com",
                } as FileField,
                description: "A description",
              } as FileDownloadItemRecord,
            ],
          }}
        />
      </Stack>
      <Stack spacing={4}>
        <Typography variant="h5">HighlightSection</Typography>
        <HighlightSection
          data={{
            title: "A sample highlight",
            content: sampleStructuredText as HighlightSectionModelContentField,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default {
  component: NamedSection,
};
