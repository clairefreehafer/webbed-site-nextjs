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

export type ShelvedBook = {
  type: "book";
  olid?: string;
  title?: string;
  link?: string;
  coverImage?: string;
  coverColor?: string;
  numberOfPages?: number;
  author?: string;
};

export type ShelvedTv = {
  type: "tv";
  tvdbId?: string;
  title?: string;
  link?: string;
  coverImage?: string;
  coverColor?: string;
};

export type ShelvedVideoGame = {
  type: "video-game";
  title: string;
  link?: string;
  coverImage?: string;
  coverColor?: string;
};

export type ShelvedFilm = {
  type: "film";
  title: string;
  link?: string;
  coverImage?: string;
  coverColor?: string;
};

export type ShelvedItem =
  | ShelvedBook
  | ShelvedTv
  | ShelvedVideoGame
  | ShelvedFilm;
export type Shelf = {
  slug: string;
  title: string;
  description?: string;
  items: ShelvedItem[] | { [section: string]: ShelvedItem[] };
};
