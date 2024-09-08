import SiteContainer from "@components/layout/SiteContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteContainer>{children}</SiteContainer>;
}
