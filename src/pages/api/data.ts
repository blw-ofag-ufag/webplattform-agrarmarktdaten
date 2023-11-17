import { DIMENSIONS, Dimension, dataDimensions } from "@/domain/dimensions";
import {
  queryBaseMeasureDimensions,
  queryBasePropertyDimensions,
  queryCubeDimensions,
  queryCubes,
  queryMeasureDimensionRange,
  queryObservations,
  queryPropertyDimensionAndValues,
} from "@/lib/cube-queries";
import { amdp, amdpDimension, amdpMeasure } from "@/lib/namespace";
import { Locale, defaultLocale } from "@/locales/locales";
import { regroupTrees } from "@/utils/trees";
import { HierarchyNode, getHierarchy } from "@zazuko/cube-hierarchy-query";
import { AnyPointer } from "clownface";
import { groupBy, orderBy, uniqBy } from "lodash";
import { Source } from "rdf-cube-view-query";
import rdf from "rdf-ext";
import StreamClient from "sparql-http-client";
import { z } from "zod";
import * as ns from "../../lib/namespace";
import { sparqlEndpoint } from "./sparql";

export const fetchSparql = async (query: string) => {
  console.log("> fetchSparql");
  const body = JSON.stringify({ query });
  const res = await fetch("/api/sparql", {
    method: "post",
    body,
  }).then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
  return res;
};

export type TimeView = "Year" | "Month";

const cubeSpecSchema = z
  .object({
    cube: z
      .string()
      .startsWith(amdp("cube").value, { message: "Must be a valid AMDP cube" })
      .transform((v) => ns.removeNamespace(v, amdp)),
    valueChain: z
      .string()
      .startsWith(amdp("value-chain").value, {
        message: "Must be a valid AMDP value chain",
      })
      .transform((v) => ns.removeNamespace(v, amdp)),
    market: z
      .string()
      .startsWith(amdp("market").value, { message: "Must be a valid AMDP market" })
      .transform((v) => ns.removeNamespace(v, amdp)),
    measure: z
      .string()
      .startsWith(amdpMeasure().value, { message: "Must be a valid AMDP measure" })
      .transform((v) => ns.removeNamespace(v, amdpMeasure)),
  })
  .transform((cubeSpec) => ({
    ...cubeSpec,
    timeView: cubeSpec.cube.match(/_(Year|Month)$/)?.[1] as TimeView,
  }));

export type CubeSpec = z.infer<typeof cubeSpecSchema>;

/**
 * Fetches the list of available cubes.
 */
export const fetchCubes = async () => {
  console.log("> fetchCubes");
  const query = queryCubes();
  const cubesRaw = await fetchSparql(query);
  const cubes = z.array(cubeSpecSchema).parse(cubesRaw);
  return cubes;
};

const measureSchema = z.object({
  dimension: z
    .string()
    .startsWith(amdpMeasure().value)
    .transform((v) => ns.removeNamespace(v, amdpMeasure)),
  label: z.string(),
  range: z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .optional(),
  type: z.literal("measure").optional(),
});

const propertyRawSchema = z.object({
  dimension: z.string(),
  label: z.string().optional(),
  dimensionValue: z.string(),
  dimensionValueLabel: z.string(),
});

const propertySchema = z.object({
  dimension: z
    .string()
    .startsWith(amdpDimension().value)
    .transform((v) => ns.removeNamespace(v, amdpDimension)),
  label: z.string().optional(),
  type: z.literal("property").optional(),
  values: z.array(
    z.object({
      value: z.string().transform((v) => ns.removeNamespace(v, amdp)),
      label: z.string(),
    })
  ),
});

export type Measure = z.infer<typeof measureSchema>;
export type Property = z.infer<typeof propertySchema>;

const baseMeasures = [
  amdpMeasure("price").value,
  amdpMeasure("quantity").value,
  amdpMeasure("index").value,
];
const baseProperties = [amdpDimension("market").value, amdpDimension("value-chain").value];

const basePropertiesSchema = z.object({
  "value-chain": propertySchema,
  market: propertySchema,
});

/**
 *
 * Base dimensions are the dimensions that we use to know which cube to fetch.
 * Therefore these do not depend on the cube itself.
 * Measure dimensions returned do not include min/max values, as these are cube-specific.
 */
