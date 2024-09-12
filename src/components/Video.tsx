import { css } from "@panda/css";

// TODO: use HTMLVideoElement?
type Props = {
  src: string;
  loop: boolean;
};

export default function Video({ src }: Props) {
  return (
    <div>
      <video
        loop
        autoPlay
        muted
        className={css({ width: "100%" })}
        style={{ width: "100%" }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
