import "@/sass/notebook/style.scss";
import localFont from "next/font/local";

const loveYaLikeASister = localFont({
  variable: "--font-love-ya-like-a-sister",
  src: [
    {
      path: "../../../public/fonts/notebook/love-ya-like-a-sister.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  fallback: ["serif"],
});

const cutiveMono = localFont({
  variable: "--font-cutive-mono",
  src: [
    {
      path: "../../../public/fonts/notebook/cutive-mono.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  fallback: ["monospace"],
});

// https://nationalparktypeface.com/
const nationalPark = localFont({
  variable: "--font-national-park",
  src: [
    {
      path: "../../../public/fonts/notebook/national-park.woff2",
      style: "normal",
    },
  ],
  fallback: ["monospace"],
});

const pangolin = localFont({
  variable: "--font-pangolin",
  src: [
    {
      path: "../../../public/fonts/notebook/pangolin.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  fallback: ["system-ui", "sans-serif"],
});

const NAV_LINKS = [
  {
    title: "home",
    path: "/",
  },
  {
    title: "art",
    path: "/art",
  },
  {
    title: "recipes",
    path: "/recipes",
  },
  {
    title: "lists",
    path: "/lists",
  },
];

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div
      className={`container ${loveYaLikeASister.variable} ${cutiveMono.variable} ${pangolin.variable} ${nationalPark.variable}`}
    >
      <h1 className="name">claire freehafer</h1>
      <nav>
        <ul className="nav-list">
          {NAV_LINKS.map((link) => (
            <li className="nav-list_item" key={link.title}>
              <div className="wiggle-box-1"></div>
              <div className="wiggle-box-2"></div>
              <div className="wiggle-box-3"></div>
              <div className="wiggle-box-4"></div>
              <div className="wiggle-box-5"></div>
              <div className="wiggle-box-6"></div>
              <a href={link.path}>{link.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="paper">{children}</main>
    </div>
  );
}
