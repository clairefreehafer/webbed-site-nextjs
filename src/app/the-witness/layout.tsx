import Navigation from "@/components/the-witness/nav";
import "@/sass/the-witness/style.scss";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <body>
        <div className="background"></div>

        <div className="container">
          <header>
            <h1>Claire Freehafer</h1>
          </header>
          <Navigation />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
