export const sortDirection = ["ascending", "descending"] as const;
export type SortDirection = (typeof sortDirection)[number];

export const sortBy = ["name"] as const;

export type BookListObject = {
  // type: "book";
  title: string;
  author: string;
  year: number;
  openLibraryId: string;
};

export const cameraMediums = ["digital", "35mm"] as const;
export type CameraListObject = {
  // type: "camera";
  make: string;
  model: string;
  medium: (typeof cameraMediums)[number];
};

export type MusicListObject = {
  // type: "music";
  song: string;
  artist: string;
  album: string;
};

export type PodcastListObject = {
  // type: "podcast";
  podcast: string;
  episode?: string;
  date?: string;
};

export type VideoGameListObject = {
  // type: "video game";
  title: string;
  year: number;
  // console(s)?
};

export type WebsiteListObject = {
  // type: "website";
  title: string;
  url: string;
};

export type ListItems =
  | BookListObject
  | CameraListObject
  | MusicListObject
  | PodcastListObject
  | VideoGameListObject
  | WebsiteListObject;

export const listItemTypes = [
  "book",
  "camera",
  "music",
  "podcast",
  "video game",
  "website",
] as const;
export type ListItemType = (typeof listItemTypes)[number];

export function narrowListItemType(listItemData: Partial<ListItems>) {
  if ("url" in listItemData) {
    return listItemData;
  }
  return listItemData;
}

export type ListObject = {
  name: string;
  description: string;
  tags?: string[];
  items: ListItems[];
};

declare global {
  namespace PrismaJson {
    type ListItemData = ListItems;
  }
}
