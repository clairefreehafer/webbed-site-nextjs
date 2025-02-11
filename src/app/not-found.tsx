import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
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
      <Image
        src="/images/animal-crossing/error-screen-resetti.png"
        alt="Mr. Resetti looking sad."
        width={256}
        height={256}
      />
      <p>page not found!</p>
      <Link href="/">return home</Link>
    </div>
  );
}
