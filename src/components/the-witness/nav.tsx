"use client";

import { ROOT_LINKS } from "@/utils/constants";

export default function Navigation() {
  return (
    <nav>
      <div className="nav-border">
        <div className="puzzle-background" style={{ backgroundColor: "blue" }}>
          <div className="nav-puzzle">
            <div className="circle"></div>
            {ROOT_LINKS.map((link) => (
              <div key={link.title} className="section">
                <div className="nav-link">
                  <a href={link.path}>{link.title}</a>
                </div>
                <div className="elbow">
                  <div className="horizontal"></div>
                  <div className="vertical"></div>
                </div>
              </div>
            ))}
            <div className="circle opacity-0"></div>
          </div>
          <div className="nav-mobile">
            <ul>
              {ROOT_LINKS.map(({ path, title }) => (
                <li key={title}>
                  <a href={path}>{title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="inner-shadow"></div>
        </div>
      </div>
    </nav>
  );
}
