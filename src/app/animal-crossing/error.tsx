"use client";

import Image from "next/image";
import Resetti from "../../../public/images/animal-crossing/error-screen-resetti.png";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center">
      <Image src={Resetti} alt="Mr. Resetti looking sad." />
      <p className="ac-text-bg m-4 px-8 py-4">❌ {error.message}</p>
    </div>
  );
}
