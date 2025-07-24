import ScribbleButton, {
  ScribbleButtonProps,
} from "@/components/default/scribble-button";
import Link from "next/link";

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
];

export default function Home() {
  return (
    <section className="content">
      <h1>art!</h1>

      <h2>📷 photography 📸</h2>
      <p>
        view on this site or externally, since the former is still a work in
        progress.
      </p>
      <div className="grid">
        {photographyLinks.map((link) => (
          <ScribbleButton {...link} key={link.href} />
        ))}
      </div>

      <h2>🎮 video games 📺</h2>
      <p>
        virtual photography and other work inspired by and created with my
        favorite video games.
      </p>
      <div className="grid">
        {videoGameLinks.map((link) => (
          <ScribbleButton {...link} key={link.href} />
        ))}
      </div>

      <h2>💻 digital art 💿</h2>
      <p>coming soon!</p>

      <p>
        ⬅️ <Link href="/">return home</Link> 🏠
      </p>
    </section>
  );
}
