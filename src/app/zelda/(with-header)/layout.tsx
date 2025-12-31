import Name from "@/components/zelda/name";
import Nav from "@/components/zelda/nav";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header>
        <Name />
        <Nav />
      </header>

      <main className="content">{children}</main>
    </>
  );
}
