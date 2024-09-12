import { CameraListObject } from "types/lists";

export default function CameraListItem({
  make,
  model,
  medium,
}: CameraListObject) {
  // TODO: add link to collection of photos taken on that camera, smugmug
  // probably but maybe eventually this own website?!?!?!?
  return (
    <li key={`${make}-${model}`}>
      {make} {model}
    </li>
  );
}
