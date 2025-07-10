import { PIWIGO_WEB_URL, PiwigoMethod } from "@/utils/photography/piwigo";

export default async function Page() {
  if (!process.env.PIWIGO_HOST) {
    return "sorry, this page currently only exists locally.";
  }
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const searchParams = new URLSearchParams({
    format: "json",
    method: PiwigoMethod.TagsGetImages,
    tag_name: `date:${mm}${dd}`,
    order: "date_creation",
  });

  const response = await fetch(PIWIGO_WEB_URL + searchParams);
  if (!response.ok) {
    return "something went wrong :(";
  }

  const { result } = await response.json();
  console.log(result);
  if (result.images.length === 0) {
    return "no images for today.";
  }

  // display by year
  return "today";
}
