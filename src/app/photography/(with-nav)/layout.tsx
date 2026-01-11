import Nav from "@/components/photography/nav";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header className="with-nav" id="photography-header">
        <h1>claire freehafer</h1>
        <Nav />
      </header>

      <main id="photography-main">{children}</main>
    </>
  );
}
