export default function InfografikPage() {
  return null;
}

// import { Box } from "@mui/material";

// import Flex from "@/components/flex";
// import { ChapterHeader } from "@/components/infografik/chapter-header";
// import { colors } from "@/components/infografik/colors";
// import { getFlachenSquaresData } from "@/components/infografik/data/flachen";
// import {
//   sectionIds_betriebe,
//   sectionIds_flachen,
//   sections_betriebe,
//   sections_flachen,
// } from "@/components/infografik/data/sections";
// import { InfografikHeader } from "@/components/infografik/infografik-header";
// import { Intro } from "@/components/infografik/intro";
// import { ScrollIndicator } from "@/components/infografik/scroll-indicator";
// import {
//   ScrollyWaffle,
//   ScrollyWaffleDataFetcher,
// } from "@/components/infografik/scrolly-waffle";
// import { StickyHeader } from "@/components/infografik/sticky-header.tsx";

// export default function Infografik({
//   potatoInfographic,
// }: {
//   potatoInfographic: PotatoInfographic;
// }) {
//   return (
//     <>
//       <Box
//         sx={{
//           maxWidth: "64rem",
//           mx: "auto",
//           px: [3, 4],
//           backgroundColor: colors.yellow,
//         }}
//       >
//         <InfografikHeader />
//         <Box sx={{ margin: "auto" }}>
//           <ScrollIndicator />
//           <Intro title={potatoInfographic.title} />
//           <Box>
//             <ChapterHeader id="produktion">Produktion</ChapterHeader>
//             <StickyHeader>
//               <Box component="small" sx={{ opacity: 0.7 }}>
//                 PRODUKTION
//               </Box>
//               <Box component="h2">Flächenstruktur</Box>
//             </StickyHeader>
//             <Box
//               sx={{
//                 maxWidth: 400,
//                 margin: "auto",
//               }}
//             >
//               <ScrollyWaffle
//                 sectionIds={sectionIds_flachen}
//                 sections={sections_flachen}
//                 squaresData={getFlachenSquaresData()}
//               />
//             </Box>
//           </Box>
//           <Box>
//             <StickyHeader>
//               <Box component="small" sx={{ opacity: 0.7 }}>
//                 PRODUKTION
//               </Box>
//               <Box component="h2">Betriebstruktur</Box>
//             </StickyHeader>
//             <Box
//               sx={{
//                 maxWidth: 400,
//                 margin: "auto",
//               }}
//             >
//               <ScrollyWaffleDataFetcher
//                 sectionIds={sectionIds_betriebe}
//                 sections={sections_betriebe}
//                 dataUrl={potatoInfographic.dataProduktionBetriebsstruktur.url}
//               />
//             </Box>
//           </Box>
//           <ChapterHeader id="angebot">Angebot</ChapterHeader>
//           <Flex
//             sx={{
//               height: "100vh",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             Angebot Insel
//           </Flex>
//           <ChapterHeader id="konsum">Konsum</ChapterHeader>
//           <Flex
//             sx={{
//               height: "100vh",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             Konsum Insel
//           </Flex>
//           <ChapterHeader id="preise">Preise</ChapterHeader>
//           <Flex
//             sx={{
//               height: "100vh",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             Preise Insel
//           </Flex>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export const getStaticProps = async (context: $FixMe) => {
//   const query = `
//   query PageQuery($locale: SiteLocale!){
//     potatoInfographic(locale: $locale) {
//       title
//       year
//       dataProduktionBetriebsstruktur {
//         url
//       }
//     }
//   }
//   `;

//   const result = await fetchCMS(query, {
//     variables: { locale: context.locale },
//     preview: context.preview,
//   });

//   return { props: result };
// };
