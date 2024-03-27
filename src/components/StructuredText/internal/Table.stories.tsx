import TableComponent from "./Table";

const content = [
  {
    Fachbegriff: "Aktionen",
    Definition:
      "Promotions-Massnahmen meist in Form von Preisreduktionen, um die Umsatzmenge zu steigern und/oder die Konsumenten zum Einkauf in den Laden zu bewegen.",
  },
  {
    Fachbegriff: "Aufschlagsaktionen Eier",
    Definition:
      "Aufschlagen inländischer Konsumeier zur Herstellung von Eiprodukten im Rahmen von Marktentlastungsmassnahmen. Weitere Informationen und rechtliche Grundlagen finden Sie unter Eier.",
  },
  {
    Fachbegriff: "Bio",
    Definition: "Mindestens nach Bio-Verordnung Bund (SR 910.18) gekennzeichnet und produziert.",
  },
  {
    Fachbegriff: "Branchenorganisation",
    Definition:
      "Selbsthilfeorganisation mehrerer Teilnehmer eines Marktes (z. B. Produktion, Verarbeitung, Handel, evtl. Konsumenten), die Interessensvertretung, die Qualitäts- und Absatzförderung ihrer Produkte zum Ziel hat.",
  },
  {
    Fachbegriff: "Discounter",
    Definition:
      "Discounter unterscheiden sich durch besonders tiefe Preise und einem schmalen Sortiment von anderen Grossverteilern (z. B. Denner (Migros), Aldi, Lidl).",
  },
  {
    Fachbegriff: "Eier zweiter Klasse",
    Definition:
      "Eier, die nicht dem Standard für hochwertige Eier entsprechen, da sie Mängel wie Bruch, Blut, Schmutz aufweisen oder nicht den Standardgrössen entsprechen (Kaliber).",
  },
  {
    Fachbegriff: "Einstandspreis",
    Definition: "Preis beim Ankauf der Ware, inklusive Transportkosten.",
  },
  {
    Fachbegriff: "Eiprodukte",
    Definition:
      "Eiprodukte entstehen nach dem Aufschlag von Eiern und der Verarbeitung der Eimasse – Vollei oder getrennt nach Eigelb und Eiweiss – zu flüssigen und pasteurisierten oder getrockneten Produkten.",
  },
  {
    Fachbegriff: "franko (fko), frei Haus",
    Definition:
      "Zusatzinformation zum Preis über den Lieferort bzw. die Transportkosten der Ware. Franko Verarbeiter heisst, dass der Preis der Ware die Lieferung an die Rampe des Verarbeiters beinhaltet.",
  },
  {
    Fachbegriff: "Konsumeier",
    Definition:
      "Konsumeier sind Schaleneier, die im Gegensatz zu den Verarbeitungseiern und den Eiprodukten in der Schale bis zum Verbraucher gelangen.",
  },
  {
    Fachbegriff: "Konsumentenpreis",
    Definition:
      "Regalpreise im Laden. Der durchschnittlicher Konsumentenpreis wird abhängig vom Mengenumsatz der Verteiler (Coop, Migros, Manor, etc.) und Regionen gerechnet (Gewichtung).",
  },
  {
    Fachbegriff: "Konsummilch",
    Definition:
      "Aufbereitete Milch, die für den menschlichen Verzehr bestimmt ist (z. B.: pasteurisierte Milch, UHT-Milch usw.).Konventionelle MilchÖLN-Milch. Der Beitragsbezüger von Direktzahlungen hat die Anforderungen des ökologischen Leistungsnachweises (ÖLN) auf dem gesamten Betrieb erfüllt.",
  },
  {
    Fachbegriff: "Kükenstatistik",
    Definition:
      "Die Schweizer Eierproduktion wird vom Aviforum hochgerechnet und geschätzt aufgrund der Anzahl der in Schweizer Brütereien geschlüpften Legeküken sowie der Küken- und Junghennenimporte  («Kükenstatistik»).",
  },
  {
    Fachbegriff: "Marktentlastungsmassnahmen Eier",
    Definition:
      "befristete Verwertungsmassnahmen, um Preiseinbrüche zu verhindern. Dazu zählen Aufschlagaktionen und Verbilligungsaktionen. Weitere Informationen und rechtliche Grundlagen finden Sie unter Eier.",
  },
  {
    Fachbegriff: "Mengengewichtet",
    Definition:
      "Die Preise eines Produktes werden mit den zugehörigen Mengen multipliziert. Die Summe davon wird durch die Gesamtmenge dividiert, was den mengengewichteten Preis ergibt.",
  },
  {
    Fachbegriff: "Milchnebenprodukt",
    Definition:
      "Nebenprodukt, das bei der Milchverarbeitung zusätzlich zum Hauptprodukt anfällt und für den Verarbeiter ein Zusatzeinkommen generiert (Molke, Rahm, Fett usw.).",
  },
  {
    Fachbegriff: "Molkereimilch",
    Definition:
      "Rohmilch, die nicht zu Käse verarbeitet wird, sondern für die Produktion von Konsummilch, Butter, Konsumrahm, Joghurt usw. bestimmt ist.",
  },
  {
    Fachbegriff: "Molkereimilchpreisindex",
    Definition:
      "Der Molkereimilchpreisindex ist eine vergangenheitsbezogene Grösse. Er bildet die Entwicklung der Preise von Molkereimilchprodukten für den Detailhandel und die Industrie sowie den Produzentenpreis für Milch in den umliegenden Ländern ab.",
  },
  {
    Fachbegriff: "Mehrwertsteuer (MwSt.)",
    Definition:
      "Eine allgemeine Verbrauchs- und Konsumsteuer, die vom Bund erhoben wird und die dem Warenpreis hinzugerechnet wird.",
  },
];

export const Table = () => {
  return <TableComponent content={content} />;
};
export default {
  component: Table,
  title: "App Components / Table",
};
