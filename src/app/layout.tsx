import type { Metadata } from "next";
import {
  cutiveMono,
  inter,
  loveYaLikeASister,
  pangolin,
  pressStart2P,
  ptMono,
} from "@fonts";
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

const fonts = `
  ${cutiveMono.variable}
  ${loveYaLikeASister.variable}
  ${pangolin.variable}
  ${pressStart2P.variable}
  ${ptMono.variable}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts}>
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
