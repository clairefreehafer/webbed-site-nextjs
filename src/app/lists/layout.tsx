import Navigation from "@components/Nav";
import Title from "@components/Title";
import { css } from "@panda/css";
import { SiteContainer } from "@panda/jsx";

// TODO: add wood background
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SiteContainer
      aspectRatio="8.5 / 11"
      bgColor="antiquewhite"
      boxShadow="0 0 1rem 0.5rem lightgrey"
      fontFamily="Times New Roman, serif"
      margin="1rem auto"
    >
      <Navigation />
      <Title theme="book" />
      <main
        className={css({
          padding: "3rem",
          width: "100%",
        })}
      >
        {children}
      </main>
    </SiteContainer>
  );
}
