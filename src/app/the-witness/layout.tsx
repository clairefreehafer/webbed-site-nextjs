import fs from "fs";
import Navigation from "@/components/the-witness/nav";
import "@/sass/the-witness/style.scss";
import sharp from "sharp";

const BACKGROUND_FILE_PATH =
  "images/the-witness/vertical-banners/VerticalBanners_High01";

export default async function Layout({ children }: React.PropsWithChildren) {
  if (!fs.existsSync(`${process.cwd()}/public/${BACKGROUND_FILE_PATH}.webp`)) {
    // transformed file does not exist, so create it
    console.log(`🖼️ transforming background image...`);
    const backgroundImageBuffer = fs.readFileSync(
      `${process.cwd()}/.local/${BACKGROUND_FILE_PATH}.jpg`
    );
    await sharp(backgroundImageBuffer)
      .blur({ sigma: 10 })
      .webp()
      .toFile(`${process.cwd()}/public/${BACKGROUND_FILE_PATH}.webp`);
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
