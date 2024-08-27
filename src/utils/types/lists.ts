export type CameraListObject = {
  make: string;
  model: string;
  medium: "digital" | "35mm";
};

export type VideoGameListObject = {
  title: string;
};

export type ListItems = CameraListObject | VideoGameListObject;

export type ListObject = {
  title: string;
  description: string;
  tags?: string[];
  items: ListItems[];
};
