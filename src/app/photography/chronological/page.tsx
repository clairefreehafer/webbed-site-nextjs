import {
  CateogoryId,
  PiwigoMethod,
  fetchPiwigo,
} from "@/utils/photography/piwigo";

export default async function Page() {
  if (!process.env.PIWIGO_HOST) {
    return "sorry, this page currently only exists locally.";
  }
  const params = {
    per_page: "100",
    order: "date_creation",
    cat_id: CateogoryId.Photography,
    recursive: "true",
  };
  const { images } = await fetchPiwigo(
    PiwigoMethod.CategoriesGetImages,
    params
  );

  // TODO: pagination
  return `${images.length} image(s) found`;
}
