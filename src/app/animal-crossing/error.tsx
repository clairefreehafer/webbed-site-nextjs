"use client";

import Image from "next/image";
import Resetti from "../../../public/images/animal-crossing/error-screen-resetti.png";
import { css } from "@panda/css";

const container = css({
  alignItems: "center",
  display: "flex",
  flexDir: "column",
});

const pre = css({
  layerStyle: "acnhTextBackground",
  margin: "1rem",
  padding: "1rem 2rem",
});

export default function Error({ error }: { error: Error }) {
  return (
    <div className={container}>
      <Image src={Resetti} alt="Mr. Resetti looking sad." />
      <p className={pre}>❌ {error.message}</p>
    </div>
  );
}
