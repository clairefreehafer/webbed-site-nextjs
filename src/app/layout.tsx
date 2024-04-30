import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import RainbowBorder from "./components/rainbow-border/rainbow-border";

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

const inter = Inter({ subsets: ["latin"] });

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
        <RainbowBorder>
          {children}
        </RainbowBorder>
      </body>
    </html>
  );
}
