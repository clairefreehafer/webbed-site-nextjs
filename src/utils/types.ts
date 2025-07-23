type MarkdownPage = {
  /** page content; cannot get element/component typing to cooperate */
  default: any;
  title: string;
  path: string[];
};

export type RecipePage = MarkdownPage & {
  ingredients: string[];
  sourceUrl?: string;
  isCategory?: boolean;
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
    };
  }[];
};
