import type { Metadata } from "next";
import { inter } from "@fonts";
import "@styles/index.css";

declare global {
  namespace PrismaJson {
    type Metadata = {
      title?: string;
      description?: string;
      /** zelda photos only */
      compendiumNumber?: number;
    };
  }
}

export const metadata: Metadata = {
  title: "claire freehafer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ overscrollBehaviorY: "none" }}>
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS feed"
        href="rss.xml"
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
