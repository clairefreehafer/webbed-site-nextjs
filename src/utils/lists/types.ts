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
