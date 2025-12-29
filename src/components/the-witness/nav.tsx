import { ROOT_LINKS } from "@/types/nav";

export default function Navigation() {
  return (
    <nav>
      <div className="nav-border">
        <div className="puzzle-background" style={{ backgroundColor: "blue" }}>
          <div className="nav-puzzle">
            <div className="circle"></div>
            {ROOT_LINKS.map((link) => (
              <div key={link.text} className="section">
                <div className="nav-link">
                  <a href={link.href}>{link.text}</a>
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
              {ROOT_LINKS.map(({ href, text }) => (
                <li key={text}>
                  <a href={href}>{text}</a>
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
