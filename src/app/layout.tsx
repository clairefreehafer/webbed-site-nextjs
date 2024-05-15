import type { Metadata } from "next";
import { inter } from "@fonts";
import "@styles/globals.scss";
import StyledComponentsRegistry from "@styles/registry";

declare global {
  namespace PrismaJson {
    type Metadata = {
      title?: string;
      description?: string;
      path: string;
      altText?: string;
    }
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
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