export const fetchBaseDimensions = async ({ locale }: { locale: Locale }) => {
  console.log("> fetchBaseDimensions");
  const queryProperties = queryBasePropertyDimensions({
    locale,
    propertiesIri: baseProperties,
  });
  const queryMeasures = queryBaseMeasureDimensions({
    locale,
    measuresIri: baseMeasures,
  });

  const [propertiesRaw, measuresRaw] = await Promise.all([
    fetchSparql(queryProperties),
    fetchSparql(queryMeasures),
  ]);

  const propertiesRawParsed = z.array(propertyRawSchema).parse(propertiesRaw);
  const propertiesValuesGroups = groupBy(propertiesRawParsed, "dimension");

  const properties = basePropertiesSchema.parse(
    baseProperties.reduce(
      (acc, dimension) => {
        const values = propertiesValuesGroups[dimension] ?? [];
        const dim = propertiesRawParsed.find((property) => property.dimension === dimension);
        if (baseProperties.includes(dimension)) {
          return {
            ...acc,
            [ns.removeNamespace(dimension, amdpDimension)]: {
              dimension,
              label: dim?.label,
              values: values.map((value) => ({
                value: value.dimensionValue,
                label: value.dimensionValueLabel,
              })),
            },
          };
        }
        return acc;
      },
      {} as Record<string, Property>
    )
  );

  const measuresRawParsed = z.array(measureSchema).parse(measuresRaw);
  const measure = measuresRawParsed.flatMap((measure) => {
    return {
      dimension: measure.dimension,
      label: measure.label,
    };
  });

  return {
    properties,
    measure,
  };
};

const dimensionTypeSchema = z.union([z.literal("measure"), z.literal("property")]);
export type DimensionType = z.infer<typeof dimensionTypeSchema>;

const dimensionSpecSchema = z.object({
  dimension: z.string(),
  label: z.string().optional(),
  type: z.string().optional(),
});

/**
 * Fetches the dimensions of a cube. This includes the min/max values for measure dimensions, and
 * the values for property dimensions.
 */
export const fetchCubeDimensions = async (locale: Locale, cubeIri: string) => {
  console.log("> fetchCubeDimensions");
  const fullCubeIri = ns.addNamespace(cubeIri);
  const queryDimensions = queryCubeDimensions({
    locale,
    cubeIri: fullCubeIri,
  });

  const dimensionsRaw = await fetchSparql(queryDimensions);
  const dimensionsRawParsed = z.array(dimensionSpecSchema).parse(dimensionsRaw);

  const measureDim = dimensionsRawParsed.filter(
    (dim) => dim.type === ns.cube("MeasureDimension").value
  );
  const propertyDim = dimensionsRawParsed.filter(
    (dim) => dim.type === ns.cube("KeyDimension").value
  );

  const propertiesValues = await fetchSparql(
    queryPropertyDimensionAndValues({
      locale,
      cubeIri: fullCubeIri,
      dimensionsIris: propertyDim.map((dim) => dim.dimension),
    })
  );

  const propertyValuesPerDimension = groupBy(propertiesValues, "dimension");

  const properties = propertyDim.map((dim) => {
    const values = propertyValuesPerDimension[dim.dimension];
    return propertySchema.parse({
      dimension: dim.dimension,
      label: dim.label,
      type: "property" as const,
      values: values ? values.map((v) => ({ value: v.value, label: v.label })) : [],
    });
  });

  const measures = await Promise.all([
    ...measureDim.map(async (dim) => {
      const range = await fetchSparql(
        queryMeasureDimensionRange({ locale, cubeIri: fullCubeIri, dimensionIri: dim.dimension })
      );

      return measureSchema.parse({
        ...dim,
        type: "measure",
        range: {
          min: +range[0].min,
          max: +range[0].max,
        },
      });
    }),
  ]);

  return {
    measures: measures.reduce(
      (acc, measure) => {
        return {
          ...acc,
          [measure.dimension]: measure,
        };
      },
      {} as Record<string, Measure>
    ),
    properties: properties.reduce(
      (acc, property) => {
        return {
          ...acc,
          [property.dimension]: property,
        };
      },
      {} as Record<string, Property>
    ),
  };
};

export const toKebabCase = (v: string) =>
  v.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
export const toCamelCase = (v: string) => v.replace(/-./g, (x) => x[1].toUpperCase());

const observationSchema = z
  .object({
    observation: z.string().transform((v) => ns.removeNamespace(v, amdp)),
    measure: z.string().transform((v) => +v),
    ...DIMENSIONS.reduce(
      (acc, d) => {
        return {
          ...acc,
          [toCamelCase(d)]: z.string().transform((v) => ns.removeNamespace(v, amdp)),
        };
      },
      {} as Record<Dimension, z.ZodEffects<z.ZodString, string, string>>
    ),
  })
  .transform((v) => {
    return Object.entries(v).reduce(
      (acc, [key, value]) => {
        return {
          ...acc,
          [toKebabCase(key)]: value,
        };
      },
      {} as Record<Dimension, string> & { observation: string; measure: number }
    );
  });

export type Observation = z.infer<typeof observationSchema>;

