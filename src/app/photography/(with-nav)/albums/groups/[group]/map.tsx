"use client";
import "maplibre-gl/dist/maplibre-gl.css";

import maplibregl, { LngLatBoundsLike, Marker } from "maplibre-gl";
import { useEffect, useRef } from "react";

import { StyleSwitcher } from "@/app/photography/(with-nav)/map/style-switcher";
import { AlbumGroupConfig, GeoJson } from "@/types/photography";

export default function SmallMap({
  mapData,
  albumGroupConfig,
}: {
  mapData: GeoJson;
  albumGroupConfig: AlbumGroupConfig;
}) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const markers: Marker[] = [];
      const [initialLng, initialLat] = mapData.features[0].geometry.coordinates;
      let maxLat = initialLat;
      let minLat = initialLat;
      let maxLng = initialLng;
      let minLng = initialLng;
      const boundsBuffer = albumGroupConfig.boundsBuffer ?? 0.5;

      for (const feature of mapData.features) {
        const [lng, lat] = feature.geometry.coordinates;
        if (maxLat === undefined) {
          maxLat = lat;
        }
        if (minLat === undefined) {
          minLat = lat;
        }
        if (maxLng === undefined) {
          maxLng = lng;
        }
        if (minLng === undefined) {
          minLng = lng;
        }

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
        }).setLngLat(feature.geometry.coordinates);
        // .setPopup(
        //   new Popup().setHTML(
        //     `<p>${feature.properties.name}</p><p><a href="/photography/map/${feature.properties.slug}">${feature.properties.numberOfPhotos} photos</a></p>`,
        //   ),
        // );
        markers.push(marker);
      }

      const bounds: LngLatBoundsLike = [
        [minLng - boundsBuffer, minLat - boundsBuffer], // sw
        [maxLng + boundsBuffer, maxLat + boundsBuffer], // ne
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
          "top-left",
        );
      });
    } else {
      console.error("❌ problem initializing map");
    }
  }, [mapData.features, albumGroupConfig.boundsBuffer]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
}
