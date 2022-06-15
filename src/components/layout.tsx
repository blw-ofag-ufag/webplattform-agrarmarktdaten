import { Box } from "@mui/material";
import { useRouter } from "next/router";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Market } from "@/domain/types";

import { BackButton } from "./back-button";

export const AppLayout = ({
  children,
  allMarkets,
  alternates,
}: {
  children: React.ReactNode;
  allMarkets?: Pick<Market, "title" | "slug">[];
  alternates?: { href: string; as: string; locale: string }[];
}) => {
  const router = useRouter();

  return (
    <>
      <Header alternates={alternates} allMarkets={allMarkets} />
      <Box sx={{ mt: [0, 0, "92px"], overflow: "auto", position: "relative" }}>
        {router.pathname !== "/" ? <BackButton /> : null}
        {children}
      </Box>
      <Footer />
    </>
  );
};
