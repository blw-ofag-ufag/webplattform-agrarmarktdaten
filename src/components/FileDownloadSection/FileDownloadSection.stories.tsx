import { FileField } from "@/graphql";
import FileDownloadSectionComponent from "./FileDownloadSection";

export const FileDownloadSection = () => {
  return (
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
          },
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
          },
        ],
      }}
    />
  );
};

export default {
  component: FileDownloadSectionComponent,
};
