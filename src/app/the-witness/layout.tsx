import fs from "fs";
import sharp from "sharp";
import Navigation from "@/components/the-witness/nav";
import variables from "@/sass/the-witness/export.module.scss";
import "@/sass/the-witness/style.scss";

export default async function Layout({ children }: React.PropsWithChildren) {
  const { numberOfVerticalBanners, verticalBannerFilePath } = variables;
  for (let i = 1; i <= parseInt(numberOfVerticalBanners); i++) {
    const fileName = i < 10 ? `0${i}` : `${i}`;
    if (
      !fs.existsSync(
        `${process.cwd()}/public/${verticalBannerFilePath}/${fileName}.webp`
      )
    ) {
      // transformed file does not exist, so create it
      console.log(`🖼️ transforming background image...`);
      try {
        const backgroundImageBuffer = fs.readFileSync(
          `${process.cwd()}/.local/${verticalBannerFilePath}/${fileName}.jpg`
        );
        await sharp(backgroundImageBuffer)
          .blur({ sigma: 10 })
          .webp()
          .toFile(
            `${process.cwd()}/public/${verticalBannerFilePath}/${fileName}.webp`
          );
      } catch (error) {
        console.log(
          `❌ problem transforming background image:`,
          (error as Error).message
        );
      }
    }
  }

  return (
    <html>
      <body>
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
