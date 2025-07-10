"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        margin: "1rem auto",
        maxWidth: 256,
      }}
    >
      <h2>Something went wrong!</h2>
      <Image
        src="/images/animal-crossing/error-screen-resetti.png"
        alt="Mr. Resetti looking sad."
        width={256}
        height={256}
      />
      <button onClick={reset}>try again</button>
    </div>
  );
}
