import Header from "@/components/photography/header";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
