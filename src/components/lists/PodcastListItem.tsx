import { PodcastListObject } from "types/lists";

export default function PodcastListItem({ podcast }: PodcastListObject) {
  return <li key={podcast}>{podcast}</li>;
}
