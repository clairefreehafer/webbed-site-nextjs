import {
  CategoryId,
  PiwigoMethod,
  fetchPiwigo,
} from "@/utils/photography/piwigo";
import { redirect } from "next/navigation";

export default async function Page() {
  if (!process.env.PIWIGO_HOST) {
    redirect("https://clairefreehafer.smugmug.com/Photography/Recent-Uploads");
  }
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
