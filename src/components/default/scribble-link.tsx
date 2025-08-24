import "@/sass/default/scribble-button.scss";

import Link from "next/link";

export type ScribbleLinkProps = {
  text: string;
  scribbleText?: string;
  href: string;
};

export default function ScribbleLink({
  href,
  text,
  scribbleText,
  className,
}: ScribbleLinkProps & { className?: string }) {
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        className={`scribble-link ${className}`}
        target="_blank"
        key={href}
      >
        <span className="scribble-text background" aria-hidden>
          {text}
        </span>
        <div className="scribble-highlight" aria-hidden>
          {scribbleText ?? text}
        </div>
        <span className="scribble-text">{text}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={`scribble-link ${className}`} key={href}>
      <span className="scribble-text background" aria-hidden>
        {text}
      </span>
      <div className="scribble-highlight" aria-hidden>
        {scribbleText ?? text}
      </div>
      <span className="scribble-text">{text}</span>
    </Link>
  );
}
