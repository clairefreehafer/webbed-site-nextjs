const PIWIGO_WEB_URL = `${process.env.PIWIGO_HOST}/piwigo/ws.php?`;

export enum PiwigoMethod {
  CategoriesGetImages = "pwg.categories.getImages",
  CategoriesGetList = "pwg.categories.getList",
  TagsGetImages = "pwg.tags.getImages",
}

export enum CategoryId {
  Albums = "7",
  Collections = "9",
  Photography = "2",
  Technical = "11",
  Today = "14",
}

export type Category = {
  id: number;
  name: string;
};

export async function fetchPiwigo(
  method: PiwigoMethod,
  params: Record<string, string>
): Promise<Record<string, any>> {
  try {
    const searchParams = new URLSearchParams({
      format: "json",
      method,
      ...params,
    });
    console.log(` 🔗 GET ${PIWIGO_WEB_URL + searchParams}`);
    const response = await fetch(PIWIGO_WEB_URL + searchParams);
    const responseJson = await response.json();
    return responseJson.result;
  } catch (error) {
    console.error(`❌ problem fetching from piwigo: ${error}`);
    return {};
  }
}
