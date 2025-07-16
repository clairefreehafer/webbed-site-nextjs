import {
  CategoryId,
  PiwigoMethod,
  fetchPiwigo,
} from "@/utils/photography/piwigo";

export default async function Page() {
  const params = {
    per_page: "100",
    order: "date_available",
    cat_id: CategoryId.Photography,
    recursive: "true",
  };
  const { images } = await fetchPiwigo(
    PiwigoMethod.CategoriesGetImages,
    params
  );

  return `${images.length} image(s) found.`;
}
