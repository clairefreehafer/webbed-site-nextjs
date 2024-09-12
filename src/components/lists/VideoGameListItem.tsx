import { VideoGameListObject } from "types/lists";

export default function VideoGameListItem({ title }: VideoGameListObject) {
  // TODO: include backlogged link
  return <li key={title}>{title}</li>;
}
