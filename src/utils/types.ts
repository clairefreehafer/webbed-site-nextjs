type MarkdownPage = {
  /** page content; cannot get element/component typing to cooperate */
  default: any;
  title: string;
  path: string;
};

export type RecipePage = MarkdownPage & {
  category: string;
  ingredients: string[];
  sourceUrl?: string;
  lastMade?: string;
};

export type ListPage = MarkdownPage & {
  tags?: string[];
  slug: string;
};

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

export type AnimalCrossingTags = Record<string, string[]>;
