import { getMapData } from "@/utils/digikam";
import Map from "./map";
import { Metadata } from "next";

export const metadata: Metadata = { title: "photo map — claire freehafer " };

export default function Page() {
  const mapData = getMapData();
  return <Map mapData={mapData} />;
}
