import {
  queryBaseMeasureDimensions,
  queryBasePropertyDimensions,
  queryCubeDimensions,
  queryCubes,
  queryMeasureDimensionRange,
  queryObservations,
  queryPropertyDimensionAndValues,
} from "@/lib/cube-queries";
import { amdp, amdpMeasure, amdpDimension } from "@/lib/namespace";
import { Locale } from "@/locales/locales";
import { NamespaceBuilder } from "@rdfjs/namespace";
import { groupBy } from "lodash";
import { z } from "zod";
import * as ns from "../../lib/namespace";
import { dataDimensions, properties } from "@/domain/dimensions";

const removeNamespace = (fullIri: string, namespace: NamespaceBuilder<string> = amdp) => {
  return fullIri.replace(namespace().value, "");
};

const addNamespace = (partialIri: string) => {
  return amdp(partialIri).value;
};

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
      .transform((v) => removeNamespace(v, amdp)),
    valueChain: z
      .string()
      .startsWith(amdp("value-chain").value, {
        message: "Must be a valid AMDP value chain",
      })
      .transform((v) => removeNamespace(v, amdp)),
    market: z
      .string()
      .startsWith(amdp("market").value, { message: "Must be a valid AMDP market" })
      .transform((v) => removeNamespace(v, amdp)),
    measure: z
      .string()
      .startsWith(amdpMeasure().value, { message: "Must be a valid AMDP measure" })
      .transform((v) => removeNamespace(v, amdpMeasure)),
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
    .transform((v) => removeNamespace(v, amdpMeasure)),
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
    .transform((v) => removeNamespace(v, amdpDimension)),
  label: z.string().optional(),
  type: z.literal("property").optional(),
  values: z.array(
    z.object({
      value: z.string().transform((v) => removeNamespace(v, amdp)),
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
        const values = propertiesValuesGroups[dimension];
        const dim = propertiesRawParsed.find((property) => property.dimension === dimension);
        if (baseProperties.includes(dimension)) {
          return {
            ...acc,
            [removeNamespace(dimension, amdpDimension)]: {
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
  const fullCubeIri = addNamespace(cubeIri);
  const queryDimensions = queryCubeDimensions({
    locale,
    cubeIri: fullCubeIri,
  });

  const dimensionsRaw = await fetchSparql(queryDimensions);
  const dimensionsRawParsed = z.array(dimensionSpecSchema).parse(dimensionsRaw);

  /**
   * As a workaround to the data changes on 13.11.2023, we are checking the type of the dimension
   * through the dimension IRI instead of the type. @TODO change back to type when data is fixed.
   */
  const measureDim = dimensionsRawParsed.filter(
    // (dim) => dim.type === ns.cube("MeasureDimension").value
    (dim) => dim.dimension.startsWith(amdpMeasure().value)
  );
  const propertyDim = dimensionsRawParsed.filter(
    //(dim) => dim.type === ns.cube("KeyDimension").value
    (dim) => dim.dimension.startsWith(amdpDimension().value)
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

  const dimensions = [...measures, ...properties].reduce(
    (acc, dim) => {
      return {
        ...acc,
        [dim.dimension]: dim,
      };
    },
    {} as Record<string, Measure | Property>
  );

  return dimensions;
};

const toKebabCase = (v: string) => v.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const toCamelCase = (v: string) => v.replace(/-./g, (x) => x[1].toUpperCase());

const observationSchema = z
  .object({
    observation: z.string().transform((v) => removeNamespace(v, amdp)),
    costComponent: z.string().transform((v) => removeNamespace(v, amdp)),
    currency: z.string().transform((v) => removeNamespace(v, amdp)),
    dataMethod: z.string().transform((v) => removeNamespace(v, amdp)),
    dataSource: z.string().transform((v) => removeNamespace(v, amdp)),
    date: z.string().transform((v) => removeNamespace(v, amdp)),
    foreignTrade: z.string().transform((v) => removeNamespace(v, amdp)),
    keyIndicatorType: z.string().transform((v) => removeNamespace(v, amdp)),
    market: z.string().transform((v) => removeNamespace(v, amdp)),
    salesRegion: z.string().transform((v) => removeNamespace(v, amdp)),
    unit: z.string().transform((v) => removeNamespace(v, amdp)),
    usage: z.string().transform((v) => removeNamespace(v, amdp)),
    valueChain: z.string().transform((v) => removeNamespace(v, amdp)),
    valueChainDetail: z.string().transform((v) => removeNamespace(v, amdp)),
    price: z
      .string()
      .transform((v) => +v)
      .optional(),
    quantity: z
      .string()
      .transform((v) => +v)
      .optional(),
    index: z
      .string()
      .transform((v) => +v)
      .optional(),
  })
  .transform((v) => {
    return Object.entries(v).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [toKebabCase(key)]: value,
      };
    }, {});
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
  const fullCubeIri = addNamespace(cubeIri);

  const query = queryObservations({
    cubeIri: fullCubeIri,
    filters: Object.entries(filters).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [toCamelCase(key)]: value.map((v) => addNamespace(v)),
      };
    }, {}),
    measure,
    dimensions: properties.map((v) => ({
      iri: dataDimensions[v].iri,
      key: v,
    })),
  });
  const observationsRaw = await fetchSparql(query);
  const observations = z.array(observationSchema).parse(observationsRaw);
  return observations;
};
