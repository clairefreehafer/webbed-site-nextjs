import { CSSProperties } from "react";

export default function Wave({
  color,
  thickness,
  size,
  height,
}: {
  color: CSSProperties["backgroundColor"];
  thickness: string;
  size: string;
  height: string;
}) {
  return (
    <div
      className="wave"
      style={{
        "--size": size,
        "--thickness": thickness,
        height,
        backgroundColor: color,
      }}
    ></div>
  );
}
