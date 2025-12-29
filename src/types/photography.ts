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
      numberOfPhotos: number;
      markerColor: React.CSSProperties["color"];
      slug: string;
    };
  }[];
};

export type CollectionConfig = Record<
  string,
  {
    displayName: string;
    background?: React.CSSProperties["background"];
    coverPhotoId?: number;
    coverPhotoPosition?: string;
  }
>;
