import { EnvironmentUrl } from "@/domain/cubes";
import { DIMENSIONS, Dimension, dataDimensions } from "@/domain/dimensions";
import {
  TimeFilter,
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
import { toCamelCase, toKebabCase } from "@/utils/stringCase";
import { regroupTrees } from "@/utils/trees";
import { HierarchyNode, getHierarchy } from "@zazuko/cube-hierarchy-query";
import { AnyPointer } from "clownface";
import jsonpack from "jsonpack";
import { groupBy, orderBy, uniqBy } from "lodash";
import { Source } from "rdf-cube-view-query";
import rdf from "rdf-ext";
import { indexBy, isTruthy, mapKeys, mapToObj } from "remeda";
import StreamClient from "sparql-http-client";
import { z } from "zod";
import * as ns from "../../lib/namespace";

export const fetchSparql = async (query: string, environment: EnvironmentUrl) => {
  const body = JSON.stringify({ query, environment });
  const res = await fetch("/api/sparql", {
    method: "post",
    body,
  }).then(async (resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    const text = await resp.text();
    const unpack = jsonpack.unpack(text);
    return unpack;
  });
  return res as $FixMe;
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
export const fetchCubes = async (environment: EnvironmentUrl) => {
  console.log("> fetchCubes");
  const start = performance.now();
  const query = queryCubes();
  const cubesRaw = await fetchSparql(query, environment);
  const cubes = z.array(cubeSpecSchema).parse(cubesRaw);
  const end = performance.now();
  console.log(`fetchCubes took ${end - start}ms`);
  return cubes;
};

const measureSchema = z
  .object({
    dimension: z
      .string()
      .startsWith(amdpMeasure().value)
      .transform((v) => ns.removeNamespace(v, amdpMeasure)),
    label: z.string().optional(),
    description: z.string().optional(),
    range: z
      .object({
        min: z.number(),
        max: z.number(),
      })
      .optional(),
    type: z.literal("measure").optional(),
  })
  .transform((v) => ({
    ...v,
    label: v.label ?? v.dimension,
  }));

const propertyRawSchema = z.object({
  dimension: z.string(),
  label: z.string().optional(),
  dimensionValue: z.string(),
  dimensionValueLabel: z.string().optional(),
});

const propertySchema = z
  .object({
    dimension: z
      .string()
      .startsWith(amdpDimension().value)
      .transform((v) => ns.removeNamespace(v, amdpDimension)),
    label: z.string().optional(),
    description: z.string().optional(),
    type: z.literal("property").optional(),
    values: z.array(
      z.object({
        value: z.string().transform((v) => ns.removeNamespace(v, amdp)),
        label: z.string().optional(),
      })
    ),
  })
  .transform((v) => ({
    ...v,
    values: v.values.map((value) => ({
      ...value,
      label: value.label ?? value.value,
    })),
  }));

export type Measure = z.infer<typeof measureSchema>;
export type Property = z.infer<typeof propertySchema>;

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
export const fetchBaseDimensions = async ({
  locale,
  environment,
}: {
  locale: Locale;
  environment: EnvironmentUrl;
}) => {
  console.log("> fetchBaseDimensions");
  const start = performance.now();
  const queryProperties = queryBasePropertyDimensions({
    locale,
    propertiesIri: baseProperties,
  });
  const queryMeasures = queryBaseMeasureDimensions({
    locale,
  });

  const [propertiesRaw, measuresRaw] = await Promise.all([
    fetchSparql(queryProperties, environment),
    fetchSparql(queryMeasures, environment),
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
                label: value.dimensionValueLabel ?? ns.removeNamespace(value.dimensionValue),
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

  const end = performance.now();
  console.log(`fetchBaseDimensions took ${end - start}ms`);

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
  description: z.string().optional(),
});

/**
 * Fetches the dimensions of a cube. This includes the min/max values for measure dimensions, and
 * the values for property dimensions.
 */
export const fetchCubeDimensions = async (
  locale: Locale,
  environment: EnvironmentUrl,
  cubeIri: string
) => {
  console.log("> fetchCubeDimensions");
  const start = performance.now();
  const fullCubeIri = ns.addNamespace(cubeIri);
  const queryDimensions = queryCubeDimensions({
    locale,
    cubeIri: fullCubeIri,
  });

  const dimensionsRaw = await fetchSparql(queryDimensions, environment);
  const dimensionsRawParsed = z.array(dimensionSpecSchema).parse(dimensionsRaw);

  const measureDim = dimensionsRawParsed.filter(
    // dimension type is not properly set in the cube in INT
    (dim) => dim.type === ns.cube("MeasureDimension").value || dim.dimension.includes("measure")
  );
  const propertyDim = dimensionsRawParsed.filter(
    // dimension type is not properly set in the cube in INT
    (dim) => dim.type === ns.cube("KeyDimension").value || dim.dimension.includes("dimension")
  );

  const propertiesValues = await fetchSparql(
    queryPropertyDimensionAndValues({
      locale,
      cubeIri: fullCubeIri,
      dimensionsIris: propertyDim
        .map((dim) => dim.dimension)
        .filter((d) => d !== amdpDimension("date").value),
    }),
    environment
  );

  const propertyValuesPerDimension = groupBy(propertiesValues, "dimension");

  const properties = propertyDim.map((dim) => {
    const values = propertyValuesPerDimension[dim.dimension];
    return propertySchema.parse({
      dimension: dim.dimension,
      label: dim.label,
      type: "property" as const,
      description: dim.description,
      values: values ? values.map((v) => ({ value: v.value, label: v.label })) : [],
    });
  });

  const measures = await Promise.all([
    ...measureDim.map(async (dim) => {
      const range = await fetchSparql(
        queryMeasureDimensionRange({ locale, cubeIri: fullCubeIri, dimensionIri: dim.dimension }),
        environment
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

  const end = performance.now();
  console.log(`fetchCubeDimensions took ${end - start}ms`);

  return {
    measures: indexBy(measures, (m) => m.dimension),
    properties: indexBy(properties, (p) => p.dimension),
  };
};

const observationSchema = z
  .object({
    observation: z.string().transform((v) => ns.removeNamespace(v, amdp)),
    measure: z.string().transform((v) => +v),
    year: z.string().transform((v) => +v),
    month: z
      .string()
      .transform((v) => +v)
      .optional(),
    ...(Object.fromEntries(
      DIMENSIONS.filter((d) => d !== "date").map((d) => {
        return [toCamelCase(d), z.string().transform((v) => ns.removeNamespace(v, amdp))];
      })
    ) as Record<Dimension, z.ZodEffects<z.ZodString, string, string>>),
  })
  .transform((v) => ({
    ...v,
    date: v.month ? `${v.year}-${v.month}` : `${v.year}`,
  }))
  .transform((v) => mapKeys(v, toKebabCase));

export type Observation = z.infer<typeof observationSchema>;

export const fetchObservations = async ({
  cubeIri,
  filters = {},
  measure,
  timeFilter,
  environment,
}: {
  cubeIri: string;
  filters: Record<string, string[]>;
  measure: { iri: string; key: string };
  timeFilter: TimeFilter;
  environment: EnvironmentUrl;
}) => {
  console.log("> fetchObservations");
  const start = performance.now();
  const fullCubeIri = ns.addNamespace(cubeIri);

  const query = queryObservations({
    cubeIri: fullCubeIri,
    filters: mapToObj(Object.entries(filters), ([key, value]) => [
      toCamelCase(key),
      value.map((v) => ns.addNamespace(v)),
    ]),
    measure,
    dimensions: DIMENSIONS.map((v) => ({
      iri: dataDimensions[v].iri,
      key: toCamelCase(v),
    })),
    timeFilter,
  });

  const observationsRaw = await fetchSparql(query, environment);
  const observations = z.array(observationSchema).parse(observationsRaw);

  const end = performance.now();
  console.log(`fetchObservations took ${end - start}ms`);
  return {
    observations,
    query: getSparqlEditorUrl(query, environment),
  };
};

export const getSparqlEditorUrl = (query: string, enviroment: EnvironmentUrl): string => {
  return `${enviroment}/sparql#query=${encodeURIComponent(query)}&requestMethod=POST`;
};

/**
 *
 * Fetch the hierarchies for a given dimension.
 * Approach adapted from: https://github.dev/visualize-admin/visualization-tool/blob/main/app/rdf/query-hierarchies.ts
 */
export const fetchHierarchy = async ({
  cubeIri,
  dimensionIri,
  locale,
  environment,
}: {
  cubeIri: string | undefined;
  dimensionIri: string;
  locale: Locale;
  environment: EnvironmentUrl;
  asTree?: boolean;
}) => {
  if (!cubeIri) {
    throw new Error(`Error while fetching hierarchy: No iri passed: ${cubeIri}`);
  }

  console.log("> fetchHierarchy");

  const amdpSource = new Source({
    endpointUrl: `${environment}/query`,
    sourceGraph: "https://lindas.admin.ch/foag/agricultural-market-data",
  });

  const sparqlClient = new StreamClient({
    endpointUrl: `${environment}/query`,
  });

  const start = performance.now();
  const cube = await amdpSource.cube(amdp(cubeIri).value);

  if (!cube) {
    throw new Error(`Error while fetching hierarchy: Cube not found: ${cubeIri}`);
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

  const end = performance.now();
  console.log(`fetchHierarchy took ${end - start}ms`);
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

export interface HierarchyValue {
  label: string;
  value: string;
  children: HierarchyValue[];
  depth: number;
  dimension: string;
}

const hierarchyValueSchema: z.ZodType<HierarchyValue> = z.lazy(() =>
  z.object({
    label: z.string().transform((v) => ns.removeNamespace(v, amdp)),
    value: z.string().transform((v) => ns.removeNamespace(v, amdp)),
    children: z.array(hierarchyValueSchema),
    depth: z.number(),
    dimension: z.string(),
  })
);

const toTree = (results: HierarchyNode[], locale: string) => {
  const sortChildren = (children: HierarchyValue[]) =>
    orderBy(children, ["position", "identifier"]);
  const serializeNode = (node: HierarchyNode, depth: number) => {
    const name = getName(node.resource, { locale });

    const res = hierarchyValueSchema.parse({
      label: name ?? node.resource.value,
      value: node.resource.value,
      children: sortChildren(
        node.nextInHierarchy
          .map((childNode) => serializeNode(childNode, depth + 1))
          .filter(isTruthy)
          .filter((d) => d.label)
      ),
      depth,
      dimension: getDimensionFromValue(node.resource.value),
    });
    return res;
  };

  return sortChildren(results.map((r) => serializeNode(r, 0)).filter(isTruthy));
};

const getDimensionFromValue = (dimensionValueIri: string) => {
  return amdpDimension(ns.removeNamespace(dimensionValueIri).match(/^([a-zA-Z]|-)*(?=\/)/)?.[0])
    .value;
};
