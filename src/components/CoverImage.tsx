type Props = {
  aspectRatio: "1 / 1" | "4 / 3";
  src: string;
};

export default function CoverImage({ aspectRatio, src }: Props) {
  return (
    <img
      src={src}
      className="w-full object-cover object-center"
      style={{ aspectRatio }}
      alt=""
    />
  );
}
