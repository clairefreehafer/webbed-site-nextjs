import { WebsiteListObject } from "@utils/lists";

export default function VideoGameListItem({ title }: WebsiteListObject) {
  return <li key={title}>{title}</li>;
}
