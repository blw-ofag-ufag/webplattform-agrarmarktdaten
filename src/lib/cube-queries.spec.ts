import { DIMENSIONS, dataDimensions } from "@/domain/dimensions";
import { queryObservations } from "@/lib/cube-queries";
import { toCamelCase } from "@/utils/stringCase";
import { describe, test, expect } from "vitest";
import spfmt from "sparql-formatter";

const filters = {
  product: [
    "https://agriculture.ld.admin.ch/foag/product/10",
    "https://agriculture.ld.admin.ch/foag/product/11",
    "https://agriculture.ld.admin.ch/foag/product/12",
    "https://agriculture.ld.admin.ch/foag/product/13",
    "https://agriculture.ld.admin.ch/foag/product/31",
    "https://agriculture.ld.admin.ch/foag/product/32",
    "https://agriculture.ld.admin.ch/foag/product/33",
    "https://agriculture.ld.admin.ch/foag/product/35",
    "https://agriculture.ld.admin.ch/foag/product/36",
    "https://agriculture.ld.admin.ch/foag/product/4",
    "https://agriculture.ld.admin.ch/foag/product/41",
    "https://agriculture.ld.admin.ch/foag/product/42",
    "https://agriculture.ld.admin.ch/foag/product/43",
    "https://agriculture.ld.admin.ch/foag/product/45",
    "https://agriculture.ld.admin.ch/foag/product/46",
    "https://agriculture.ld.admin.ch/foag/product/5",
    "https://agriculture.ld.admin.ch/foag/product/6",
    "https://agriculture.ld.admin.ch/foag/product/7",
    "https://agriculture.ld.admin.ch/foag/product/8",
    "https://agriculture.ld.admin.ch/foag/product/9",
  ],
  salesRegion: [
    "https://agriculture.ld.admin.ch/foag/sales-region/0",
    "https://agriculture.ld.admin.ch/foag/sales-region/1",
    "https://agriculture.ld.admin.ch/foag/sales-region/11",
    "https://agriculture.ld.admin.ch/foag/sales-region/14",
    "https://agriculture.ld.admin.ch/foag/sales-region/15",
    "https://agriculture.ld.admin.ch/foag/sales-region/3",
    "https://agriculture.ld.admin.ch/foag/sales-region/4",
    "https://agriculture.ld.admin.ch/foag/sales-region/5",
    "https://agriculture.ld.admin.ch/foag/sales-region/6",
  ],
};

describe("cube queries", () => {
  test("it should make a sparql query", () => {
    const query = queryObservations({
      cubeIri: "https://agriculture.ld.admin.ch/foag/cube/MilkDairyProducts/Production_Price_Year",
      dimensions: DIMENSIONS.map((v) => ({
        iri: dataDimensions[v].iri,
        key: toCamelCase(v),
      })),
      filters,
      measure: {
        iri: "https://agriculture.ld.admin.ch/foag/measure/price",
        key: "value",
      },
      timeFilter: {
        mode: "Year",
        minDate: {
          year: "2020",
        },
        maxDate: {
          year: "2023",
        },
      },
    });
    expect(spfmt(query)).toMatchInlineSnapshot(`
      "PREFIX cube: <https://cube.link/>
      PREFIX sh: <http://www.w3.org/ns/shacl#>
      PREFIX schema: <http://schema.org/>
      PREFIX time: <http://www.w3.org/2006/time#>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

      SELECT DISTINCT ?observation ?costComponent ?currency ?dataMethod ?dataSource ?date
        ?foreignTrade ?keyIndicatorType ?market ?product ?productGroup ?productSubgroup
        ?productProperties ?productionSystem ?productOrigin ?salesRegion ?unit ?usage ?valueChainDetail
        ?valueChain ?measure ?year ?month
      WHERE {
        GRAPH <https://lindas.admin.ch/foag/agricultural-market-data> {
          VALUES (?product) { (<https://agriculture.ld.admin.ch/foag/product/10>) (<https://agriculture.ld.admin.ch/foag/product/11>) (<https://agriculture.ld.admin.ch/foag/product/12>) (<https://agriculture.ld.admin.ch/foag/product/13>) (<https://agriculture.ld.admin.ch/foag/product/31>) (<https://agriculture.ld.admin.ch/foag/product/32>) (<https://agriculture.ld.admin.ch/foag/product/33>) (<https://agriculture.ld.admin.ch/foag/product/35>) (<https://agriculture.ld.admin.ch/foag/product/36>) (<https://agriculture.ld.admin.ch/foag/product/4>) (<https://agriculture.ld.admin.ch/foag/product/41>) (<https://agriculture.ld.admin.ch/foag/product/42>) (<https://agriculture.ld.admin.ch/foag/product/43>) (<https://agriculture.ld.admin.ch/foag/product/45>) (<https://agriculture.ld.admin.ch/foag/product/46>) (<https://agriculture.ld.admin.ch/foag/product/5>) (<https://agriculture.ld.admin.ch/foag/product/6>) (<https://agriculture.ld.admin.ch/foag/product/7>) (<https://agriculture.ld.admin.ch/foag/product/8>) (<https://agriculture.ld.admin.ch/foag/product/9>) }
          VALUES (?salesRegion) { (<https://agriculture.ld.admin.ch/foag/sales-region/0>) (<https://agriculture.ld.admin.ch/foag/sales-region/1>) (<https://agriculture.ld.admin.ch/foag/sales-region/11>) (<https://agriculture.ld.admin.ch/foag/sales-region/14>) (<https://agriculture.ld.admin.ch/foag/sales-region/15>) (<https://agriculture.ld.admin.ch/foag/sales-region/3>) (<https://agriculture.ld.admin.ch/foag/sales-region/4>) (<https://agriculture.ld.admin.ch/foag/sales-region/5>) (<https://agriculture.ld.admin.ch/foag/sales-region/6>) }
          <https://agriculture.ld.admin.ch/foag/cube/MilkDairyProducts/Production_Price_Year> cube:observationSet ?observationSet .
          ?observationSet cube:observation ?observation .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/cost-component> ?costComponent .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/currency> ?currency .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/data-method> ?dataMethod .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/data-source> ?dataSource .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/date> ?date .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/foreign-trade> ?foreignTrade .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/key-indicator-type> ?keyIndicatorType .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/market> ?market .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/product> ?product .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/product-group> ?productGroup .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/product-subgroup> ?productSubgroup .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/product-properties> ?productProperties .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/production-system> ?productionSystem .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/product-origin> ?productOrigin .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/sales-region> ?salesRegion .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/unit> ?unit .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/usage> ?usage .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/value-chain-detail> ?valueChainDetail .
          ?observation <https://agriculture.ld.admin.ch/foag/dimension/value-chain> ?valueChain .
          ?observation <https://agriculture.ld.admin.ch/foag/measure/price> ?measure .
        }
        ?date time:year ?year .
        OPTIONAL {
          ?date time:month ?month .
        }
        ?fromInterval time:year "2020"^^schema:Integer ;
                      time:hasBeginning/time:inXSDDateTimeStamp ?fromPeriod .
        ?toInterval time:year "2023"^^schema:Integer ;
                    time:hasEnd/time:inXSDDateTimeStamp ?toPeriod .
        ?date time:hasBeginning/time:inXSDDateTimeStamp ?start .
        ?date time:hasEnd/time:inXSDDateTimeStamp ?end .
        FILTER (?start >= ?fromPeriod)
        FILTER (?end <= ?toPeriod)
      }
      ORDER BY ?year ?month"
    `);
  });
});
