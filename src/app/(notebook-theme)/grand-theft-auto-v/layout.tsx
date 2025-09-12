import "@/sass/notebook/grand-theft-auto-v.scss";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "grand theft auto V",
};

export default function Layout({ children }: React.PropsWithChildren) {
  return children;
}
