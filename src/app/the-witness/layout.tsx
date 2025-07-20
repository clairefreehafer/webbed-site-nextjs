import fs from "fs";
import Navigation from "@/components/the-witness/nav";
import "@/sass/the-witness/style.scss";
import sharp from "sharp";

const BACKGROUND_FILE_PATH = "images/the-witness/vertical-banners";
const BACKGROUND_FILES = ["01", "02", "03"] as const;

export default async function Layout({ children }: React.PropsWithChildren) {
  for (const backgroundFile of BACKGROUND_FILES) {
    if (
      !fs.existsSync(
        `${process.cwd()}/public/${BACKGROUND_FILE_PATH}/${backgroundFile}.webp`
      )
    ) {
      // transformed file does not exist, so create it
      console.log(`🖼️ transforming background image...`);
      try {
        const backgroundImageBuffer = fs.readFileSync(
          `${process.cwd()}/.local/${BACKGROUND_FILE_PATH}/${backgroundFile}.jpg`
        );
        await sharp(backgroundImageBuffer)
          .blur({ sigma: 10 })
          .webp()
          .toFile(
            `${process.cwd()}/public/${BACKGROUND_FILE_PATH}/${backgroundFile}.webp`
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
