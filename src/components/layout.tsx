import { Box } from "@mui/material";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Market } from "@/domain/types";

export const AppLayout = ({
  children,
  allMarkets,
  alternates,
}: {
  children: React.ReactNode;
  allMarkets?: Pick<Market, "title" | "slug">[];
  alternates?: { href: string; as: string; locale: string }[];
}) => (
  <>
    <Header alternates={alternates} allMarkets={allMarkets} />
    <Box sx={{ mt: [0, 0, "92px"] }}>{children}</Box>
    <Footer />
  </>
);
