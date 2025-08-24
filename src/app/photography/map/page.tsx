import { Metadata } from "next";
import Link from "next/link";

import { getMapData } from "@/utils/digikam";

import Map from "./map";

export const metadata: Metadata = { title: "photo map" };

export default function Page() {
  const mapData = getMapData();
  return (
    <>
      <div className="breadcrumbs">
        <Link href="/photography">photography</Link>
        <span>/</span>
        <h2>map</h2>
      </div>
      <Map mapData={mapData} />
    </>
  );
}
