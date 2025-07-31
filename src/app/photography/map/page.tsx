import { getMapData } from "@/utils/digikam";
import Map from "./map";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "photo map — claire freehafer " };

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
