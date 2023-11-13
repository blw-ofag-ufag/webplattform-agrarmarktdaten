import { indexBy } from "remeda";
import schema from "../src/graphql/schema.json";
import { internalLinks, pages } from "@/utils/dato";

const types = indexBy(schema.__schema.types, (x) => x.name);

type Type = (typeof types)[string];

const main = async () => {
  const warnings = [];

  const internalLinksSet = new Set(internalLinks);
  for (const pageName of pages) {
    const page = types[pageName];
    const leadType = findTypeForField(page, "lead");

    // Checking lead
    if (leadType) {
      const linksType = findItemTypeForField(leadType, "links");
      if (linksType) {
        const links = new Set(linksType.possibleTypes?.map((lt) => lt.name));
        const diff = setDiff(internalLinksSet, links);
        if (diff.left.length > 0) {
          warnings.push(`${pageName} lead: Missing links ${Array.from(diff.left).join(", ")}`);
        }
      } else {
        warnings.push(`Lead must have links in ${pageName} lead`);
      }
    }

    // Checking content
    const contentType = findTypeForField(page, "content");
    if (contentType) {
      const linksType = findItemTypeForField(contentType, "links");
      if (linksType) {
        const links = new Set(linksType.possibleTypes?.map((lt) => lt.name));
        const diff = setDiff(internalLinksSet, links);
        if (diff.left.length > 0) {
          warnings.push(`${pageName} content: Missing links ${Array.from(diff.left).join(", ")}`);
        }
      } else {
        warnings.push(`Lead must have links in ${pageName} content`);
      }
    }
  }

  if (warnings.length === 0) {
    console.log("Audit Dato CMS models: All good ✅");
  } else {
    console.log(`Audit Dato CMS models: ${warnings.length} warnings`);
    for (const warning of warnings) {
      console.log(`⚠️ ${warning}`);
    }
    process.exit(1);
  }
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

function findTypeForField(type: Type, field: string) {
  const typename = type.fields?.find((x) => x.name === field)?.type.name;
  return typename ? types[typename] : null;
}

function findItemTypeForField(type: Type, field: string) {
  const typename = type.fields?.find((x) => x.name === field)?.type.ofType?.ofType?.ofType?.name;
  return typename ? types[typename] : null;
}

function setDiff<T>(set1: Set<T>, set2: Set<T>) {
  const res = { left: [] as T[], right: [] as T[] };
  for (let e of set1) {
    if (!set2.has(e)) {
      res.left.push(e);
    }
  }
  for (let e of set2) {
    if (!set1.has(e)) {
      res.right.push(e);
    }
  }
  return res;
}
