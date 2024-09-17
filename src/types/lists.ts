export const sortDirection = ["ascending", "descending"] as const;
export type SortDirection = (typeof sortDirection)[number];

export const sortBy = ["name"] as const;

export type BookListObject = {
  title: string;
  author: string;
  publishedYear: number;
  openLibraryId: number;
};

export type CameraListObject = {
  make: string;
  model: string;
  medium: "digital" | "35mm";
};

export type MusicListObject = {
  title: string;
  artist: string;
  album: string;
};

export type PodcastListObject = {
  podcastTitle: string;
  episodeTitle?: string;
  date?: string;
};

export type VideoGameListObject = {
  title: string;
};

export type WebsiteListObject = {
  title: string;
  url: string;
};

export type ListItems =
  | BookListObject
  | CameraListObject
  | VideoGameListObject
  | WebsiteListObject;

export type ListObject = {
  title: string;
  description: string;
  tags?: string[];
  items: ListItems[];
};
