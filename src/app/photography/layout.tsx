import "@/sass/global.scss";
import "@/sass/photography/style.scss";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "photography — claire freehafer",
    template: "%s — claire freehafer",
  },
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
