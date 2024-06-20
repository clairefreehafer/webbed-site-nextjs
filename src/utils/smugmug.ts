const API_HOST = "https://api.smugmug.com";
const { SMUGMUG_API_KEY } = process.env;

export enum SmugMugKeys {
  Collections = "hwBrFB",
  Explore = "S9cNHV",
  Technical = "Ss3x4J",
}

export type SmugMugNodeTypes = "Album" | "Folder" | "Page";

export type SmugMugEndpointType = "album" | "image";

export type SmugMugUri = "images" | "sizedetails";

export type Node = {
  Uris: Record<string, any>;
  NodeID: string;
  Name: string;
  Type: SmugMugNodeTypes;
};

// "smugmug" album types are meant to be temporary before
// images are moved to our own db, so fine to hardcode
const albumKeys: Record<string, string> = {
  "black & white": "7F9B5g",
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

    console.log("🌐 fetching:", url + params);

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

type SmugmugReturn = {
  url: string | null;
  altText: string | null;
};

export async function getSmugmugPhotos(
  albumName: string,
): Promise<SmugmugReturn[]> {
  try {
    const url = generateApiUrl("album", albumKeys[albumName]);

    const params = new URLSearchParams({
      APIKey: SMUGMUG_API_KEY as string,
      _config: JSON.stringify({
        filter: [""],
        filteruri: ["AlbumImages"],
        expand: {
          AlbumImages: {
            filter: [""],
            filteruri: ["ImageSizeDetails"],
            expand: {
              ImageSizeDetails: {
                filter: ["ImageUrlTemplate"],
              },
            },
          },
        },
      }),
    });

    console.log("🌐 fetching:", url + params);

    const res = await fetch(url + params, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`failed to get photo: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    const photos: SmugmugReturn[] = [];

    Object.keys(json.Expansions).forEach((key) => {
      if (key.includes("ImageUrlTemplate")) {
        photos.push({
          url: json.Expansions[key].ImageSizeDetails.ImageUrlTemplate,
          altText: "",
        });
      }
    });

    return photos;
  } catch (error) {
    console.error(`❌ ${(error as Error).message}`);
    return [];
  }
}
