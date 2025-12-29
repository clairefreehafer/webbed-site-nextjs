import "@/sass/notebook/style.scss";

import { Metadata } from "next";

import {
  cutiveMono,
  loveYaLikeASister,
  nationalPark,
  pangolin,
} from "@/fonts/notebook";
import { ROOT_LINKS } from "@/types/nav";

export const metadata: Metadata = {
  title: {
    default: "claire freehafer",
    template: "%s — claire freehafer",
  },
};

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
              {ROOT_LINKS.map((link) => (
                <li className="nav-list_item" key={link.text}>
                  <div className="wiggle-box-1"></div>
                  <div className="wiggle-box-2"></div>
                  <div className="wiggle-box-3"></div>
                  <div className="wiggle-box-4"></div>
                  <div className="wiggle-box-5"></div>
                  <div className="wiggle-box-6"></div>
                  <a href={link.href}>{link.text}</a>
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
