import { CameraListObject } from "@utils/lists/types";

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
