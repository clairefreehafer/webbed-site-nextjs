"use client";

import { whiteToBlue } from "@styles/zelda/theme";
import styled from "styled-components";

const Img = styled.img<{ $number: number }>`
  ${whiteToBlue};
  margin: 0 -1rem;
  width: calc(100% + 2rem);

  ${({ $number }) =>
    $number === 1 && "transform: rotate(180deg) translateY(1rem);"}
  ${({ $number }) => $number === 2 && "margin: 1rem 0;"}
  ${({ $number }) => $number === 3 && "transform: translateY(1rem);"}
`;

type Props = {
  number: 1 | 2 | 3;
};

export default function Separator({ number }: Props) {
  return (
    <img
      src={`/images/zelda/pad-line_${number}.png`}
      alt=""
      className={`white-to-blue`}
    />
  );
}
