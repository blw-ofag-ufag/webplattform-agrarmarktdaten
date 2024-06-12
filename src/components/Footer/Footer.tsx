import * as React from "react";
import { c, s } from "@interactivethings/swiss-federal-ci";

import {
  Footer,
  FooterSection,
  FooterSectionSocialMediaButton,
  FooterSectionSocialMediaButtonGroup,
  FooterSectionText,
  FooterSectionTitle,
  FooterSectionButton,
} from "@interactivethings/swiss-federal-ci/dist/components";

import { Box, Link, useMediaQuery, Typography } from "@mui/material";
import SvgIcControlArrowRight from "@/icons/icons-jsx/control/IcControlArrowRight";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { t } from "@lingui/macro";
import { makeContentWrapperSx } from "@/components/Grid/Grid";
import slugs from "@/generated/slugs.json";
import { isValidLocale, defaultLocale, Locale } from "@/locales/locales";

const FooterBLW = () => {
  const theme = useTheme();
  const { locale } = useRouter();
  const localeSlugs = slugs.find((slug) => slug.locale === locale)?.slugs;
  const isXXlAndUp = useMediaQuery(theme.breakpoints.up("xxl"));
  const newsletterLink = {
    de: "https://www.blw.admin.ch/blw/de/home/services/newsletter.html#1116955223",
    fr: "https://www.blw.admin.ch/blw/fr/home/services/newsletter.html#535003298",
    it: "https://www.blw.admin.ch/blw/it/home/services/newsletter.html#-202135807",
  } as Record<Locale, string>;
  return (
    <Footer
      ContentWrapperProps={{ sx: makeContentWrapperSx(theme) }}
      bottomLinks={[
        {
          title: t({ id: "footer.legal", message: "Rechtliche Grundlagen" }),
          external: false,
          href: `/${localeSlugs?.legal}`,
        },
        {
          title: t({ id: "footer.about_us.label", message: "About Us" }),
          external: false,
          href: `/${localeSlugs?.aboutUs}`,
        },
        {
          title: t({ id: "footer.terms", message: "Terms and Conditions" }),
          external: false,
          href: `/${localeSlugs?.terms}`,
        },
      ]}
      nCols={isXXlAndUp ? 4 : 3}
    >
      <FooterSection>
        <FooterSectionTitle title={t({ id: "footer.about_us.label", message: "About Us" })} />
        <FooterSectionText
          text={t({
            id: "footer.id",
            message:
              "The Federal Office for Agriculture FOAG is the Confederation's competence centre for all core issues relating to the agricultural sector. The FOAG is committed to ensuring that farmers produce high-quality food sustainably and with a focus on the market.",
          })}
        />
      </FooterSection>

      <FooterSection>
        <FooterSectionTitle title={t({ id: "contact.follow.us", message: "Folgen Sie Uns" })} />
        <FooterSectionSocialMediaButtonGroup>
          <FooterSectionSocialMediaButton type="twitter" href="https://twitter.com/CHblw" />
          <FooterSectionSocialMediaButton type="facebook" href="https://www.facebook.com/CHblw/" />
          <FooterSectionSocialMediaButton
            type="youtube"
            href="https://www.youtube.com/channel/UCK0IXZ5UU8WmZTd122LN79A?view_as=subscriber"
          />
          <FooterSectionSocialMediaButton
            type="instagram"
            href="https://www.instagram.com/blw_ofag_ufag/"
          />
          <FooterSectionSocialMediaButton
            type="linkedin"
            href="https://www.linkedin.com/company/federal-office-for-agriculture/"
          />
        </FooterSectionSocialMediaButtonGroup>
        <Box
          sx={{
            marginTop: s(10),
            display: "flex",
            bgcolor: c.cobalt[500],
            border: `${c.cobalt[50]} 1px solid`,
            width: "fit-content",
            px: s(5),
            py: s(2.5),
          }}
        >
          <Link
            href={newsletterLink[isValidLocale(locale) ? locale : defaultLocale]}
            target="_blank"
          >
            <Typography sx={{ mr: 2 }}>
              {t({
                id: "footer.newsletter",
                message: "Subscribe to newsletter",
              })}
            </Typography>
          </Link>
          <SvgIcControlArrowRight width="24px" height="24px" />
        </Box>
      </FooterSection>
      {isXXlAndUp ? (
        <>
          <FooterSection>
            <FooterSectionTitle
              title={t({
                id: "footer.furtherinformation",
                message: "Further Information",
              })}
            />
            <Link
              href={`https://www.blw.admin.ch/blw/${locale}/home.html`}
              target="_blank"
              sx={{ textDecoration: "none" }}
            >
              <FooterSectionButton
                iconName="external"
                label={t({ id: "footer.blw", message: "Bundesamt für Landwirtschaft" })}
              />
            </Link>
            <Link
              href={`https://www.agrarbericht.ch/${locale}`}
              target="_blank"
              sx={{ textDecoration: "none" }}
            >
              <FooterSectionButton
                iconName="external"
                label={t({ id: "footer.report", message: "Agrarbericht" })}
              />
            </Link>
            <Link
              href={`https://www.bfs.admin.ch/bfs/${locale}/home/statistiken/preise/erhebungen/lik.html`}
              target="_blank"
              sx={{ textDecoration: "none" }}
            >
              <FooterSectionButton
                iconName="external"
                label={t({ id: "footer.priceindex", message: "Landesindex der Konsumentenpreise" })}
              />
            </Link>
            <Link
              href={`https://www.bfs.admin.ch/bfs/${locale}/home/statistiken/preise/produzentenpreise-importpreise.html`}
              target="_blank"
              sx={{ textDecoration: "none" }}
            >
              <FooterSectionButton
                iconName="external"
                label={t({
                  id: "footer.importpriceindex",
                  message: "Produzenten- und Importpreis-Index",
                })}
              />
            </Link>
          </FooterSection>
          <FooterSection>
            <FooterSectionTitle title="Feedback" />
            <Link href="mailto:marktanalysen@blw.admin.ch" target="_blank">
              <FooterSectionButton
                iconName="external"
                label={t({ id: "footer.feedback", message: "Feedback" })}
              />
            </Link>
          </FooterSection>
        </>
      ) : (
        <>
          <FooterSection
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: s(10),
              [theme.breakpoints.only("lg")]: {
                flexDirection: "row",
                justifyContent: "space-between",
              },
            }}
          >
            <Box sx={{ width: "100%" }}>
              <FooterSectionTitle
                title={t({
                  id: "footer.furtherinformation",
                  message: "Further Information",
                })}
              />
              <Link
                href={`https://www.blw.admin.ch/blw/${locale}/home.html`}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                <FooterSectionButton
                  iconName="external"
                  label={t({ id: "footer.blw", message: "Bundesamt für Landwirtschaft" })}
                />
              </Link>
              <Link
                href={`https://www.agrarbericht.ch/${locale}`}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                <FooterSectionButton
                  iconName="external"
                  label={t({ id: "footer.report", message: "Agrarbericht" })}
                />
              </Link>
              <Link
                href={`https://www.bfs.admin.ch/bfs/${locale}/home/statistiken/preise/erhebungen/lik.html`}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                <FooterSectionButton
                  iconName="external"
                  label={t({
                    id: "footer.priceindex",
                    message: "Landesindex der Konsumentenpreise",
                  })}
                />
              </Link>
              <Link
                href={`https://www.bfs.admin.ch/bfs/${locale}/home/statistiken/preise/produzentenpreise-importpreise.html`}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                <FooterSectionButton
                  iconName="external"
                  label={t({
                    id: "footer.importpriceindex",
                    message: "Produzenten- und Importpreis-Index",
                  })}
                />
              </Link>
            </Box>
            <Box
              sx={{
                mt: s(10),
                width: "100%",
                [theme.breakpoints.only("lg")]: { mt: 0 },
                [theme.breakpoints.only("md")]: { mt: s(4) },
              }}
            >
              <FooterSectionTitle title="Feedback" />
              <Link href="mailto:marktanalysen@blw.admin.ch" target="_blank">
                <FooterSectionButton
                  iconName="external"
                  label={t({ id: "footer.feedback", message: "Feedback" })}
                />
              </Link>
            </Box>
          </FooterSection>
        </>
      )}
    </Footer>
  );
};

export default FooterBLW;
