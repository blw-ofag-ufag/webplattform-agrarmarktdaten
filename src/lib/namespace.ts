import { DimensionType } from "@/pages/api/use-sparql";
import namespace from "@rdfjs/namespace";

export {
  dcat,
  dcterms,
  geo,
  qudt,
  rdf,
  rdfs,
  schema,
  sh,
  skos,
  time,
  vcard,
  xsd,
} from "@tpluscode/rdf-ns-builders";

export const classifications = namespace("http://classifications.data.admin.ch/");
export const schemaAdmin = namespace("https://schema.ld.admin.ch/");
export const adminTerm = namespace("https://ld.admin.ch/definedTerm/");
export const adminVocabulary = namespace("https://ld.admin.ch/vocabulary/");
export const cube = namespace("https://cube.link/");
export const cubeView = namespace("https://cube.link/view/");
export const cubeMeta = namespace("https://cube.link/meta/");
export const view = namespace("https://cube.link/view/");

export const amdp = namespace("https://agriculture.ld.admin.ch/foag/");
export const amdpProperty = namespace("https://agriculture.ld.admin.ch/foag/property/");
export const amdpMeasure = namespace("https://agriculture.ld.admin.ch/foag/measure/");

export const energyPricing = namespace(
  "https://energy.ld.admin.ch/elcom/electricity-price/dimension/"
);

export const electricityprice = namespace("https://energy.ld.admin.ch/elcom/electricityprice/");
export const electricitypriceDimension = namespace(
  "https://energy.ld.admin.ch/elcom/electricityprice/dimension/"
);

export const addNamespaceToID = ({ dimension, id }: { dimension: string; id: string }): string => {
  // Check for full IRIs
  if (id.match(/^http(s)?:\/\//)) {
    return id;
  }

  return amdp(`${dimension}/${id}`).value;
};

export const stripNamespaceFromIri = ({ iri }: { iri: string }): string => {
  const matches = iri.match(/\/(([a-zA-Z0-9]|-)+)$/);

  if (!matches) {
    // Warn?
    return iri;
  }

  return matches[1];
};

export const getDimensionTypeFromIri = ({ iri }: { iri: string }): DimensionType => {
  const matches = iri.replace(amdp.name, "").match(/(property|measure)(?=\/([a-zA-Z]|-)+$)/);

  if (!matches) {
    // Warn?
    return iri;
  }

  return matches[1];
};
