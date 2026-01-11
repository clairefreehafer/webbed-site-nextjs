import { Metadata } from "next";

import Breadcrumbs from "@/components/photography/breadcrumbs";
import { getMapData } from "@/utils/digikam";

import Map from "./map";

export const metadata: Metadata = { title: "photo map" };

export default function Page() {
  const mapData = getMapData();
  return (
    <>
      <Breadcrumbs />
      <Map mapData={mapData} />
    </>
  );
}
