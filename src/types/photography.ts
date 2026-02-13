import { CSSProperties } from "react";

export type GeoJson = {
  type: "FeatureCollection";
  features: {
    type: "Feature";
    geometry: {
      type: "Point";
      /** [lng, lat] */
      coordinates: [number, number];
    };
    properties: {
      name: string;
      numberOfPhotos?: number;
      markerColor: React.CSSProperties["color"];
      slug?: string;
    };
  }[];
};

export type TagConfig = {
  displayName?: string;
  background?: React.CSSProperties["background"];
  coverPhotoId?: number;
  coverPhotoName?: string;
  coverPhotoPosition?: string;
  icon?: string;
  relatedTags?: string[];
};

export type LocationConfig = {
  coordinates: number[];
  markerColor?: CSSProperties["color"];
  name?: string;
};

export type AlbumGroupConfig = {
  displayName?: string;
  boundsBuffer?: number;
};
