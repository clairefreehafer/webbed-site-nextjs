import "@/sass/notebook/uncharted-4.scss";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "uncharted 4 — claire freehafer",
};

export default function Layout({ children }: React.PropsWithChildren) {
  // TODO: background transformation
  return children;
}
