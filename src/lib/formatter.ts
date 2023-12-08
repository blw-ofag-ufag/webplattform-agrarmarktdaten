import { Locale, defaultLocale } from "@/locales/locales";
import { Measure, Property, TimeView } from "@/pages/api/data";
import { FormatLocaleDefinition, formatLocale, timeFormat } from "d3";
import dayjs from "dayjs";
import { isNumber } from "remeda";
import { match } from "ts-pattern";
// @ts-expect-error https://stackoverflow.com/questions/74072409/webpack-doesnt-resolve-imports-of-json-files-from-d3-packages
import localeDE from "d3-format/locale/de-CH";
// @ts-expect-error
import localeFR from "d3-format/locale/fr-FR";
// @ts-expect-error
import localeIT from "d3-format/locale/it-IT";
import millify from "millify";

// Decided not to use abbreviations for now, following https://blw-ofag-ufag.atlassian.net/browse/WAM-397?focusedCommentId=12148
export const units: Record<Locale, string[]> = {
  // https://www.bk.admin.ch/bk/de/home/dokumentation/sprachen/hilfsmittel-textredaktion/schreibweisungen.html
  de: ["", "", "Mio", "Mrd"],
  fr: ["", "", "M", "Md"],
  // https://www4.ti.ch/fileadmin/DFE/DR-USTAT/Prodotti/Definizioni/segni_sigle_simboli.pdf
  it: ["", "", "Mio", "Mrd"],
};

export const tableFormatter = ({
  value,
  dimension,
  cubeDimensions,
  timeView,
  locale = defaultLocale,
}: {
  value?: string | number;
  dimension: string;
  cubeDimensions: Record<string, Property | Measure>;
  timeView?: TimeView;
  locale?: Locale;
}) => {
  const dim = cubeDimensions[dimension];
  if (dim && dim.dimension === "date") {
    if (timeView === "Year") {
      return timeFormat("%Y")(dayjs(value).toDate());
    }
    return timeFormat("%m-%Y")(dayjs(value).toDate());
  }
  if (dim && dim.type === "measure") {
    if (!isNumber(value)) return value;

    const formatLocaleDef = match(locale)
      .with("de", () => localeDE)
      .with("fr", () => localeFR)
      .with("it", () => localeIT)
      .otherwise(() => localeDE);

    const formatter = formatLocale({
      ...formatLocaleDef,
      thousands: " ",
    } as FormatLocaleDefinition);

    return dim.dimension === "quantity"
      ? formatter.format(",.2r")(value)
      : formatter.format(`.2f`)(value);
  }
  if (dim && dim.type === "property") {
    return dim.values.find((v) => v.value === value)?.label ?? value;
  }
  return value;
};
