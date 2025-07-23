"use client";

import { Image, MapData } from "@/utils/digikam";
import maplibregl, { LngLatBoundsLike, Marker, Popup } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import locations from "./locations.geojson";

const BOUNDS_BUFFER = 18;

export default function Map({ images }: { images: MapData[] }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      // const markers: Marker[] = [];
      // let maxLat = -90;
      // let minLat = 90;
      // let maxLng = -180;
      // let minLng = 80;

      // for (const image of images) {
      //   console.log("album", image);
      //   if (image.lat > maxLat) {
      //     maxLat = image.lat;
      //   } else if (image.lat < minLat) {
      //     minLat = image.lat;
      //   }
      //   if (image.lng > maxLng) {
      //     maxLng = image.lng;
      //   } else if (image.lng < minLng) {
      //     minLng = image.lng;
      //   }
      //   console.log(image);
      //   const marker = new Marker({
      //     color: image.markerColor,
      //     draggable: false,
      //   }).setLngLat([image.lng, image.lat]);
      //   markers.push(marker);
      // }

      // const bounds: LngLatBoundsLike = [
      //   [minLng, minLat], // sw
      //   [maxLng, maxLat],
      // ]; // ne
      // console.log(bounds);

      const map = new maplibregl.Map({
        container: mapRef.current,
        // style: "https://tiles.stadiamaps.com/styles/stamen_watercolor.json",
        style: "https://tiles.stadiamaps.com/styles/stamen_toner.json",
        center: [0, 0], // starting position [lng, lat]
        zoom: 1,
        // maxZoom: 16, // needed for watercolor
        // bounds,
      });
      map.on("load", () => {
        for (const location of locations.features) {
          const marker = new Marker({
            color: location.properties.markerColor,
            draggable: false,
          })
            .setLngLat(location.geometry.coordinates)
            .setPopup(
              new Popup().setHTML(
                `<p>${location.properties.name}</p><p>${location.properties.numberOfPhotos} photos</p>`
              )
            );
          marker.addTo(map);
        }
      });
    }
  });

  return <div ref={mapRef} style={{ height: "100%" }} />;
}
