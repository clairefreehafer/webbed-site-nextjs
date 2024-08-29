import { WebsiteListObject } from "@utils/lists/types";

export default function VideoGameListItem({ title }: WebsiteListObject) {
  return <li key={title}>{title}</li>;
}
