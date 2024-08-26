export type ListObject = {
  title: string;
  description: string;
  tags?: string[];
  items: CameraListObject[] | VideoGameListObject[];
};

export type CameraListObject = {
  make: string;
  model: string;
  medium: "digital" | "35mm";
};

export type VideoGameListObject = {
  title: string;
};
