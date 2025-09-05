import "@/sass/notebook/firewatch.scss";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "firewatch",
};

export default function Layout({ children }: React.PropsWithChildren) {
  return children;
}
