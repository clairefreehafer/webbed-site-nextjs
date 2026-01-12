"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

import cameraJson from "@/data/photography/cameras.json";
import collectionsJson from "@/data/photography/collections.json";
import locationsJson from "@/data/photography/locations.json";
import { LocationConfig, TagConfig } from "@/types/photography";
import { slugify } from "@/utils/client";
import { Image } from "@/utils/digikam";

const cameras: Record<string, string> = cameraJson;
const locations = locationsJson as unknown as LocationConfig;
const collections: TagConfig = collectionsJson;

export default function Overlay({
  image,
  classNamePrefix,
  showOverlay,
  setShowOverlay,
}: {
  image: Image;
  classNamePrefix: string;
  showOverlay: boolean;
  setShowOverlay: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`image-overlay ${classNamePrefix}-image-overlay`}
      style={{
        maxHeight: image.height,
        maxWidth: image.width,
        opacity: showOverlay ? 1 : 0,
        pointerEvents: showOverlay ? "auto" : "none",
        flexDirection: image.width >= image.height ? "row" : "column",
        justifyContent: image.width >= image.height ? "space-around" : "center",
      }}
      onClick={() => setShowOverlay(false)}
    >
      {(image.camera || image.lens) && (
        <div>
          {image.camera && (
            <>
              <h3>camera</h3>
              <p>{cameras[image.camera] ?? image.camera}</p>
            </>
          )}

          {image.lens && (
            <>
              <h3>lens</h3>
              <p>{image.lens}</p>
            </>
          )}
        </div>
      )}

      {image.collections.length > 0 && (
        <div>
          <h3>collections</h3>
          <ul>
            {image.collections.map((collection) => (
              <li key={collection}>
                <Link href={`/photography/collections/${slugify(collection)}`}>
                  {collections[collection]?.displayName ?? collection}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {image.location && (
        <div>
          <h3>location</h3>
          <p>
            📍{" "}
            <Link href={`/photography/map/${slugify(image.location)}`}>
              {locations[image.location]?.name ?? image.location}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
