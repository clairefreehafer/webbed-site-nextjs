import { EndpointType, NodeTypes, SmugMugKeys, Uri } from "./types";

const API_HOST = "https://api.smugmug.com";
const {
  SMUGMUG_API_KEY,
  VERBOSE,
} = process.env;

function generateApiUrl(type: EndpointType, key: SmugMugKeys, uri?: Uri) {
  if (uri) {
    return `${API_HOST}/api/v2/${type}/${key}!${uri}?`;
  }
  return `${API_HOST}/api/v2/${type}/${key}?`;
}

function apiFactory(type: NodeTypes) {
  return async function(key: SmugMugKeys) {
    const url = `${generateApiUrl("node", key, "children")}`;

    const params = new URLSearchParams({
      APIKey: SMUGMUG_API_KEY as string,
      Type: type,
      _config: JSON.stringify({
        filter: ["Name", "NodeID"],
        filteruri: ["HighlightImage"],
        expand: {
          HighlightImage: {
            filter: ["ImageKey"],
            filteruri: ["ImageSizes"],
            expand: {
              ImageSizes: {}
            }
          }
        }
      })
    });

    if (VERBOSE) console.log("FETCHING", url + params);

    const res = await fetch(url + params, {
      headers: {
        "Accept": "application/json",
      }
    });

    if (!res.ok) {
      throw new Error(`failed to get pages: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }
}

const getAlbums = apiFactory("Album");
const getPages = apiFactory("Page");

export { getAlbums, getPages };