function sortedStringify(obj: any): string {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      // Sort the keys of the object
      const sortedObject: { [key: string]: any } = {};
      Object.keys(value)
        .sort()
        .forEach((sortedKey) => {
          sortedObject[sortedKey] = value[sortedKey];
        });
      return sortedObject;
    }
    return value;
  });
}

export default sortedStringify;
