"use client";

import Image from "next/image";
import Resetti from "../../../public/images/animal-crossing/error-screen-resetti.png";

export default function Error(
  { error }: { error: Error }
) {
  return (
    <>
      <Image src={Resetti} alt="Mr. Resetti looking sad." />
      <pre css={{ margin: "1rem", fontSize: "1rem" }}>❌ {error.message}</pre>
    </>
  );
}