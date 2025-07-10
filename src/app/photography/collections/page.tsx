import {
  Category,
  CategoryId,
  PiwigoMethod,
  fetchPiwigo,
} from "@/utils/photography/piwigo";
import { redirect } from "next/navigation";

export default async function Page() {
  if (!process.env.PIWIGO_HOST) {
    redirect("https://clairefreehafer.smugmug.com/Photography/Collections");
  }
  const params = {
    method: PiwigoMethod.CategoriesGetList,
    cat_id: CategoryId.Collections,
    public: "true",
  };
  const { categories } = await fetchPiwigo(
    PiwigoMethod.CategoriesGetList,
    params
  );

  return categories.map((category: Category) => {
    if (category.id.toString() === CategoryId.Collections) return null;
    return category.name;
  });
}
