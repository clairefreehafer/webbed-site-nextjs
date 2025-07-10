import { PiwigoMethod, fetchPiwigo } from "@/utils/photography/piwigo";

export default async function Page() {
  if (!process.env.PIWIGO_HOST) {
    return "sorry, this page currently only exists locally.";
  }
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const params = {
    tag_name: `date:${mm}${dd}`,
    order: "date_creation",
  };

  const { images } = await fetchPiwigo(PiwigoMethod.TagsGetImages, params);
  if (images.length === 0) {
    return "no images for today.";
  }

  // TODO: display by year
  return `${images.length} images found.`;
}
