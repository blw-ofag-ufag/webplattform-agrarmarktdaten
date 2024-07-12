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
import { keyBy } from "lodash";

// Decided not to use abbreviations for now, following https://blw-ofag-ufag.atlassian.net/browse/WAM-397?focusedCommentId=12148
export const units: Record<Locale, string[]> = {
  // https://www.bk.admin.ch/bk/de/home/dokumentation/sprachen/hilfsmittel-textredaktion/schreibweisungen.html
  de: ["", "", "Mio", "Mrd"],
  fr: ["", "", "M", "Md"],
  // https://www4.ti.ch/fileadmin/DFE/DR-USTAT/Prodotti/Definizioni/segni_sigle_simboli.pdf
  it: ["", "", "Mio", "Mrd"],
};

export const tableFormatter = ({
  dimension,
  cubeDimensions,
  timeView,
  locale = defaultLocale,
}: {
  dimension: string;
  cubeDimensions: Record<string, Property | Measure>;
  timeView?: TimeView;
  locale?: Locale;
}): ((value?: string | number) => string | number | undefined) => {
  const dim = cubeDimensions[dimension];
  if (dim && dim.dimension === "date") {
    if (timeView === "Year") {
      const formatter = timeFormat("%Y");
      return (value?: string | number) => formatter(dayjs(value).toDate());
    } else {
      const formatter = timeFormat("%m-%Y");
      return (value?: string | number) => formatter(dayjs(value).toDate());
    }
  }

  if (dim && dim.type === "measure") {
    const formatLocaleDef = match(locale)
      .with("de", () => localeDE)
      .with("fr", () => localeFR)
      .with("it", () => localeIT)
      .otherwise(() => localeDE);

    const formatter = formatLocale({
      ...formatLocaleDef,
      thousands: " ",
    } as FormatLocaleDefinition);

    return (value?: string | number) => {
      if (!isNumber(value)) return value;
      const format =
        dim.dimension === "quantity" ? ".2r" : dim.dimension === "percentage" ? ".2%" : ".2f";
      return formatter.format(format)(value);
    };
  }

  if (dim && dim.type === "property") {
    const byValue = keyBy(dim.values, (x) => x.value);
    return (value?: string | number) =>
      value !== undefined ? byValue[value]?.label ?? value : value;
  }

  return (v) => v;
};
