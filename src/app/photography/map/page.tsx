import { getMapData } from "@/utils/digikam";
import Map from "./map";

export function generateMetadata() {
  return { title: "photo map — claire freehafer " };
}

export default function Page() {
  const mapData = getMapData();
  return <Map mapData={mapData} />;
}
