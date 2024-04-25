import { EndpointType, SmugMugKeys, Uri } from "./types";

const API_HOST = "https://api.smugmug.com";
const {
  SMUGMUG_API_KEY,
  API_KEY_SECRET,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET,
  VERBOSE,
} = process.env;

function generateApiUrl(key: SmugMugKeys, type: EndpointType, uri?: Uri) {
  if (uri) {
    return `${API_HOST}/api/v2/${type}/${key}!${uri}?APIKey=${SMUGMUG_API_KEY}`;
  }
  return `${API_HOST}/api/v2/${type}/${key}?APIKey=${SMUGMUG_API_KEY}`;
}

export async function getPages() {
  const url = generateApiUrl(SmugMugKeys.Explore, "node", "children") + "&Type=Album";

  if (VERBOSE) console.log("FETCHING", url);

  const res = await fetch(url, {
    headers: {
      "Accept": "application/json",
    }
  });

  if (!res.ok) {
    throw new Error("failed to get pages.");
  }

  return res.json();
}