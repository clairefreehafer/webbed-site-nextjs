// TODO: use HTMLVideoElement?
type Props = {
  src: string;
  loop: boolean;
};

export default function Video({ src }: Props) {
  return (
    <div>
      <video loop autoPlay muted className="w-full" style={{ width: "100%" }}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
