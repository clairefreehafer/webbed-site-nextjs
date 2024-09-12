import { css } from "@panda/css";

type Props = {
  aspectRatio: React.CSSProperties["aspectRatio"];
  src: string;
  alt?: string;
};

export default function CoverImage({ aspectRatio, src, alt = "" }: Props) {
  return (
    <div style={{ aspectRatio }}>
      <img
        src={src}
        className={css({
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          width: "100%",
        })}
        alt={alt}
      />
    </div>
  );
}
