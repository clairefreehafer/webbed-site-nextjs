import { css } from "@panda/css";
import { whiteToBlue } from "@themes/zelda";

type Props = {
  number: 1 | 2 | 3;
};

export default function Separator({ number }: Props) {
  return (
    <img
      src={`/images/zelda/pad-line_${number}.png`}
      alt=""
      className={css(whiteToBlue)}
    />
  );
}
