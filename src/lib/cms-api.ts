import "isomorphic-unfetch";

const API_URL = "https://graphql.datocms.com";
const API_TOKEN = "880654d6951b0e08722848ff6881c9";

export async function fetchCMS(
  query: string,
  {
    variables,
    preview
  }: { variables?: { [k: string]: $FixMe }; preview?: boolean } = {}
) {
  console.log(preview)
  const res = await fetch(API_URL + (preview ? "/preview" : ""), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}
