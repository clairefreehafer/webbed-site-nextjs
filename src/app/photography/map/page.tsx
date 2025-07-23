import { getMapData } from "@/utils/digikam";
import Map from "./map";

export function generateMetadata() {
  return { title: "photo map — claire freehafer " };
}

export default async function Page() {
  const images = await getMapData();
  return <Map images={images} />;
}
