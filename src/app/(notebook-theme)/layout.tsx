import "@/sass/notebook/style.scss";

import {
  cutiveMono,
  loveYaLikeASister,
  nationalPark,
  pangolin,
} from "@/fonts/notebook";

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
    <html>
      <body>
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
      </body>
    </html>
  );
}
