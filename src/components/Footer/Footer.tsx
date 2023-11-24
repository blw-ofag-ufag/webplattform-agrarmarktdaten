import * as React from "react";
import {
  Footer,
  FooterSection,
  FooterSectionSocialMediaButton,
  FooterSectionSocialMediaButtonGroup,
  FooterSectionText,
  FooterSectionTitle,
  FooterSectionButton,
  c,
  s,
} from "@interactivethings/swiss-federal-ci";
import { Box, Link, useMediaQuery, Typography } from "@mui/material";
import SvgIcControlArrowRight from "@/icons/icons-jsx/control/IcControlArrowRight";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { t } from "@lingui/macro";
import { makeContentWrapperProps } from "@/components/Grid/Grid";

const FooterBLW = () => {
  const theme = useTheme();
  const { locale } = useRouter();
  const isXXlAndUp = useMediaQuery(theme.breakpoints.up("xxl"));
  return (
    <Footer
      ContentWrapperProps={makeContentWrapperProps(theme)}
      bottomLinks={[
        {
          title: t({ id: "footer.impressum", message: "Impressum" }),
          href: `https://www.blw.admin.ch/blw/${locale}/home/markt/marktbeobachtung.html`,
        },
        {
          title: t({ id: "footer.legal", message: "Rechtliche Grundlagen" }),
          external: false,
          href: `/${locale}/legal`,
        },
        {
          title: t({ id: "footer.about_us.label", message: "About Us" }),
          href: `https://www.blw.admin.ch/blw/${locale}/home.html`,
        },
        {
          title: t({ id: "footer.terms", message: "Terms and Conditions" }),
          external: false,
          href: `/${locale}/terms-and-conditions`,
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
            href={`https://www.blw.admin.ch/blw/${locale}/home/services/newsletter.html`}
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
              href={`https://2022.agrarbericht.ch/${locale}`}
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
            <Link
              href={`https://www.blw.admin.ch/blw/${locale}/home/markt/marktbeobachtung.html`}
              target="_blank"
            >
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
                href={`https://2022.agrarbericht.ch/${locale}`}
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
              <Link
                href={`https://www.blw.admin.ch/blw/${locale}/home/markt/marktbeobachtung.html`}
                target="_blank"
              >
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
