import { WebsiteListObject } from "types/lists";

export default function VideoGameListItem({ title }: WebsiteListObject) {
  return <li key={title}>{title}</li>;
}
