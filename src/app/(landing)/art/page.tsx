import ScribbleButton, {
  ScribbleButtonProps,
} from "@/components/default/scribble-button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "art — claire freehafer",
};

const photographyLinks: ScribbleButtonProps[] = [
  {
    text: "here",
    href: "/photography",
    scribbleText: "vw",
  },
  {
    text: "smugmug",
    href: "https://clairefreehafer.smugmug.com",
    scribbleText: "sgmg",
  },
  {
    text: "flickr",
    href: "https://flickr.com/clairefreehafer",
    scribbleText: "fkr",
  },
];

const videoGameLinks: ScribbleButtonProps[] = [
  {
    text: "animal crossing",
    href: "/animal-crossing",
    scribbleText: "amlcr",
  },
  {
    text: "the witness",
    href: "/the-witness",
    scribbleText: "wtns",
  },
  {
    text: "uncharted 4",
    href: "/uncharted-4",
    scribbleText: "uchrt",
  },
  {
    text: "zelda",
    href: "/zelda",
    scribbleText: "zld",
  },
];

export default function Page() {
  return (
    <section className="content">
      <h1>claire freehafer</h1>

      <h2>art!</h2>

      <h3>📷 photography 📸</h3>
      <p>
        view on this site or externally, since the former is still a work in
        progress.
      </p>
      <div className="link-container">
        {photographyLinks.map((link) => (
          <ScribbleButton
            {...link}
            className={`links-${photographyLinks.length}`}
            key={link.href}
          />
        ))}
      </div>

      <h3>🎮 video games 📺</h3>
      <p>
        virtual photography and other work inspired by and created with my
        favorite video games.
      </p>
      <div className={`link-container links-${videoGameLinks.length}`}>
        {videoGameLinks.map((link) => (
          <ScribbleButton
            {...link}
            className={`links-${videoGameLinks.length}`}
            key={link.href}
          />
        ))}
      </div>

      <h3>💻 digital art 💿</h3>
      <p>coming soon!</p>

      <p>
        ⬅️ <Link href="/">return home</Link> 🏠
      </p>
    </section>
  );
}
