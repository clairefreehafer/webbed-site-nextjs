import { Metadata } from "next";
import Link from "next/link";

import NookPhone from "@/components/animal-crossing/nookphone";

export const metadata: Metadata = {
  title: "animal crossing new horizons",
};

export default function Page() {
  return (
    <>
      <div className="breadcrumbs">
        <Link href="/animal-crossing">animal crossing</Link>
        <span>/</span>
        <h2>new horizons</h2>
      </div>
      <p>view photos from my animal crossing: new horizons island, Avalar:</p>

      <NookPhone />
    </>
  );
}
