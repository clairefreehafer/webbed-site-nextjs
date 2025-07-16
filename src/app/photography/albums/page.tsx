import {
  Category,
  CategoryId,
  PiwigoMethod,
  fetchPiwigo,
} from "@/utils/photography/piwigo";

export default async function Page() {
  const params = {
    method: PiwigoMethod.CategoriesGetList,
    cat_id: CategoryId.Albums,
    public: "true",
  };
  const { categories } = await fetchPiwigo(
    PiwigoMethod.CategoriesGetList,
    params
  );

  return categories.map((category: Category) => {
    if (category.id.toString() === CategoryId.Albums) return null;
    return category.name;
  });
}
