const API_HOST = "https://api.smugmug.com";
const { SMUGMUG_API_KEY, VERBOSE } = process.env;

export enum SmugMugKeys {
  Collections = "hwBrFB",
  Explore = "S9cNHV",
  Technical = "Ss3x4J",
}

export type SmugMugNodeTypes = "Album" | "Folder" | "Page";

export type SmugMugEndpointType = "image";

export type SmugMugUri = "sizedetails";

export type Node = {
  Uris: Record<string, any>;
  NodeID: string;
  Name: string;
  Type: SmugMugNodeTypes;
};

function generateApiUrl(
  type: SmugMugEndpointType,
  key: SmugMugKeys | string,
  uri?: SmugMugUri,
) {
  if (uri) {
    return `${API_HOST}/api/v2/${type}/${key}!${uri}?`;
  }
  return `${API_HOST}/api/v2/${type}/${key}?`;
}

export async function getSmugMugData(key: string) {
  try {
    const url = generateApiUrl("image", key, "sizedetails");

    const params = new URLSearchParams({
      APIKey: SMUGMUG_API_KEY as string,
      _filter: "ImageUrlTemplate",
      _filteruri: "",
    });

    if (VERBOSE) console.log("🌐 fetching:", url + params);

    const res = await fetch(url + params, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`failed to get photo: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    return (error as Error).message;
  }
}
