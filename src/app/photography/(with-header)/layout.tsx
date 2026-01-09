import Nav from "@/components/photography/nav";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header>
        <h1>claire freehafer</h1>
        <Nav />
      </header>

      {children}
    </>
  );
}
