import { getChildTags } from "@/utils/photography/digikam";

export default function Page() {
  const tags = getChildTags("digital");
  console.log(tags);
  return null;
}