export const fetchObservations = async ({
  cubeIri,
  filters = {},
  measure,
}: {
  cubeIri: string;
  filters: Record<string, string[]>;
  measure: { iri: string; key: string };
}) => {
  console.log("> fetchObservations");
  const fullCubeIri = ns.addNamespace(cubeIri);

  const query = queryObservations({
    cubeIri: fullCubeIri,
    filters: Object.entries(filters).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [toCamelCase(key)]: value.map((v) => ns.addNamespace(v)),
      };
    }, {}),
    measure,
    dimensions: DIMENSIONS.map((v) => ({
      iri: dataDimensions[v].iri,
      key: toCamelCase(v),
    })),
  });

  const observationsRaw = await fetchSparql(query);
  const observations = z.array(observationSchema).parse(observationsRaw);

  return {
    observations,
    query: getSparqlEditorUrl(query),
  };
};

export const getSparqlEditorUrl = (query: string): string | null => {
  return `${sparqlEndpoint}/sparql#query=${encodeURIComponent(query)}&requestMethod=POST`;
};

const amdpSource = new Source({
  endpointUrl: `${sparqlEndpoint}/query`,
  sourceGraph: "https://lindas.admin.ch/foag/agricultural-market-data",
});

const sparqlClient = new StreamClient({
  endpointUrl: `${sparqlEndpoint}/query`,
});

/**
 *
 * Fetch the hierarchies for a given dimension.
 * Approach adapted from: https://github.dev/visualize-admin/visualization-tool/blob/main/app/rdf/query-hierarchies.ts
 */
export const fetchHierarchy = async ({
  cubeIri,
  dimensionIri,
  locale,
}: {
  cubeIri: string;
  dimensionIri: string;
  locale: Locale;
  asTree?: boolean;
}) => {
  console.log("> fetchHierarchy");
  const cube = await amdpSource.cube(amdp(cubeIri).value);

  if (!cube) {
    throw new Error(`Cube not found: ${cubeIri}`);
  }

  const hierarchiesPointers = uniqBy(
    cube.ptr
      .any()
      .has(ns.sh.path, rdf.namedNode(dimensionIri))
      .has(ns.cubeMeta.inHierarchy)
      .out(ns.cubeMeta.inHierarchy)
      .toArray(),
    (h) => getName(h, { locale })
  );

  if (hierarchiesPointers.length === 0) {
    return [];
  }

  const hierarchyNodes = uniqBy(
    await Promise.all(
      hierarchiesPointers.map(async (h) => {
        const nodes = await getHierarchy(h).execute(sparqlClient, rdf);
        const name = getName(h, { locale });
        return {
          nodes,
          name,
        };
      })
    ),
    "name"
  );

  const trees = hierarchyNodes.map((h) => {
    const tree: ($FixMe & { hierarchyName?: string })[] = toTree(h.nodes, locale);

    if (tree.length > 0) {
      // Augment hierarchy value with hierarchyName so that when regrouping
      // below, we can create the fake nodes
      tree[0].hierarchyName = h.name;
    }
    return tree;
  });

  const tree = regroupTrees(trees);

  return tree ?? [];
};

export const getName = (pointer: AnyPointer, { locale }: { locale: string }) => {
  const term =
    pointer
      .out(ns.schema`name`)
      .terms.find((term) => term.termType === "Literal" && term.language === locale) ??
    pointer
      .out(ns.schema`name`)
      .terms.find((term) => term.termType === "Literal" && term.language === defaultLocale);

  return term?.value ?? "---";
};

const toTree = (results: HierarchyNode[], locale: string): $FixMe[] => {
  const sortChildren = (children: $FixMe[]) => orderBy(children, ["position", "identifier"]);
  const serializeNode = (node: HierarchyNode, depth: number): $FixMe | undefined => {
    const name = getName(node.resource, { locale });
    // TODO Find out why some hierachy nodes have no label. We filter
    // them out at the moment
    // @see https://zulip.zazuko.com/#narrow/stream/40-bafu-ext/topic/labels.20for.20each.20hierarchy.20level/near/312845
    const res: $FixMe | undefined = name
      ? {
          label: name || node.resource.value,
          value: node.resource.value,
          path: node.resource.out(ns.sh.path).term?.value,
          children: sortChildren(
            node.nextInHierarchy
              .map((childNode) => serializeNode(childNode, depth + 1))
              .filter(truthy)
              .filter((d) => d.label)
          ),
          depth,
          dimension: getDimensionFromValue(node.resource.value),
        }
      : undefined;
    return res;
  };

  return sortChildren(results.map((r) => serializeNode(r, 0)).filter(truthy));
};

type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T; // from lodash

/**
 * Enables type narrowing through Array::filter
 *
 * @example
 * const a = [1, undefined].filter(Boolean) // here the type of a is (number | undefined)[]
 * const b = [1, undefined].filter(truthy) // here the type of b is number[]
 */
export function truthy<T>(value: T): value is Truthy<T> {
  return !!value;
}

const getDimensionFromValue = (dimensionValueIri: string) => {
  return amdpDimension(ns.removeNamespace(dimensionValueIri).match(/^([a-zA-Z]|-)*(?=\/)/)?.[0])
    .value;
};
