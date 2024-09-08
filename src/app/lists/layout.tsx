import SiteContainer from "@components/layout/SiteContainer";
import "@themes/book.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteContainer>{children}</SiteContainer>;
}
