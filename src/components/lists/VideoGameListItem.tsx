import { VideoGameListObject } from "@utils/types/lists";

export default function VideoGameListItem({ title }: VideoGameListObject) {
  return <li key={title}>{title}</li>;
}
