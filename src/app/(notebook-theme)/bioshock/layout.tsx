import "@/sass/notebook/bioshock.scss";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "bioshock",
};

export default function Layout({ children }: React.PropsWithChildren) {
  return children;
}
