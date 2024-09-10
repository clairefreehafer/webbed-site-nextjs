import Nav from "@components/Nav";
import AnimalCrossingLogo from "@components/animal-crossing/Logo";
import SiteContainer from "@components/layout/SiteContainer";
import AnimalCrossingThemeRoot from "@styles/animal-crossing/theme";
// import "@styles/animal-crossing/theme.css";
import { getGrassDateRange } from "@utils/animal-crossing";

export default function AnimalCrossingLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const grassDateRange = getGrassDateRange();

  return (
    <AnimalCrossingThemeRoot shape="square">
      <SiteContainer>
        <header className="max-w-site-width mx-auto flex flex-col items-center justify-center p-4">
          <AnimalCrossingLogo text="claire freehafer" />
          <Nav theme="animalCrossing" />
        </header>
        <main
          className="bg-sand max-w-site-width mx-auto mb-4 rounded-3xl bg-top bg-repeat-x px-4 pb-4 pt-36 shadow-[0_1rem_0.5rem_-0.5rem_rgba(0,0,0,0.5)]"
          style={{
            backgroundImage: `url(/images/animal-crossing/sand/square_${grassDateRange}.png)`,
          }}
        >
          {children}
        </main>
      </SiteContainer>
    </AnimalCrossingThemeRoot>
  );
}
