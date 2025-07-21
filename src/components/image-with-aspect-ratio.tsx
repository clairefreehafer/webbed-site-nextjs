import Image from "next/image";

export default function ImageWithAspectRatio({
  aspectRatio,
  src,
}: {
  aspectRatio: React.CSSProperties["aspectRatio"];
  src: string;
}) {
  return (
    <div style={{ aspectRatio }}>
      <Image
        src={src}
        style={{
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          width: "100%",
        }}
        alt=""
        fill
      />
    </div>
  );
}
