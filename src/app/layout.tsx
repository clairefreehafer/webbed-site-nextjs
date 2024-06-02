import type { Metadata } from "next";
import { inter } from "@fonts";

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
