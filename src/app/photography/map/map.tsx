"use client";
import maplibregl, { LngLatBoundsLike, Marker, Popup } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { GeoJson } from "@/utils/types";
import { StyleSwitcher } from "./style-switcher";

const BOUNDS_BUFFER = 5;

export default function Map({ mapData }: { mapData: GeoJson }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const markers: Marker[] = [];
      let maxLat = -90;
      let minLat = 90;
      let maxLng = -180;
      let minLng = 80;

      for (const feature of mapData.features) {
        const [lng, lat] = feature.geometry.coordinates;
        if (lat > maxLat) {
          maxLat = lat;
        } else if (lat < minLat) {
          minLat = lat;
        }
        if (lng > maxLng) {
          maxLng = lng;
        } else if (lng < minLng) {
          minLng = lng;
        }

        const marker = new Marker({
          color: feature.properties.markerColor,
          draggable: false,
        })
          .setLngLat(feature.geometry.coordinates)
          .setPopup(
            new Popup().setHTML(
              `<p>${feature.properties.name}</p><p><a href="/photography/map/${feature.properties.slug}">${feature.properties.numberOfPhotos} photos</a></p>`
            )
          );
        markers.push(marker);
      }

      const bounds: LngLatBoundsLike = [
        [minLng - BOUNDS_BUFFER, minLat - BOUNDS_BUFFER], // sw
        [maxLng + BOUNDS_BUFFER, maxLat + BOUNDS_BUFFER], // ne
      ];

      const map = new maplibregl.Map({
        container: mapRef.current,
        style: "https://tiles.stadiamaps.com/styles/stamen_toner.json",
        maxZoom: 16,
        bounds,
      });
      map.on("load", () => {
        for (const marker of markers) {
          marker.addTo(map);
        }

        map.addControl(
          new StyleSwitcher([
            {
              name: "toner",
              url: "https://tiles.stadiamaps.com/styles/stamen_toner.json",
            },
            {
              name: "watercolor",
              url: "https://tiles.stadiamaps.com/styles/stamen_watercolor.json",
            },
          ]),
          "top-left"
        );
      });
    } else {
      console.error(`❌ problem initializing map`);
    }
  });

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
}
