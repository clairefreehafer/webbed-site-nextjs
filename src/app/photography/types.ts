export enum SmugMugKeys {
  Explore = "S9cNHV"
}

export type EndpointType = "album" | "node";

export type Uri = "children" | "images";

export type Node = {
  NodeID: string;
  Name: string;
  Type: "Album" | "Folder";
}