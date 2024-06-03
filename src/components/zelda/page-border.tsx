type Props = {
  rotate?: boolean;
};

export default function PageBorder({ rotate }: Props) {
  const borderStyles = "white-to-blue absolute left-0 w-full";
  const rotateStyles = rotate ? "bottom-0" : "top-0 rotate-180";

  return (
    <>
      <img
        src="/images/zelda/pad-frame_glow.png"
        alt=""
        className={`${borderStyles} ${rotateStyles} opacity-50`}
      />
      <img
        src="/images/zelda/pad-frame.png"
        alt=""
        className={`${borderStyles} ${rotateStyles}`}
      />
    </>
  );
}
