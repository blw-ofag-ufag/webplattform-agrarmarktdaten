import { PowerBINavigation as PowerBINavigationComponent } from "@/components/powerbi-report";
import { useState } from "react";

const pages = [
  { id: "first-page", name: "1st page" },
  { id: "second-page", name: "2nd page" },
  { id: "third-page", name: "3rd page" },
];

export const PowerBINavigation = () => {
  const [page, setPage] = useState(pages[0]);
  return <PowerBINavigationComponent activePage={page} pages={pages} onChange={setPage} />;
};

export default {
  component: PowerBINavigationComponent,
  title: "App Components / Power BI",
};
