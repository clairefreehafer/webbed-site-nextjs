export enum SmugMugKeys {
  Collections= "hwBrFB",
  Explore = "S9cNHV",
  Technical = "Ss3x4J",
}

export type NodeTypes = "Album" | "Folder" | "Page";

export type EndpointType = "album" | "node";

export type Uri = "children" | "images";

export type Node = {
  NodeID: string;
  Name: string;
  Type: "Album" | "Folder";
}