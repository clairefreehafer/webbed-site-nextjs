import { CameraListObject } from "@utils/types/lists";

export default function CameraListItem({
  make,
  model,
  medium,
}: CameraListObject) {
  return (
    <li key={`${make}-${model}`}>
      {make} {model}
    </li>
  );
}
