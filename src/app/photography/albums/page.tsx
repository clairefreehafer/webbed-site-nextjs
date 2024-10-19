import PolaroidGrid, {
  PolaroidGridAlbum,
} from "@components/photography/PolaroidGrid";
import { SMUGMUG_API_KEY, generateSmugMugApiUrl } from "@utils/smugmug";

const SMUGMUG_KEY = "p2XgBc"; // root node

export default async function Explore() {
  const url = generateSmugMugApiUrl("node", SMUGMUG_KEY, "children");
  const params = new URLSearchParams({
    APIKey: SMUGMUG_API_KEY as string,
    _verbose: "",
    count: "1000",
    _config: JSON.stringify({
      expand: {
        HighlightImage: {
          filter: ["ImageKey"],
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

  console.log(`🌐 fetching ${url + params}...`);

  const res = await fetch(url + params, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    return <>Error fetching smugmug data.</>;
  }

  const json = await res.json();
  const albums = json.Response.Node;
  const coverPhotos = json.Expansions;

  const polaroidAlbums: PolaroidGridAlbum[] = albums.map((album, idx) => {
    const highlightImageUri = album.Uris.HighlightImage.Uri;
    const highlightImage = coverPhotos[highlightImageUri];
    const highlightImageSizeUri =
      highlightImage.Image?.Uris.ImageSizeDetails.Uri;
    const coverPhotoUrl =
      coverPhotos[highlightImageSizeUri]?.ImageSizeDetails.ImageUrlTemplate;

    return {
      id: idx,
      name: album.Name,
      coverPhoto: {
        url: coverPhotoUrl,
      },
      randomCoverPhoto: null,
      icon: null,
    };
  });

  return <PolaroidGrid albums={polaroidAlbums} />;
}
