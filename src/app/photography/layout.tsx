"use client";
import "@/sass/global.scss";
import "@/sass/photography/style.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const splitPathname = pathname.split("/");
  const backHref = pathname.includes("today")
    ? "/photography"
    : `/${splitPathname.slice(1, splitPathname.length - 1).join("/")}`;

  return (
    <html>
      <body>
        <header>
          <Link href={backHref} className="home">
            &larr; back to {backHref}
          </Link>
          <h1>claire freehafer</h1>
        </header>

        <section className="content">{children}</section>
      </body>
    </html>
  );
}
