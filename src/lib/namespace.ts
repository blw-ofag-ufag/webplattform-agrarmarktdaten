import { DimensionType } from "@/pages/api/data";
import namespace, { NamespaceBuilder } from "@rdfjs/namespace";

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
export const amdpDimension = namespace("https://agriculture.ld.admin.ch/foag/dimension/");
export const amdpMeasure = namespace("https://agriculture.ld.admin.ch/foag/measure/");

export const removeNamespace = (fullIri: string, namespace: NamespaceBuilder<string> = amdp) => {
  return fullIri.replace(namespace().value, "");
};

export const addNamespace = (partialIri: string) => {
  return amdp(partialIri).value;
};

export const getIriForDimension = (type: DimensionType, id: string) => {
  if (type === "measure") {
    return amdpMeasure(id);
  }
  if (type === "property") {
    return amdpDimension(id);
  }
  return id;
};
