export const PIWIGO_WEB_URL = `${process.env.PIWIGO_HOST}/piwigo/ws.php?`;

export enum PiwigoMethod {
  CategoriesGetImages = "pwg.categories.getImages",
  CategoriesGetList = "pwg.categories.getList",
  TagsGetImages = "pwg.tags.getImages",
}

export enum CateogoryId {
  Photography = "2",
  Explore = "7",
  Today = "14",
}

export async function fetchPiwigo(
  method: PiwigoMethod,
  params: Record<string, string>
): Promise<Record<string, any>> {
  const searchParams = new URLSearchParams({
    format: "json",
    method,
    ...params,
  });
  const response = await fetch(PIWIGO_WEB_URL + searchParams);
  const responseJson = await response.json();
  return responseJson.result;
}
