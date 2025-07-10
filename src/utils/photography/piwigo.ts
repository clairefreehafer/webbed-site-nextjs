export const PIWIGO_WEB_URL = `${process.env.PIWIGO_HOST}/piwigo/ws.php?`;

export enum PiwigoMethod {
  CategoriesGetList = "pwg.categories.getList",
  TagsGetImages = "pwg.tags.getImages",
}

export enum CateogoryId {
  Photography = "2",
  Explore = "7",
  Today = "14",
}

export async function getPhotographySections() {
  const searchParams = new URLSearchParams({
    format: "json",
    method: PiwigoMethod.CategoriesGetList,
    cat_id: CateogoryId.Explore,
  }).toString();
  const response = await fetch(PIWIGO_WEB_URL + searchParams);
  const sections = await response.json();
  console.log(sections.result.categories);
}
