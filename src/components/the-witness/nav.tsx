"use client";

import Nav, { ROOT_LINKS } from "../nav";

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
            <Nav />
          </div>
          <div className="inner-shadow"></div>
        </div>
      </div>
    </nav>
  );
}
