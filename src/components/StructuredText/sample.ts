export const sampleStructuredText = {
  value: {
    schema: "dast",
    document: {
      type: "root",
      children: [
        {
          type: "heading",
          level: 1,
          children: [
            {
              type: "span",
              marks: ["strong"],
              value: "Erhebungen entlang der Wertschöpfungskette",
            },
          ],
        },
        { type: "heading", level: 6, children: [{ type: "span", value: "Methoden" }] },
        {
          type: "paragraph",
          children: [
            { type: "span", value: "Gemäss gesetzlichem Auftrag " },
            {
              url: "https://www.fedlex.admin.ch/eli/cc/1998/3033_3033_3033/de#tit_2/chap_1/sec_5",
              meta: [{ id: "target", value: "_blank" }],
              type: "link",
              children: [{ type: "span", value: "(LwG Art. 27; SR910.1)" }],
            },
            {
              type: "span",
              value:
                " erhebt der Fachbereich Marktanalysen des Bundesamtes 100 123 123 für Landwirtschaft Preise und weitere preisbestimmende Indikatoren (z.B. Mengen) entlang den Lebensmittel-Wertschöpfungsketten von der landwirtschaftlichen Produktion bis zum Konsum. Dabei erfolgen Erhebungen zu nachfolgenden Märkten (vgl. ",
            },
            {
              url: "https://www.fedlex.admin.ch/eli/cc/1999/71/de?manifestation=https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1999/71/20170101/de/html/fedlex-data-admin-ch-eli-cc-1999-71-20170101-de-html-4.html",
              meta: [{ id: "target", value: "_blank" }],
              type: "link",
              children: [
                {
                  type: "span",
                  value:
                    "Verordnung über die Marktbeobachtung im Landwirtschaftsbereich; SR 942.31",
                },
              ],
            },
            { type: "span", value: "): " },
          ],
        },
        {
          type: "list",
          style: "bulleted",
          children: [
            {
              type: "listItem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "span", value: "Milch und Milchprodukte" }],
                },
              ],
            },
            {
              type: "listItem",
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      type: "span",
                      marks: ["highlight"],
                      value: "Fleisch, Fleisch- und Wurstwaren",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              children: [{ type: "paragraph", children: [{ type: "span", value: "Eier" }] }],
            },
            {
              type: "listItem",
              children: [
                { type: "paragraph", children: [{ type: "span", value: "Früchte und Gemüse" }] },
              ],
            },
            {
              type: "listItem",
              children: [{ type: "paragraph", children: [{ type: "span", value: "Kartoffeln" }] }],
            },
            {
              type: "listItem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "span", value: "Brotgetreide, Mehl und Backwaren" }],
                },
              ],
            },
            {
              type: "listItem",
              children: [{ type: "paragraph", children: [{ type: "span", value: "Ölsaaten" }] }],
            },
            {
              type: "listItem",
              children: [
                { type: "paragraph", children: [{ type: "span", value: "Futtermittel" }] },
              ],
            },
          ],
        },
        {
          type: "heading",
          level: 1,
          children: [{ type: "span", marks: ["strong"], value: "Konsumentenpreise" }],
        },
        { type: "heading", level: 6, children: [{ type: "span", value: "Konsum" }] },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Der Fachbereich Marktanalysen publiziert verschiedene Konsumentenpreise, die auf unterschiedlichen Erhebungssystemen basieren: ",
            },
          ],
        },
        {
          type: "list",
          style: "bulleted",
          children: [
            {
              type: "listItem",
              children: [
                {
                  type: "paragraph",
                  children: [
                    { type: "span", value: "Eigenerhebungen des Fachbereichs Marktanalysen" },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      type: "span",
                      value: "Datenlieferungen des Detailhandels und von NielsenIQ Switzerland",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          level: 2,
          children: [{ type: "span", marks: ["strong"], value: "Eigenerhebungen" }],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Bei der Datenerhebung des Fachbereichs Marktanalysen werden die Preise der ausgewählter Leader-Produkte (meistverkaufte Standard-Produkte einer Produktkategorie) entweder im Laden erhoben oder uns direkt vom Detailhandel gemeldet. Betrachtet man beispielsweise den Emmentalerkäse, so wird der Preis von klassischem Emmentaler erhoben. Mit dieser Erhebungsmethode kann die Preisentwicklung von diesem spezifischen Produkt genau nachverfolgt werden. Die definierten Produkte bleiben über die Zeit konstant, dies erhöht die Vergleichbarkeit der Preise über die Zeit. Die Preiserhebung deckt die wichtigsten Akteure im Schweizer Detailhandel ab.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Generell werden die Preise nach Regionen und Marktanteilen der Detailhändler gewichtet. Die regionale Gewichtung basiert auf den Bevölkerungszahlen des Bundesamts für Statistik und wird jährlich angepasst. Die Marktanteile der Detailhändler werden jährlich anhand der Verkaufsmengen bestimmt, welche auf dem Scanningpanel von Nielsen Schweiz beruhen.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Aktionspreise fliessen in die Berechnung ein und werden entsprechend ihrem Mehrabsatz gewichtet, wobei die Gewichtungsfaktoren für Aktionen über die Zeit konstant gehalten werden (keine Berücksichtigung der Aktionen bei Mehl, Brot/Backwaren, Speiseöl).",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Aus der Erhebung resultieren für die beobachteten Produkte regionale und nationale Durchschnittspreise für den Schweizer Detailhandel. Die Periodizitäten der Daten variieren je nach Bereich von wöchentlich, monatlich bis halbjährlich.",
            },
          ],
        },
        {
          type: "heading",
          level: 2,
          children: [
            { type: "span", marks: ["strong"], value: "NielsenIQ Switzerland als Datenquelle" },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Die analysierten Daten von NielsenIQ Switzerland basieren auf zwei verschiedenen Datenpanels:",
            },
          ],
        },
        { type: "paragraph", children: [{ type: "span", value: "• das Konsumentenpanel" }] },
        {
          type: "paragraph",
          children: [{ type: "span", value: "• das Retail- bzw. Scanningpanel" }],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Das Konsumentenpanel von NielsenIQ Switzerland besteht aus rund 4000 Haushalten der Deutsch (inkl. Tessin) und Westschweiz. Dabei erfassen die am Panel beteiligten Haushalte die gesamten Einkäufe jedes Haushaltmitglieds über das gesamte Jahr. Konkret müssen die Haushalte die Einkaufsmengen, die Preise und den Einkaufsort aller eingekauften Produkte angeben.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Im Retail- bzw. Scanningpanel von NielsenIQ Switzerland sind all jene Produkte erfasst, welche an den Kassen in den Verkaufsstellen derjenigen Detailhandelsunternehmen gescannt werden, die im Panel mitmachen. Mit Ausnahme der beiden deutschen Discounter Aldi und Lidl umfasst das Retailpanel alle nationalrelevanten Akteure im stationären Schweizer Detailhandel. Fachhändler, Fachgeschäfte (z.B. Metzgereien) und Direktvermarkter sind im Retailpanel nicht abgebildet.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Im kombinierten Panel (Konsumenten- und Retailpanel) können jene Verkaufskanäle, die nicht im Retailpanel enthalten sind (z.B. Aldi, Lidl, Fachhandel, usw.) über das Konsumentenpanel geschätzt und zusammen mit dem Retailpanel zu einem globalen Panel über den gesamten stationären Detailhandel inkl. Online verknüpft werden.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Über das kombinierte Retail-/Konsumentenpanel kann damit der gesamte stationäre Schweizer Detailhandel abgebildet und die genausten Absatz- und Umsatzzahlen genutzt werden.",
            },
          ],
        },
        {
          type: "heading",
          level: 1,
          children: [{ type: "span", value: "Milch und Milchprodukte" }],
        },
        { type: "heading", level: 6, children: [{ type: "span", value: "Milch " }] },
        { type: "heading", level: 2, children: [{ type: "span", value: "Produktion" }] },
        {
          type: "heading",
          level: 3,
          children: [
            {
              type: "span",
              marks: ["highlight"],
              value:
                "Erhebung und Berechnung des Produzentenpreises für Milch @Michel, kann das weg?",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Die Produzentenpreise für Milch werden jeden Monat bei den wichtigsten Erstmilcheinkäufern (Produzentenorganisationen PO, Produzenten-Milchverwerter-Organisationen PMO, Käsereien und Industriebetriebe mit Direktlieferanten) direkt erhoben. Rund 70 % der in der Schweiz vermarkteten Rohmilch sind so abgedeckt. Anhand eines Erhebungsformulars melden die Datenlieferanten die Durchschnittspreise, die den Produzenten tatsächlich bezahlt wurden, sowie die entsprechenden Mengen. Der Preis einer Region ist der Mittelwert der gemeldeten Preise von Milchkäufern, die Milch aus dieser Region beziehen, gewichtet nach den entsprechenden Milchmengen. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Der Preis für verkäste Milch ist ein Mittelwert der Kaufpreise, welche Unternehmen zahlen, die zur Verkäsung bestimmte Milch kaufen – gewichtet nach verkästen Mengen. Die Milchpreise der gewerblichen Käsereien werden aufgrund einer repräsentativen Stichprobe von rund 80 Käsereien verteilt auf die 5 Regionen erhoben. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Bei den publizierten Preisen handelt es sich also um gewichtete Mittelwerte, die auf der Grundlage von repräsentativen Daten berechnet wurden. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Anmerkung:" },
            {
              type: "span",
              value:
                " Die Marktsegmentierung sowie die Abzüge und Rückbehalte im Zusammenhang mit den Entlastungs- und Regulierungsmassnahmen am Milchmarkt sind bei den Produzentenpreisen für Milch berücksichtigt. Die Preise können zu einem späteren Zeitpunkt revidiert werden. Die Anpassungen werden später in den Berichten auf unserer Website erwähnt. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Im Milchpreis berücksichtigt sind: " },
            {
              type: "span",
              value:
                "Basispreis inkl. Verkäsungszulage, Zuschläge und Abzüge (Saison, Menge, Gehalt, Qualität, Transportkostenbeteiligung), Gewinnbeteiligungen, Nachzahlungen, Zuschläge und Abzüge für Kühlung, Bioprämien, Betriebskosten der Sammelstellen sofern bekannt, MWST, Beitrag für die Fonds der BO Milch ab dem 1.1.2019 (Fonds «Rohstoffverbilligung» und Fonds «Regulierung»), Nachhaltigkeitszuschlag ab dem 1.9.2019.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Im Milchpreis nicht berücksichtigt sind:" },
            {
              type: "span",
              value:
                " Zulagen für silofreie Fütterung, Abgaben an Organisationen und Berufsverbände, Beiträge an den Interventionsfonds und den Marktentlastungsfonds der Branchenorganisation Milch (BO Milch), Beitrag LactoFama, Molke, Vorbezüge jeglicher Art. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Gewichtung:" },
            {
              type: "span",
              value:
                " Die effektiv ausbezahlten Preise werden gemäss den entsprechenden Milchmengen gewichtet. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Gesamtpreis: " },
            {
              type: "span",
              value:
                "Gewichteter Durchschnitt der Preise für Molkereimilch, verkäste Milch, Biomilch und Einschränkungsmilch der gewerblichen Käsereien. Milchgehalt: Tatsächliche Gehalte. Die Basiswerte des Milchgehalts sind: 4 % Fett und 3,3 % Eiweiss. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              marks: ["strong"],
              value: "Preis für Molkereimilch (ohne verkäste Milchmenge):",
            },
            {
              type: "span",
              value:
                " Preis für die von Industriebetrieben und Produzentenorganisationen gekaufte Milch (zu Käse verarbeitete Menge ausgenommen), ab Hof (vorwiegend) oder Sammelstelle. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Preis der verkästen Milch, Total:" },
            {
              type: "span",
              value:
                " Preis der durch die Industriebetriebe und die gewerblichen Käsereien zu Käse verarbeiteten Milch. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              marks: ["strong"],
              value: "Preis der verkästen Milch, gewerbliche Käsereien:",
            },
            {
              type: "span",
              value:
                " Preis der durch die gewerblichen Käsereien zu Käse verarbeiteten Milch. Preis ab Hof oder franko Käserei / Sammelstelle (vorwiegend). ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Preis der Biomilch: " },
            {
              type: "span",
              value:
                "Preis für Milch, die nach biologischen Produktionsmethoden hergestellt und tatsächlich als Biomilch verkauft wurde. Preis ab Hof (vorwiegend) oder Sammelstelle. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Konventionelle Milch: " },
            { type: "span", value: "ÖLN-Milch (ökologischer Leistungsnachweis). " },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Regionen: " },
            {
              type: "span",
              value:
                "Die Regionen werden wie folgt abgegrenzt. Region I: Genf, Waadt, Freiburg, Neuenburg, Jura und Teile des französischsprachigen Gebiets des Kantons Bern (Verwaltungskreis Berner Jura). Region II: Bern (ausser Verwaltungskreis Berner Jura), Luzern, Unterwalden (Obwalden, Nidwalden), Uri, Zug und ein Teil des Kantons Schwyz (Bezirke Schwyz, Gersau und Küssnacht). Region III: Baselland und Basel-Stadt, Aargau und Solothurn. Region IV: Zürich, Schaffhausen, Thurgau, Appenzell (Innerrhoden und Ausserrhoden), St. Gallen, ein Teil des Kantons Schwyz (Bezirke Einsiedeln, March und Höfe), Glarus, Graubünden. Region V: Wallis und Tessin.",
            },
          ],
        },
        {
          type: "heading",
          level: 2,
          children: [{ type: "span", value: "Grosshandel/Verarbeitung" }],
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "span", value: "Grosshandelspreise für Butter und Milchpulver" }],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Die Preise für Industriebutter und Milchpulver für Industrie und Gewerbe werden bei den wichtigsten Unternehmen erhoben, die Industriebutter respektive Milchpulver herstellen und verkaufen. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Die tatsächlichen Grosshandelspreise und die entsprechenden Mengen werden monatlich mithilfe eines Erhebungsformulars erhoben. Auf der Grundlage dieser Daten wird ein mengengewichteter Durchschnittpreis für Industriebutter resp. Milchpulver berechnet.",
            },
          ],
        },
        {
          type: "heading",
          level: 3,
          children: [
            { type: "span", value: "Rahmpreisindex (Preisindex für Rahm zur Butterherstellung) " },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Mit dem Preisindex für Rahm zur Butterherstellung wird die Entwicklung des Einstandspreises von Rahm, der von den Verarbeitern übernommen wird, ausgewiesen. Der Fachbereich Marktanalysen des BLW erhebt monatlich die Rahmpreise bei den Butterproduzenten anhand von Befragungen. Die wichtigsten Rahmkäufer melden mittels Erhebungs-formular den durchschnittlichen, gewichteten Einstandspreis und die entsprechenden Mengen. Erhebungsort: Die Rahmpreise werden auf unterschiedlicher Basis bezahlt (z. B. Rahm, der am Produktionsort abgeholt oder dem Käufer abgeliefert wird). Daher wurde zur Vereinheitlichung der Rahmannahmetank als Erhebungsort bestimmt. Es handelt sich also um einen Preis franko Rahmannahmetank. Preiszusammensetzung: Der Rahmpreis umfasst folgende Kosten: Abgaben, Transport- und Rahmannahmekosten. Die MwSt. ist im Preis nicht inbegriffen. Produktdefinition: Die erhobenen Mengen und Preise beziehen sich auf den Sammelrahm und den Industrierahm, umgerechnet in Milchfett. Der Sirtenrahm wird bei den Berechnungen nicht berücksichtigt.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Berechnung von Durchschnittspreis und Index: Die Preise werden nach Mengen gewichtet. So erhält man gewichtete Durchschnittspreise in CHF/kg Milchfett. Der Index wird auf der Basis des Rahmpreises von Dezember 2009 berechnet (Index 100 = Dezember 2009). Der Durchschnittspreis von Dezember 2009 beträgt 10.92 CHF/kg Milchfett.",
            },
          ],
        },
        { type: "heading", level: 2, children: [{ type: "span", value: "Konsum" }] },
        { type: "heading", level: 3, children: [{ type: "span", value: "Konsumentenpreise" }] },
        {
          type: "paragraph",
          children: [{ type: "span", value: "Eigenerhebung Fachbereich Marktanalysen:" }],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Der Landesdurchschnitt berechnet sich aus regionalen Preiserhebungen bei Grossverteilern, Discountern (ohne Aldi und Lidl) und Fachgeschäften, gewichtet nach Marktanteilen; die Regionen werden nach Einwohnerzahl gewichtet.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Die Aktionspreise werden wöchentlich erhoben und in den Konsumentenpreisberechnungen berücksichtigt. Weitere Informationen zu den Konsumentenpreisen unter: Konsumentenpreise",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["highlight"], value: "Link Zu den Konsumentenpreisen" },
          ],
        },
        {
          type: "heading",
          level: 3,
          children: [{ type: "span", value: "Molkereimilchpreisindex" }],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Der Molkereimilchpreisindex ist eine vergangenheitsbezogene Grösse. Sie bildet die Entwicklung der Preise von Molkereimilchprodukten für den Detailhandel und die Industrie sowie der Produzentenpreise für Milch in den umliegenden Ländern ab. Der Index 100 entspricht dem durchschnittlichen Produzentenpreis für Molkereimilch im Basisjahr 2005 (Basis 100 = 2005). Der Molkereimilchpreis-Gesamtindex setzt sich aus den monatlichen Preisschwankungen dreier Produktbereiche, den sogenannten Teilindizes, zusammen. Es wird unterschieden zwischen dem Teilindex «Detailhandelsprodukte», dem Teilindex «Industrieprodukte» und dem Teilindex «Liberalisierte Produkte». Die monatliche Schwankung des Gesamtindex resultiert aus der Gewichtung der Teilindizes je nach Milchmengen, die in jedem der drei Produktbereiche umgesetzt wurden. Die Abräumungsmilch des Marktes im Jahr 2009 wurde nicht berücksichtigt. Die Gewichtungsfaktoren werden jährlich anhand der Daten des Vorjahres aktualisiert. Die Entwicklung der staatlichen Stützung wird bei der Berechnung des Gesamtindex berücksichtigt (ab Februar 2009: nur Verkäsungszulage).",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Teilindex «Detailhandelsprodukte»: " },
            {
              type: "span",
              value:
                "Der Teilindex «Detailhandelsprodukte» bildet die Entwicklung der Detailhandelspreise für drei Gruppen von Milchprodukten ab (Konsummilch, Butter und Konsumrahm). Diese Preise werden vom BLW erhoben und publiziert. Die Gewichtungskoeffizienten der Preisschwankungen für jedes Produkt werden aus den Daten der TSM (TSM Treuhand GmbH) bezüglich der Milchverwertung nach Milchäquivalent und jenen der BOB (Branchenorganisation Butter) abgeleitet. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Teilindex «Industrieprodukte»:" },
            {
              type: "span",
              value:
                " Der Teilindex «Industrieprodukte» ermittelt die Entwicklung der Grosshandelspreise für Schweizer Industriebutter sowie für Voll­ und Magermilchpulver in der Schweiz und für den Export. Die Gewichtungsfaktoren Schweizerpreise werden vom BLW erhoben. Die der Preisschwankungen für jedes Produkt werden den Daten der BSM (Branchenorganisation Schweizer Milchpulver) betreffend den Milchpulververkauf sowie jenen der TSM bezüglich der Milchverwertung nach Milchäquivalent entnommen.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Teilindex «Liberalisierte Produkte»: " },
            {
              type: "span",
              value:
                "Der Teilindex « Liberalisierte Produkte » basiert auf der Entwicklung der Produzentenpreise für Milch in den umliegenden Ländern (Deutschland, Frankreich, Österreich und Italien) aber auch der Preise für Butter sowie für Voll- und Magermilchpulver in Deutschland. Dieser Teilindex bildet das Marktsegment ab, das der europäischen Konkurrenz ausgesetzt ist. Als Quellen für diese Daten werden die Publikationen von AMI (Agrarmarkt Informations-Gesellschaft mbH, Deutschland), AMA (Agrarmarkt Austria Marketing GesmbH, Österreich), CLAL (Beratungsgesellschaft im Agrar- und Lebensmittel-sektor, insbesondere in der Milchwirtschaft, Italien) und des FranceAgriMer (Frankreich) herangezogen. Die Milchpreise der Nachbarländer sind in CHF/kg umgerechnet. Die Wechselkurse (€ / CHF) sind diejenigen der SNB (Schweizerische Nationalbank). Die Schweizer Zulage für verkäste Milch wird bei der Indexberechnung mit einbezogen. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Gewichtung des Gesamtindex:" },
            {
              type: "span",
              value:
                " Die Gewichtung des Molkereimilchpreis-Gesamtindex erfolgt über die Unterteilung der Menge an verarbeiteter Industriemilch in drei Produktbereiche, die den Teilindizes entsprechen. Die Daten stammen aus den TSM-Statistiken bezüglich der Milchverwertung nach Milchäquivalent. Folgende Produkte werden in den jeweiligen Bereichen berücksichtigt: ",
            },
          ],
        },
        {
          type: "list",
          style: "bulleted",
          children: [
            {
              type: "listItem",
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      type: "span",
                      value:
                        "Teilindex «Detailhandelsprodukte»: Konsummilch, Butter im Detailhandel und Konsumrahm. ",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      type: "span",
                      value: "Teilindex «Industrieprodukte»: Milchkonserven und Industriebutter. ",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      type: "span",
                      value:
                        "Teilindex «Liberalisierte Produkte»: Industriekäse, Joghurt und andere Frischmilchprodukte. ",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Jeder Teilindex wird nach dem Prozentsatz an umgesetzter Milch im entsprechenden Produktbereich gewichtet. Indexbasis: Der Index 100 entspricht dem durchschnittlichen Produzentenpreis für Industriemilch für das Basisjahr 2005 (Basis 100 = 2005). Dieser Preis belief sich auf 71,04 Rp./kg, ab Hof oder Sammelstelle, inkl. MwSt. (Preise vom BLW erhoben und im Marktbericht Milch publiziert).",
            },
          ],
        },
        {
          type: "heading",
          level: 1,
          children: [{ type: "span", value: "Fleisch, Fleisch- und Wurstwaren" }],
        },
        { type: "heading", level: 6, children: [{ type: "span", value: "Fleisch" }] },
        { type: "heading", level: 2, children: [{ type: "span", value: "Konsum" }] },
        {
          type: "heading",
          level: 3,
          children: [
            {
              type: "span",
              marks: ["strong"],
              value: "Effektiver Frischfleischabsatz im Schweizer Detailhandel",
            },
          ],
        },
        {
          type: "paragraph",
          children: [{ type: "span", marks: ["strong"], value: "Datengrundlage und Berechnung" }],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Der effektive Frischfleischabsatz im Schweizer Detailhandel quantifiziert den jährlichen Absatz an Fleisch und Fleischprodukten im Schweizer Detailhandel. Die Messgrösse des Absatzes ist das Frischfleischäquivalent (FFÄ). Das FFÄ drückt aus, wie viel verkaufsfertiges Frischfleisch (Schnitt Detailhandel) verarbeitet werden muss, um ein Produkt in der Absatzmenge herzustellen. Es wird nur Fleisch für die menschliche Ernährung berücksichtigt. Der effektive Frischfleischabsatz im Schweizer Detailhandel ist unterteilt in die verschiedenen Produktgruppen (Frischfleisch, Charcuterie, Konserven, verarbeitete Produkte) und Fleischarten (Rind, Kalb, Schwein, Geflügel, Kaninchen, Pferd, Lamm, Ziege und Wild).",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Basis für die Berechnungen sind die jährlichen Absatzmengen des Detailhandels aus dem kombinierten Konsumenten- und Retailpanel von NielsenIQ Switzerland ",
            },
            {
              type: "span",
              marks: ["highlight"],
              value: "[Link to section abvove NielsenIQ Switzerland als Datenquelle]",
            },
            {
              type: "span",
              value:
                ". Unter dem Begriff «Detailhandel» werden der klassische Detailhandel (Migros, Coop, Volg, Spar, etc.), die Discounter (Denner, Aldi, Lidl), der Fachhandel (Metzgereien, Bio-Fachhändler, etc.) sowie Tankstellen- und Convenience-Shops subsumiert. Für die Auswertung werden die Fleischarten Rind, Kalb, Schwein, Geflügel, Kaninchen, Pferd, Lamm, Ziege und Wild berücksichtigt. Auch alle relevanten Produktgruppen der Warengruppe Fleisch werden in die Analyse einbezogen: Frischfleisch, Charcuterieprodukte und Konserven. Ergänzend werden alle Produkte mit Fleischanteilen ausserhalb der Warengruppe Fleisch berücksichtigt, wie beispielsweise Pizza, Suppe und Teigwaren. Diese werden als Produktgruppe Produkte mit Fleischanteilen ausgewiesen. Mit dem effektiven Frischfleischabsatz im Schweizer Detailhandel lassen sich Aussagen über den Fleischabsatz im Schweizer Detailhandel pro Jahr, pro Fleischart und pro Produktgruppe machen. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Die Absatzmengen werden dazu mithilfe von Umrechnungsfaktoren in FFÄ umgerechnet. In Zusammenarbeit mit MT Metzger-Treuhand AG wurden dazu anhand von Standardrezepturen die Fleischanteile je Fleischart in den Produkten definiert. Zusätzlich wurden Gewichtsverlust durch Verarbeitung, Wasseranteil im Produkt (relevant für Wurstwaren) und Anteile an Gewürzen und Nicht-Fleisch-Anteilen im Produkt geschätzt. Mit dem daraus resultierenden Umrechnungsfaktor kann dann, ausgehend von der jeweiligen Absatzmenge, das FFÄ je Produktgruppe und Fleischart ermittelt werden. Zur Veranschaulichung sehen Sie hier für ausgewählte Produkte beispielhalft den Frischfleischäquivalent: ",
            },
          ],
        },
        { type: "paragraph", children: [{ item: "F3w1ll8QRQKQVb4_AMdZSw", type: "inlineItem" }] },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Die Ausserhausverpflegung wird als Differenz zwischen dem jährlichen Gesamtverbrauch und dem effektiven Frischfleischabsatz im Schweizer Detailhandel berechnet. Der Gesamtverbrauch wird in der ",
            },
            {
              url: "https://www.proviande.ch/sites/proviande/files/2023-03/Tabelle%20Fleischverbrauch%20D_3.pdf",
              meta: [{ id: "target", value: "_blank" }],
              type: "link",
              children: [{ type: "span", value: "Bilanzstatistik" }],
            },
            {
              type: "span",
              value:
                " von Proviande ausgewiesen und berechnet sich aus der Summe der Inlandproduktion, Importe, Exporte und Vorratsänderung, ausgedrückt als Frischfleischäquivalent. Die Absatzmengen in dem Kanal Ausserhausverpflegung umfasst damit sowohl Restaurants, Hotels, Take-away etc., als auch nicht näher bestimmbare Verluste in der Verarbeitung und Lagerung.",
            },
          ],
        },
        { type: "paragraph", children: [{ item: "4Zo20E4KRFeNvVQT0i6nkw", type: "inlineItem" }] },
        {
          type: "paragraph",
          children: [{ type: "span", marks: ["strong"], value: "Einordnung " }],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Mit dem effektiven Frischfleischabsatz im Schweizer Detailhandel lässt sich bestimmen, welcher Hauptabsatzkanal – Detailhandel oder Ausserhausverpflegung – für welche Fleischart relevant ist und welche Fleischarten in welchen Produktgruppen gefragt sind. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Die Berechnungen des effektiven Frischfleischabsatzes im Schweizer Detailhandel basieren auf den Daten des kombinierten Konsumenten- und Retailpanels von NielsenIQ Switzerland. Mit dieser Datengrundlage ist es möglich, alle Absätze von Fleischwaren und Produkten mit Fleischanteilen im Schweizer Detailhandel zu berechnen. Diese werden in der Publikation als Absätze im Kanal Detailhandel ausgewiesen. Dies bedeutet, dass auch klassische Take-away-Produkte wie Sandwiches in diesem Kanal geführt werden.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Bei der Datengrundlage gilt es ausserdem zu beachten, dass Detailhandelsabsätze von Aldi, Lidl, Metzgereien, anderen Fachhändlern und Absätze in der Direktvermarktung aus dem Konsumenten-Panel von Nielsen geschätzt werden müssen, da von diesen Unternehmen keine Kassenscanning-Daten vorliegen. Damit ist der Anteil des Detailhandels am Gesamtmarkt mit gewissen Unsicherheiten behaftet. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Weiter wird nicht jede Einkaufspräferenz in der Datengrundlage abgebildet: Es werden beispielsweise nur Produkte, die in der Schweiz verkauft werden, berücksichtigt. Einkaufstourismus ist somit nicht beziffert. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Der Kanal Ausserhausverpflegung beinhaltet neben dem Fleischabsatz im Ausserhauskanal auch nicht näher bestimmbare Verluste in der Verarbeitung und Lagerung. Diese Verluste können wir momentan nicht näher quantifizieren.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "span",
              value:
                "Mit der vorgestellten Methodik ist es trotz der genannten Unschärfen möglich, eine über die Zeit vergleichbare Annäherung der effektiven Fleischabsätze im Detailhandel zu quantifizieren.",
            },
          ],
        },
        { type: "paragraph", children: [{ item: "4vf1Ya9JQ6-mW-XJ-o6Cfg", type: "inlineItem" }] },
        { type: "heading", level: 1, children: [{ type: "span", value: "Glossar" }] },
        { type: "heading", level: 6, children: [{ type: "span", value: "Glossar" }] },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Aktionen:" },
            {
              type: "span",
              value:
                " Promotions-Massnahmen meist in Form von Preisreduktionen, um die Umsatzmenge zu steigern und/oder die Konsumenten zum Einkauf in den Laden zu bewegen.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Bio: " },
            {
              type: "span",
              value:
                "Mindestens nach Bio-Verordnung Bund (SR 910.18) gekennzeichnet und produziert.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Branchenorganisation:" },
            {
              type: "span",
              value:
                " Selbsthilfeorganisation mehrerer Teilnehmer eines Marktes (z. B. Produktion, Verarbeitung, Handel, evtl. Konsumenten), die Interessensvertretung, die Qualitäts- und Absatzförderung ihrer Produkte zum Ziel hat.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Discounter:" },
            {
              type: "span",
              value:
                " Discounter unterscheiden sich durch besonders tiefe Preise und einem schmalen Sortiment von anderen Grossverteilern (z. B. Denner (Migros), Aldi, Lidl).",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Einstandspreis: " },
            { type: "span", value: "Preis beim Ankauf der Ware, inklusive Transportkosten." },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "franko (fko), frei Haus: " },
            {
              type: "span",
              value:
                "Zusatzinformation zum Preis über den Lieferort bzw. die Transportkosten der Ware. Franko Verarbeiter heisst, dass der Preis der Ware die Lieferung an die Rampe des Verarbeiters beinhaltet.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Konsumentenpreis: " },
            {
              type: "span",
              value:
                "Regalpreise im Laden. Der durchschnittlicher Konsumentenpreis wird abhängig vom Mengenumsatz der Verteiler (Coop, Migros, Manor, etc.) und Regionen gerechnet (Gewichtung).",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Konsummilch:" },
            {
              type: "span",
              value:
                " Aufbereitete Milch, die für den menschlichen Verzehr bestimmt ist (z. B.: pasteurisierte Milch, UHT-Milch usw.).Konventionelle MilchÖLN-Milch. Der Beitragsbezüger von Direktzahlungen hat die Anforderungen des ökologischen Leistungsnachweises (ÖLN) auf dem gesamten Betrieb erfüllt.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "mengengewichtet: " },
            {
              type: "span",
              value:
                "Die Preise eines Produktes werden mit den zugehörigen Mengen multipliziert. Die Summe davon wird durch die Gesamtmenge dividiert, was den mengengewichteten Preis ergibt.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Milchnebenprodukt: " },
            {
              type: "span",
              value:
                "Nebenprodukt, das bei der Milchverarbeitung zusätzlich zum Hauptprodukt anfällt und für den Verarbeiter ein Zusatzeinkommen generiert (Molke, Rahm, Fett usw.).",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Molkereimilch: " },
            {
              type: "span",
              value:
                "Rohmilch, die nicht zu Käse verarbeitet wird, sondern für die Produktion von Konsummilch, Butter, Konsumrahm, Joghurt usw. bestimmt ist.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Molkereimilchpreisindex: " },
            {
              type: "span",
              value:
                "Der Molkereimilchpreisindex ist eine vergangenheitsbezogene Grösse. Er bildet die Entwicklung der Preise von Molkereimilchprodukten für den Detailhandel und die Industrie sowie den Produzentenpreis für Milch in den umliegenden Ländern ab.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Mehrwertsteuer (MwSt.): " },
            {
              type: "span",
              value:
                "Eine allgemeine Verbrauchs- und Konsumsteuer, die vom Bund erhoben wird und die dem Warenpreis hinzugerechnet wird.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Produzentenpreis: " },
            {
              type: "span",
              value:
                "Preis für die Rohware (Weitere Erklärungen über allfällige Zu- oder Abschläge und den Lieferort in den Marktberichten).",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Richtpreis:" },
            {
              type: "span",
              value:
                " Nicht verbindlicher Preis, der z. B. von einer Branchenorganisation ausgehandelt wurde, um die Grössenordnung bzw. die kurz- und mittelfristig zu erwartender Preise abzubilden. Richtpreise müssen vom Niveau her nicht den effektiv realisierten Werten entsprechen. Veränderungen hingegen geben Signale an die gesamte Wertschöpfungskette.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Umsatz:" },
            {
              type: "span",
              value: " Mass für die Marktbedeutung eines Produktes (Menge x Preis).",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Verkäsungszulage:" },
            {
              type: "span",
              value:
                " Stützungszahlungen an die Produzenten für Milch, die in die Käseproduktion geht.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong"], value: "Volatilität: " },
            {
              type: "span",
              value: "Preisschwankungen. Produktpreise, die stark und häufig ändern sind volatil.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong", "highlight"], value: "Wertschöpfungskette:" },
            {
              type: "span",
              marks: ["highlight"],
              value:
                " Beschreibt den gesamten Weg von der Erzeugung landwirtschaftlicher Rohstoffe über die Verarbeitung, Lagerhaltung und Handel bis zum Essen auf dem Tisch des Endverbrauchers.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            { type: "span", marks: ["strong", "highlight"], value: "Wertschöpfungsstufe: " },
            {
              type: "span",
              marks: ["highlight"],
              value: "Verarbeitungs- und Handelsstufe eines Produktes",
            },
          ],
        },
      ],
    },
  },
  blocks: [],
  links: [
    {
      __typename: "HighlightSectionRecord",
      id: "F3w1ll8QRQKQVb4_AMdZSw",
      title: "Frischfleischäquivalent",
      content: {
        links: [],
        value: {
          schema: "dast",
          document: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [
                  {
                    type: "span",
                    value:
                      "Der effektive Frischfleischabsatz im Schweizer Detailhandel wird mit der Kennzahl Frischfleischäquivalent (FFÄ) beziffert. Das FFÄ ist die Menge an verkaufsfertigem Frischfleisch (Schnitt Detailhandel), die zur Herstellung eines Produktes in der Absatzmenge erforderlich ist. Zur Veranschaulichung sind im Folgenden drei Beispiele für den FFÄ aufgeführt:",
                  },
                ],
              },
              {
                type: "list",
                style: "bulleted",
                children: [
                  {
                    type: "listItem",
                    children: [
                      {
                        type: "paragraph",
                        children: [
                          {
                            type: "span",
                            value:
                              "FFÄ = 1: Der FFÄ von 1 Kilogramm verkauftem Kalbsfilet beträgt 1 Kilogramm.",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "listItem",
                    children: [
                      {
                        type: "paragraph",
                        children: [
                          {
                            type: "span",
                            value:
                              " FFÄ > 1: Bündnerfleisch verliert bei der Herstellung Wasser. Auch beteht das Produkt nicht nur aus Fleisch, sondern auch zu einem kleinen Anteil aus Gewürzen. Der FFÄ beträgt hier 1.94 Kilogramm pro Kilogramm Bündnerfleisch. Das heisst, es werden 1.94 Kilogramm Frischfleisch benötigt, um 1 kg Bündnerfleisch herzustellen.",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "listItem",
                    children: [
                      {
                        type: "paragraph",
                        children: [
                          {
                            type: "span",
                            value:
                              "FFÄ < 1: Für die Herstellung von 1 Kilogramm Kalbsbratwurst werden 0.728 Kilogramm Frischfleisch benötigt. Der Rest des Produktes besteht aus Wasser und anderen Zutaten wie Gewürzen.",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
    },
    {
      __typename: "HighlightSectionRecord",
      id: "4Zo20E4KRFeNvVQT0i6nkw",
      title: "Datenquellen für die Analyse",
      content: {
        links: [],
        value: {
          schema: "dast",
          document: {
            type: "root",
            children: [
              {
                type: "heading",
                level: 4,
                children: [
                  { type: "span", value: "Retail- bzw. Scanningpanel von NielsenIQ Switzerland" },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    type: "span",
                    value:
                      "Die Analyse des Fleischabsatzes im Schweizer Detailhandel stützt sich auf die Datenbasis von NielsenIQ Switzerland ab. Die Datenbasis von NielsenIQ Switzerland basiert auf zwei verschiedenen Datenpanels:",
                  },
                ],
              },
              {
                type: "list",
                style: "bulleted",
                children: [
                  {
                    type: "listItem",
                    children: [
                      {
                        type: "paragraph",
                        children: [{ type: "span", value: "das Konsumentenpanel" }],
                      },
                    ],
                  },
                  {
                    type: "listItem",
                    children: [
                      {
                        type: "paragraph",
                        children: [{ type: "span", value: "das Retail- bzw. Scanningpanel" }],
                      },
                    ],
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    type: "span",
                    value:
                      "Das Konsumentenpanel von NielsenIQ Switzerland besteht aus rund 4000 Haushalten der Deutsch- und Westschweiz (ohne Tessin). Dabei erfassen die am Panel beteiligten Haushalte die gesamten Einkäufe jedes Haushaltmitglieds über das gesamte Jahr. Konkret müssen die Haushalte die Einkaufsmengen, die Preise und den Einkaufsort aller eingekauften Produkte angeben.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    type: "span",
                    value:
                      "Im Retail- bzw. Scanningpanel von NielsenIQ Switzerland sind all jene Produkte erfasst, welche an den Kassen in den Verkaufstellen derjenigen Detailhandelsunternehmen gescannt werden, die im Panel mitmachen. Mit Ausnahme der beiden deutschen Discounter Aldi und Lidl umfasst das Retailpanel alle nationalrelevanten Akteure im stationären Schweizer Detailhandel. Fachhändler, Fachgeschäfte (z.B. Metzgereien) und Direktvermarkter sind im Retailpanel nicht abgebildet.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    type: "span",
                    value:
                      "Im kombinierten Panel (Konsumenten- und Retailpanel) können jene Verkaufskanäle, die nicht im Retailpanel enthalten sind (z.B. Aldi, Lidl, Fachhandel) über das Konsumentenpanel geschätzt und zusammen mit dem Retailpanel zu einem globalen Panel über den gesamten stationären Detailhandel inkl. Online verknüpft werden. Über das kombinierte Retail-/Konsumentenpanel kann damit der gesamte stationäre Schweizer Detailhandel abgebildet und  die genausten Absatz- und Umsatzzahlen genutzt werden. Das kombinierte Panel ist die Basis für die vorliegende Analyse.",
                  },
                ],
              },
              {
                type: "heading",
                level: 4,
                children: [
                  {
                    type: "span",
                    marks: ["strong"],
                    value: "Umrechnungsfaktoren der MT Metzger-Treuhand AG",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    type: "span",
                    value:
                      "In der vorliegenden Analyse wurde mithilfe der Expertise der MT Metzger-Treuhand AG für jedes Produkt der Umrechnungsfaktor von Produktmenge zu Frischfleischäquivalent definiert. Dieser Umrechnungsfaktor beeinhaltet den Fleischanteil je Fleischart, den Gewichtsverlust durch Verarbeitung, Wasseranteil im Produkt (relevant für Wurstwaren) und Anteile an Gewürzen und Nicht-Fleisch im Produkt. Dieser bildet zusammen mit den Daten von NilesenIQ Switzerland die Grundlage, um das Frischfleischäquivalent im Schweizer Detailhandel zu berechen.",
                  },
                ],
              },
              {
                type: "heading",
                level: 4,
                children: [
                  { type: "span", marks: ["strong"], value: "Angebotsbilanz von Proviande" },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    type: "span",
                    value:
                      "Um den Vergleich zum Gesamtverbrauch und damit zur Ausserhausverpflegung zu ziehen, wurden Daten zum jährlichen Fleischverbrauch der Proviande verwendet. Der Gesamtverbrauch berechnet sich hier aus der Summe der Inlandproduktion , Importe, Exporte und Vorratsänderung, ausgedrückt als Frischfleischäquivalent.",
                  },
                ],
              },
            ],
          },
        },
      },
    },
    {
      __typename: "HighlightSectionRecord",
      id: "4vf1Ya9JQ6-mW-XJ-o6Cfg",
      title: "Weiterführende Informationen",
      content: {
        links: [],
        value: {
          schema: "dast",
          document: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [
                  {
                    url: "https://www.admin.ch/gov/de/start/rechtliches.html",
                    meta: [{ id: "target", value: "_blank" }],
                    type: "link",
                    children: [{ type: "span", value: "Haftung, Datenschutz und Copyright" }],
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    url: "https://www.fedlex.admin.ch/eli/cc/1998/3033_3033_3033/de#art_27",
                    meta: [{ id: "target", value: "_blank" }],
                    type: "link",
                    children: [{ type: "span", value: "Art. 27 des Landwirtschaftsgesetzes" }],
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    url: "https://www.fedlex.admin.ch/eli/cc/1999/71/de",
                    meta: [{ id: "target", value: "_blank" }],
                    type: "link",
                    children: [
                      {
                        type: "span",
                        value: "Verordnung über die Marktbeobachtung im Landwirtschaftsbereich",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
    },
  ],
};
