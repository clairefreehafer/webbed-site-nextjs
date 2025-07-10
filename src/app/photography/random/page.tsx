import {
  CategoryId,
  PiwigoMethod,
  fetchPiwigo,
} from "@/utils/photography/piwigo";
import Image from "next/image";

export default async function Page() {
  if (!process.env.PIWIGO_HOST) {
    return "sorry, this page currently only exists locally.";
  }
  const params = {
    per_page: "1",
    order: "random",
    cat_id: CategoryId.Photography,
    recursive: "true",
  };
  const { images } = await fetchPiwigo(
    PiwigoMethod.CategoriesGetImages,
    params
  );

  const { element_url, height, width } = images[0];

  return (
    <div className="grid">
      <Image src={element_url} height={height} width={width} alt="" />
    </div>
  );
}
