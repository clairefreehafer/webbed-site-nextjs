export type ShelvedBook = {
  type: "book";
  olid?: string;
  title?: string;
  subtitle?: string;
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
