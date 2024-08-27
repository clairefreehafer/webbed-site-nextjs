import { VideoGameListObject } from "@utils/lists/types";

export default function VideoGameListItem({ title }: VideoGameListObject) {
  return <li key={title}>{title}</li>;
}
